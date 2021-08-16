const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');

/* '/' = https://localhost:3000/api/comments */

/* route création commentaire */
router.post('/create', commentCtrl.createComment);

/* route affichage ensemble des commentaires */
router.get('/:postId/all', commentCtrl.getAllComments);

/* route affichage d'un commentaire en particulier */
router.get('/:id', commentCtrl.getOneComment);

/* route modification commentaire */
router.put('/:id', commentCtrl.editComment);

/* route suppression commentaire */
router.delete('/:id', commentCtrl.deleteComment);

/* exports */
module.exports = router;