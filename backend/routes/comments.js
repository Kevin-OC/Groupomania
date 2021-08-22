const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');
const auth = require('../middleware/auth.js');

/* '/' = https://localhost:3000/api/comments */

/* route création commentaire */
router.post('/create', auth, commentCtrl.createComment);

/* route affichage ensemble des commentaires */
router.get('/:postId/all', commentCtrl.getAllComments);

/* route affichage d'un commentaire en particulier */
router.get('/:id', commentCtrl.getOneComment);

/* route modification commentaire */
router.put('/:id', auth, commentCtrl.editComment);

/* route suppression commentaire */
router.delete('/:id', auth, commentCtrl.deleteComment);

/* exports */
module.exports = router;