const express = require('express');
const router = express.Router();
const {registerUser, getAllUsers} = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/', getAllUsers);

const { loginUser } = require('../controllers/userController');
router.post('/login', loginUser);

const { addPost, getPosts } = require('../controllers/userController');
router.post('/add-post', addPost);
router.get('/posts', getPosts);

const upload = require('../middleware/upload');
router.post('/upload', upload.single('photo'), (req, res) => {
  res.send({ path: req.file.path });
});

module.exports = router;
