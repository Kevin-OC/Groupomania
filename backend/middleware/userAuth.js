const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // <- à préciser dans notre requête headers: {Authorization : type Bearer}
        const decodedToken = jwt.verify(token, 'token_dev'); // <- notre TOKEN provisoire (à remplacer par process.env.TOKEN ensuite)
    
        /* Protégeons ce compte en vérifiant si le userId du token correspond au id du compte sur lequel on souhaite accéder */
        User.findOne({where: {id: req.params.id}})
            .then(user => {
                if (decodedToken.userId == user.id) {
                    console.log("vous êtes bien le propriétaire de ce compte");
                } else {
                    return res.status(403).json({ error});
                };
        next();
        });  
    } catch {
        console.log("accès non autorisé");
        res.status(401).json({error: 'accès refusé'});
    }
};