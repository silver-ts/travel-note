const { Router } = require('express');
const {
  signup_post,
  login_post,
  logout_delete,
  refresh_post,
} = require('../controllers/auth');

const limiter = require('../middlewares/limiter');

const router = Router();

router.post('/signup', limiter, signup_post);
router.post('/login', limiter, login_post);
router.delete('/logout', logout_delete);
router.post('/refresh-token', refresh_post);

module.exports = router;
