const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth.js'); // <- ajouter ce middleware à toutes les routes que l'on veut protéger (à placer avant les controllers)

/* '/' = https://localhost:3000/api/posts */

/* route création post */
router.post('/', postCtrl.createPost);

/* route modification post */
router.put('/:id', postCtrl.editPost);

/* route affichage ensemble des posts */
router.get('/', postCtrl.getAllPosts);

/* route affichage post connecté */
router.get('/:id', postCtrl.getOnePost);

/* route suppression post */
router.delete('/:id', postCtrl.deletePost);

/* exports */
module.exports = router;