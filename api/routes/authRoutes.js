const express = require('express');

const { signin, signup, authCheck } = require('../controllers/authController');


const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/authCheck', authCheck)


module.exports = router;