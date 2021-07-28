const database = require('../config/database.js');
const Post = require('../models/Post.js');

/* logique pour afficher l'ensemble des posts */
exports.getAllPosts = (req, res) => {
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
exports.getOnePost = (req, res) => {
    console.log("Post affiché")
    res.status(200).json({message: 'Post affiché'});
};

/* logique pour créer un post */
exports.createPost = (req, res) => {
    try {
        let { text, file } = req.body;
        Post.create({text, file})
            .then(newPost => {
                console.log("nouveau post créé", newPost);
                res.status(201);
            })
            .catch(error => res.status(400).json({error}))    
    } catch {
        error => res.status(500).json({error});
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
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
};

exports.deleteUser = (req, res) => {
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
exports.deletePost = (req, res) => {
    console.log("Post supprimé")
    res.status(201).json({message: 'Post supprimé'});
};