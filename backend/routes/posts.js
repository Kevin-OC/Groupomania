const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth.js'); // <- ajouter ce middleware à toutes les routes que l'on veut protéger (à placer avant les controllers)

/* '/' = https://localhost:3000/api/posts */

/* route création post */
router.post('/', auth, postCtrl.createPost);

/* route modification post */
router.put('/:id', auth, postCtrl.editPost);

/* route affichage ensemble des posts */
router.get('/', auth, postCtrl.getAllPosts);

/* route affichage post connecté */
router.get('/:id', auth, postCtrl.getOnePost);

/* route suppression post */
router.delete('/:id', auth, postCtrl.deletePost);

/* exports */
module.exports = router;