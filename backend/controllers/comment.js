const database = require('../config/database.js');
const Comment = require('../models/Comment.js');
const User = require('../models/User.js');

/* logique pour afficher l'ensemble des commentaires d'un post */
exports.getAllComments = (req, res) => {
    try {
        Comment.findAll({where: {postId: req.params.postId}, include: User})
            .then(comments => {
                res.status(200).json(comments);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour créer un commentaire */
exports.createComment = (req, res) => {
    try {
        console.log(req.body);
        let { text, userId, postId } = req.body;
        Comment.create({text, postId, userId})
            .then(newComment => {
                console.log("nouveau commentaire créé");
                res.status(201).json(newComment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

/* logique pour afficher un commentaire (en fonction de son id) */
exports.getOneComment = (req, res) => {
    try {
        Comment.findOne({where: {id:req.params.id}, include: User})
            .then(comment => {
                console.log("Commentaire trouvé:", comment);
                res.status(200).json(comment);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour supprimer un commentaire */
exports.deleteComment = (req, res) => {
    try {
        Comment.destroy({where: {id:req.params.id}})
            .then(() => {
                console.log("Commentaire supprimé");
                res.status(200);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour modifier un commentaire */
exports.editComment = (req, res) => {
    console.log(req.body)
    try {
        Comment.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                let updatedComment = {...req.body}
                res.status(201).json(updatedComment)
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};