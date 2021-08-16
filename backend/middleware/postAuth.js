const jwt = require('jsonwebtoken');
const Post = require('../models/Post.js');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // <- à préciser dans notre requête headers: {Authorization : type Bearer}
        const decodedToken = jwt.verify(token, 'token_dev'); // <- notre TOKEN provisoire (à remplacer par process.env.TOKEN ensuite)

        /* Protégeons ce post en vérifiant si le userId du token correspond au userId du post sur lequel on souhaite accéder */
        Post.findOne({where: {id: req.params.id}})
            .then(post => {
                if (decodedToken.isAdmin) {
                    console.log("vous êtes admin");
                }
                else if (decodedToken.userId == post.userId) {
                    console.log("vous êtes bien le propriétaire de ce post");
                } 
                else {
                    console.log("vous n'avez pas les droits sur ce post")
                    return res.status(403);
                };
        next();      
        });
    } catch {
        console.log("accès non autorisé");
        res.status(401).json({error: 'accès refusé'});
    }
};