const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* logique pour créer un user */
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 8)
        .then(hash => {
            const user = new User({
                ...req.body,
                password: hash
            });
            let { firstname, lastname, email, password } = user;
            User.create({firstname, lastname, email, password})
                .then(newUser => {
                    console.log("nouvel user enregistré:", newUser.firstname, newUser.lastname, "userId:", newUser.id);
                    res.status(201).json()           
                })
                .catch(error => res.status(400).json(error))
        })    
        .catch(error => res.status(500).json(error));
};

/* logique pour login un user */
exports.login = (req, res) => {
    User.findOne({where: {email:req.body.email}})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User non trouvé !'});
            };
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'});   
                    };
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id, isAdmin: false },
                            'token_dev', // <- notre TOKEN provisoire (à remplacer par process.env.TOKEN ensuite)
                            { expiresIn: '24h' })
                    });               
                })
                .catch(error => res.status(400).json(error));
        }) 
        .catch(error => res.status(500).json({ error })); 
}

/* logique pour update un user */
exports.editUser = (req, res) => {
    try {
        User.update(req.body, {where: {id: req.params.id}})
            .then(user => {
                console.log("user édité:", user)
                res.status(201).json(user);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour afficher tous les users */
exports.getAllUsers = (req, res) => {
    try {
        User.findAll()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour afficher un user  */
exports.getOneUser = (req, res) => {
    try {
        User.findOne({where: {id:req.params.id}})
            .then(user => {
                console.log("User trouvé:", user.firstname, user.lastname);
                res.status(200).json(user);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};

/* logique pour supprimer un user */
exports.deleteUser = (req, res) => {
    console.log("user id à supprimer:", req.params.id);
    try {
        User.destroy({where: {id:req.params.id}})
            .then(() => {
                console.log("User supprimé");
                res.status(200);
            })
            .catch(error => res.status(400).json(error))
    } catch {
        error => res.status(500).json(error);
    }
};