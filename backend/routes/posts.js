const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/postAuth.js');
const multer = require('../middleware/multer-config.js');
const likesCtrl = require('../controllers/likes.js');

/* '/' = https://localhost:3000/api/posts */

/* route création post */
router.post('/create', multer, postCtrl.createPost);

/* route affichage ensemble des posts */
router.get('/all', postCtrl.getAllPosts);

/* route affichage d'un post en particulier */
router.get('/:id', postCtrl.getOnePost);

/* route modification post */
router.put('/:id', auth, multer, postCtrl.editPost);

/* route suppression post */
router.delete('/:id', auth, postCtrl.deletePost);

/* routes likes d'un post */
router.post('/:postId/like', likesCtrl.likePost);
router.delete('/:postId/unlike', likesCtrl.unlikePost);
router.get('/:postId/likes', likesCtrl.getAllLikesPost);

/* exports */
module.exports = router;