const { Router } = require('express');
const {
  logs_get,
  logs_post,
  logs_put,
  logs_delete,
} = require('../controllers/logs');

const verifyUserAuth = require('../middlewares/verifyUserAuth');
const limiter = require('../middlewares/limiter');

const router = Router();

router.post('/', limiter, verifyUserAuth, logs_post);
router.get('/', limiter, verifyUserAuth, logs_get);
router.put('/', limiter, verifyUserAuth, logs_put);
router.delete('/', limiter, verifyUserAuth, logs_delete);

module.exports = router;
