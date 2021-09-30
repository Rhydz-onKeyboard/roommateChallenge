const { Router } = require('express');
const { addRoommate, getRoommates } = require('../controllers/roommates.controllers');

const router = Router();

router.get('/', getRoommates);
router.post('/', addRoommate);

module.exports = router;