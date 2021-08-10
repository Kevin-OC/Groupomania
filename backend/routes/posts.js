const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js');

/* '/' = https://localhost:3000/api/posts */

/* route création post */
router.post('/create', auth, multer, postCtrl.createPost);

/* route affichage ensemble des posts */
router.get('/all', postCtrl.getAllPosts);

/* route affichage d'un post en particulier */
router.get('/:id', auth, postCtrl.getOnePost);

/* route modification post */
router.put('/:id', auth, multer, postCtrl.editPost);

/* route suppression post */
router.delete('/:id', auth, postCtrl.deletePost);

/* exports */
module.exports = router;