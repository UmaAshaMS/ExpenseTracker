

const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Expense =  require('../models/expenseSchema')

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const admin = await User.findOne({ email });

        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ success: false,message: 'Not authorized as admin' });
        }

        const isMatch = await bcryptjs.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id }, 'secret_key');
        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',
        });

        res.status(200).json({ success: true,message: 'Admin logged in successfully', admin });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false,message: 'Something went wrong' });
    }
}

const getExpenseDetails = async(req, res) => {
    try{
      console.log('reached get expenses')
        const expenses = await Expense.find().populate('user', 'username email');
        res.status(200).json(expenses);
    
    }
    catch(error){
        res.status(500).json({ message: 'Error fetching expenses', error: err.message });
    }
}

module.exports = {
    login,
    getExpenseDetails,
}