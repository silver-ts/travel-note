const { Router } = require('express');
const {
  logs_get,
  logs_post,
  logs_put,
  logs_delete,
} = require('../controllers/logs');

const router = Router();

router.post('/', logs_post);
router.get('/', logs_get);
router.put('/', logs_put);
router.delete('/', logs_delete);

module.exports = router;
