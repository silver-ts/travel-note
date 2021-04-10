const { Router } = require('express');
const {
  logs_get,
  logs_post,
  logs_put,
  logs_delete,
} = require('../controllers/logs');

const router = Router();
const verifyUserAuth = require('../middlewares/verifyUserAuth');

router.post('/', verifyUserAuth, logs_post);
router.get('/', verifyUserAuth, logs_get);
router.put('/', verifyUserAuth, logs_put);
router.delete('/', verifyUserAuth, logs_delete);

module.exports = router;
