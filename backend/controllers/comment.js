const database = require('../config/database.js');
const Comment = require('../models/Comment.js');

/* logique pour afficher l'ensemble des comments */
exports.getAllcomments = (req, res) => {
    try {
        Comment.findAll()
            .then(comments => {
                res.status(200).json(comments);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};