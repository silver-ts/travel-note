const { Router } = require('express');
const { signup_post, login_post } = require('../controllers/auth');

const router = Router();

router.post('/signup', signup_post);
router.post('/login', login_post);

module.exports = router;
