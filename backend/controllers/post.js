const database = require('../config/database.js');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const fs = require('fs');

/* logique pour afficher l'ensemble des posts */
exports.getAllPosts = (req, res) => {
    try {
        Post.findAll({ include: User })
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
    try {
        Post.findOne({where: {id:req.params.id}})
            .then(post => {
                console.log("Post trouvé:", post.id);
                res.status(200).json(post);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
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
                console.log("nouveau post créé");
                res.status(201).json(newPost);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }  
};

/* logique pour modifier un post */
exports.editPost = (req, res) => {
    req.file ? req.body.file = req.file.filename : console.log("on garde la même photo"); // <- on vérifie si l'user a uploadé une nouvelle photo
    if (req.file) { // <- on supprime l'ancienne image du post
        Post.findOne({where: {id:req.params.id}})
            .then(post => {
                if(post.file) { // <- si post.file n'est pas null on supprime le fichier existant
                    fs.unlink(`images/${post.file}`, (error) => {
                        if (error) throw err
                    })    
                } else {
                    console.log("l'image à remplacer est NULL")
                }
            })
            .catch(error => res.status(400).json(error));
    }
    try {
        Post.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                let updatedPost = {...req.body}
                res.status(201).json(updatedPost)
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour supprimer un post */
exports.deletePost = (req, res) => {
    try {
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