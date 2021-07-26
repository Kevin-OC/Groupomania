const database = require('../config/database.js');
const Post = require('../models/Post.js');

/* logique pour afficher l'ensemble des posts */
exports.getAllPosts = (req, res, next) => {
    try {
        Post.findAll()
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
};

/* logique pour afficher un post (en fonction de son id) */
exports.getOnePost = (req, res, next) => {
    console.log("Post affiché")
    res.status(200).json({message: 'Post affiché'});
};

/* logique pour créer un post */
exports.createPost = (req, res, next) => {
    console.log("post créé")
    res.status(201).json({message: 'Post créé'});
};

/* logique pour modifier un post */
exports.editPost = (req, res, next) => {
    try {
        Post.update(req.body, {where: {id: req.params.id}})
            .then(post => {
                console.log("post modifié:", post)
                res.status(201).json(post);
            })
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
};

exports.deleteUser = (req, res, next) => {
    try {
        User.destroy({where : req.params.id})
            .then(user => {
                console.log("User deleted");
                res.status(200).json(user);
            })
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
    res.status(201).json({message: 'User deleted'});
};

/* logique pour supprimer un post */
exports.deletePost = (req, res, next) => {
    console.log("Post supprimé")
    res.status(201).json({message: 'Post supprimé'});
};