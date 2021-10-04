const express = require('express');
const router = express.Router();
const upload = require('../modules/multer');
const { userController } = require('../controllers');

router.post('/login', userController.login.post);
router.post('/kakao', userController.kakao.post);
router.post('/google', userController.google.post);

router.post('/signup', userController.signup.post);

router.get('/:email/verification', userController.verification.get);
router.get('/:email/check', userController.emailCheck.get);

router.get('/logout', userController.logout.get);

router.get('/:id', userController.userInfo.get);
router.put('/:id', userController.userInfo.put);
router.delete('/:id', userController.userInfo.delete);

router.patch('/:id/image', upload.single('image'), userController.image.patch);

router.patch('/:id/quiz-exp', userController.quizExp.patch);

module.exports = router;
