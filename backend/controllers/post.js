const database = require('../config/database.js');
const Post = require('../models/Post.js');

/* logique pour afficher l'ensemble des posts */
exports.getAllPosts = (req, res) => {
    try {
        Post.findAll()
            .then(posts => {
                res.status(200).json(posts);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour afficher un post (en fonction de son id) */
exports.getOnePost = (req, res) => {
    console.log("Post affiché")
    res.status(200).json({message: 'Post affiché'});
};

/* logique pour créer un post */
exports.createPost = (req, res) => {
    if (req.file) {
        req.body.file = req.file.filename;
    } else {
        req.body.file = null;
    };
    try {
        console.log(req.body);
        let { text, file, userId } = req.body;
        Post.create({text, file, userId})
            .then(newPost => {
                console.log("nouveau post créé", newPost);
                res.status(201);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

/* logique pour modifier un post */
exports.editPost = (req, res) => {
    try {
        Post.update(req.body, {where: {id: req.params.id}})
            .then(post => {
                console.log("post modifié:", post)
                res.status(201).json(post);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour supprimer un post */
exports.deletePost = (req, res) => {
    try {
        console.log(req.params.id);
        Post.destroy({where: {id:req.params.id}})
            .then(post => {
                console.log("Post supprimé");
                res.status(200).json(post);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};