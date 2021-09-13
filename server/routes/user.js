const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

router.post('/login', userController.login.post);
router.post('/kakao', userController.kakao.post);
router.post('/google', userController.google.post);
router.post('/signup', userController.signup.post);
router.get('/signup', userController.signup.get);
router.post('/check-email', userController.checkEmail.post);
router.post('/logout', userController.logout.post);
router.delete('/signout', userController.signout.delete);
router.patch('/edition', userController.edition.patch);
router.patch('/quiz-exp', userController.quizExp.patch);

module.exports = router;
