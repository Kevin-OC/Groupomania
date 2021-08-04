const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');
//const auth = require('../middleware/auth.js'); // <- ajouter ce middleware à toutes les routes que l'on veut protéger (à placer avant les controllers)

/* '/' = https://localhost:3000/api/comments */

/* route création comment
router.post('/', auth, commentCtrl.createcomment);

/* route modification comment
router.put('/:id', auth, commentCtrl.editcomment);

/* route affichage ensemble des comments
router.get('/', auth, commentCtrl.getAllcomments);

/* route affichage comment connecté
router.get('/:id', auth, commentCtrl.getOnecomment);

/* route suppression comment
router.delete('/:id', auth, commentCtrl.deletecomment);*/

/* exports */
module.exports = router;