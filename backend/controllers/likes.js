const database = require('../config/database.js');
const Like = require('../models/Like.js');
const User = require('../models/User.js');

/* logique pour liker un post */
exports.likePost = (req, res) => {
    try {
        console.log(req.body);
        let { like, userId, postId } = req.body;
        Like.create({like, postId, userId})
            .then(newLike => {
                console.log("nouveau like créé");
                res.status(201).json(newLike);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

/* logique pour unliker un post */
exports.unlikePost = (req, res) => {
    console.log(req.body)
    try {
        Like.destroy({where: {postId: req.params.postId, userId: req.body.userId}})
            .then(like => {
                console.log(like);
                res.status(200);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour récupérer les likes d'un post */
exports.getAllLikesPost = (req, res) => {
    try {
        Like.findAll({where: {postId: req.params.postId}, include: User})
            .then(like => {
                res.status(200).json(like);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};