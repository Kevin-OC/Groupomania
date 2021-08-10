const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // <- à préciser dans notre requête headers: {Authorization : type Bearer}
        const decodedToken = jwt.verify(token, 'token_dev'); // <- notre TOKEN provisoire (à remplacer par process.env.TOKEN ensuite)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) { 
            throw 'User ID invalide!';
        }
        else {
            User.findOne({where: {id: userId}})
                .then(user => {
                    req.user = user
                    console.log("accès autorisé")
                    user.isAdmin ? console.log("user is admin") : console.log("user isn't admin")
                });
            next();
        }
    } catch {
        console.log("accès non autorisé");
        res.status(401).json({error: 'accès refusé'});
    }
};