const express = require('express');
const router = express.Router();
const msgController = require('../Controller/msgController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', msgController.createSecret);

router.get('/', msgController.getAllSecrets);

router.delete('/:title', msgController.deleteSecret);

module.exports = router;
