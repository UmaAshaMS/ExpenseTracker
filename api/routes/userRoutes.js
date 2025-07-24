const express = require('express');
const { verifyUser, ensureAuthenticated, verifyRole } = require('../utils/verifyToken');
const { home, addExpense, getExpenses, logout } = require('../controllers/userController');


const router = express.Router()

const employeeVerifier = verifyRole(['user', 'admin'])

router.get('/home', ensureAuthenticated, employeeVerifier, home)
router.get('/getExpenses', verifyUser, getExpenses)
router.post('/addExpense', verifyUser, addExpense)
router.get('/logout', logout)


module.exports = router;