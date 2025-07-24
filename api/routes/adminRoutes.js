const express = require('express');
const { verifyUser, ensureAuthenticated, verifyRole } = require('../utils/verifyToken');


const {login, getExpenseDetails  } = require('../controllers/adminController');

const employeeVerifier = verifyRole(['user', 'admin'])
const router = express.Router()

router.post('/admin/login', ensureAuthenticated, employeeVerifier, login)
router.get('/admin/getExpenses', ensureAuthenticated, employeeVerifier, getExpenseDetails)



module.exports = router;
