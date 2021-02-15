const { Router } = require('express');
const {
  signup_post,
  login_post,
  signup_get,
  login_get,
  logout_get,
} = require('../controllers/auth');

const router = Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/signup', signup_get);
router.get('/login', login_get);
router.get('/logout', logout_get);

module.exports = router;
