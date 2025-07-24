const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
    },
    category: {
        type: String,
    },
    date: {
        type: Date,
    },
    note: {
        type: String,
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}) 

module.exports = mongoose.model('Expense', expenseSchema);