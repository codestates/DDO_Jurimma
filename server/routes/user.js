const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const { userController } = require('../controllers');

router.post('/login', userController.login.post);
router.post('/kakao', userController.kakao.post);
router.post('/google', userController.google.post);

router.post('/signup', userController.signup.post);
router.get('/signup', userController.signup.get);

router.get('/email-check', userController.emailCheck.get);

router.get('/logout', userController.logout.get);

router.get('/', userController.userInfo.get);
router.patch('/', userController.userInfo.patch);
router.delete('/', userController.userInfo.delete);

router.patch('/image', upload.single('image'), userController.image.patch);

router.patch('/quiz-exp', userController.quizExp.patch);

module.exports = router;
