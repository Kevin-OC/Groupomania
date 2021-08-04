const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth.js'); // <- middleware d'authentification (routes à protéger)
const multer = require('../middleware/multer-config.js'); // <- middleware de gestion des images

/* '/' = https://localhost:3000/api/posts */

/* route création post */
router.post('/create', auth, multer, postCtrl.createPost);

/* route modification post */
router.put('/:id', auth, multer, postCtrl.editPost);

/* route affichage ensemble des posts */
router.get('/all', auth, postCtrl.getAllPosts);

/* route affichage post connecté */
router.get('/:id', auth, postCtrl.getOnePost);

/* route suppression post */
router.delete('/:id', auth, postCtrl.deletePost);

/* exports */
module.exports = router;