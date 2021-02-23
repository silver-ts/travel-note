const { Router } = require('express');
const { logs_get, logs_post } = require('../controllers/logs');

const router = Router();

router.post('/', logs_post);
router.get('/', logs_get);

module.exports = router;
