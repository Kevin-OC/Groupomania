const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');

/* '/' = https://localhost:3000/api/comments */

/* route création commentaire */
router.post('/:postId/create', commentCtrl.createComment);

/* route affichage ensemble des commentaires */
router.get('/:postId/all', commentCtrl.getAllComments);

/* route affichage d'un commentaire en particulier */
router.get('/:postId/:id', commentCtrl.getOneComment);

/* route modification commentaire */
router.put('/:postId/:id', commentCtrl.editComment);

/* route suppression commentaire */
router.delete('/:postId/:id', commentCtrl.deleteComment);

/* exports */
module.exports = router;