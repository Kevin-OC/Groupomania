const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // <- voir dans le browser: network/headers/request headers/authorization: bearer <#!exempleDeToken*$>
        const decodedToken = jwt.verify(token, '###monTokenPasEncoreAléatoire!###'); // <- notre TOKEN provisoire (à remplacer par process.env.TOKEN ensuite)
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID invalide!';
        } else {
            next();
        }
    } catch {
        res.status(401).json({error});
    }
};