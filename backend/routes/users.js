const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');
const auth = require('../middleware/userAuth.js'); // <- ajouter ce middleware à toutes les routes que l'on veut protéger (à placer avant les controllers)
const multer = require('../middleware/multer-config.js'); // <- middleware de gestion des images

/* '/' = http://localhost:3000/api/users */

/* route création user */
router.post('/signup', userCtrl.signup);

/* route authentification user */
router.post('/login', userCtrl.login)

/* route modification user */
router.put('/:id', auth, multer, userCtrl.editUser);

/* route affichage ensemble des users */
router.get('/all', userCtrl.getAllUsers);

/* route affichage user connecté */
router.get('/:id', userCtrl.getOneUser);

/* route suppression user */
router.delete('/:id', auth, userCtrl.deleteUser);

/* exports */
module.exports = router;