const database = require('../config/database.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* logique pour créer un user */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 8)
        .then(hash => {
            const user = new User({
                ...req.body,
                password: hash
            });
            let { firstname, lastname, email, password } = user;
            User.create({firstname, lastname, email, password})
                .then(newUser => {
                console.log("nouvel user enregistré:", newUser.firstname, newUser.lastname);
                res.status(201).json({message: 'User créé'});
                })
                .catch(error => res.status(400).json({error}))
        })    
        .catch(error => res.status(500).json({error}));
};

/* logique pour authentifier un user */
exports.login = (req, res, next) => {
    User.findOne({where: {email:req.body.email}})
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log("Email ou mot de passe incorrect !");
                        return res.status(401).json({ error: 'Email ou mot de passe incorrect !' });   
                    };
                    res.status(201).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user._id },
                            '###monTokenPasEncoreAléatoire!###', // <- notre TOKEN provisoire (à remplacer par process.env.TOKEN ensuite)
                            { expiresIn: '24h' })
                    }).redirect('http://localhost:8080/home');
                    console.log("Bienvenue", user.firstname);                   
                })
                .catch(error => res.status(400).json({error}));
        }) 
        .catch(error => res.status(500).json({ error })); 
}

/* logique pour update un user */
exports.editUser = (req, res, next) => {
    console.log("User édité");
    res.status(201).json({message: 'User édité'});
};/*
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
};*/

/* logique pour afficher tous les users */
exports.getAllUsers = (req, res, next) => {
    try {
        User.findAll()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
};

/* logique pour afficher un user  */
exports.getOneUser = (req, res, next) => {
    try {
        User.findOne({where: {id:req.params.id}})
            .then(user => {
                console.log("User trouvé:", user.firstname, user.lastname);
                res.status(200).json(user);
            })
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
};

/* logique pour supprimer un user */
exports.deleteUser = (req, res, next) => {
    console.log(req.params.id);
    try {
        User.destroy({where: {id:req.params.id}})
            .then(user => {
                console.log("User supprimé");
                res.status(200).json(user);
            })
            .catch(error => res.status(400).json({error}))
    } catch {
        error => res.status(500).json({error});
    }
};