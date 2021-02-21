const { Router } = require('express');
const {
  signup_post,
  login_post,
  logout_delete,
  refresh_post,
} = require('../controllers/auth');
const verifyUserAuth = require('../middleware/verifyUserAuth');

const router = Router();

router.get('/', verifyUserAuth, (req, res) => res.status(200).send({ user: res.locals.user, message: 'protected route' }));
router.post('/signup', signup_post);
router.post('/login', login_post);
router.delete('/logout', logout_delete);
router.post('/refresh-token', refresh_post);

module.exports = router;
