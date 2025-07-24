const User = require('../models/userSchema');
const Expense =  require('../models/expenseSchema')


const home = async(req, res) => {
    try{
        const user = req.user; 
        if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });
        res.status(200).json({ success: true,role: user.role, message: `Welcome, ${req.user.username}` });
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        // console.log(expenses)
        res.status(200).json({ success: true, expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch expenses', error: error.message });
    }
};

const addExpense = async(req, res) => {
    try{
        const userId = req.user._id
        const {note, amount, category, date } = req.body;

        const newExpense = new Expense({userId, amount, category, date, note})
        await newExpense.save()
        res.status(201).json({ success: true, message: 'Expense added successfully', expense: newExpense });
    }
    catch(error){
        console.log(err)
        res.status(500).json({ success: true, message: 'Adding expense failed', error : error.message });
    }
}

const editExpense = async(req, res) => {

}

const deleteExpense = async(req, res) => {

}

const logout = async(req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        sameSite: 'Lax',
        // secure: process.env.NODE_ENV === 'production'
      });
      res.status(200).json({ success: true, message: 'Logged out successfully' });
}

module.exports = {
    home,
    getExpenses,
    addExpense,
    editExpense,
    deleteExpense,
    logout

}