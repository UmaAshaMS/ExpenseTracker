import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function AddExpenseForm({ onClose , onSubmit}) {
    const [formData, setFormData] = useState({
        date: '',
        category: '',
        amount: '',
        note: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post(`${import.meta.env.VITE_API_URL}/api/user/addExpense`, formData , {
                withCredentials: true
              });
            onSubmit(formData);
            setFormData({ date: '', category: '', amount: '', note: '' });
            toast.success('Expense added!');
        }
        catch(error){
            console.error('Error saving expense:', error);
            toast.error(error.response?.data?.message || 'Adding expense failed!');
        }
       
    };

    return (
        <div className="w-[40%] mx-auto p-6 rounded shadow-md mt-6 fixed inset-0 bg-white bg-opacity-50 z-50">
            <h2 className="text-2xl font-bold mb-4 text-center text-black-500">Add Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <button
                    className="absolute top-2 right-2 text-gray-500 text-sm cursor-pointer"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div>
                    <label className="block font-semibold">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Bills">Bills</option>
                        <option value="Rent">Rent</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Savings">Savings</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div>
                    <label className="block font-semibold">Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold">Note</label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        rows="3"
                        placeholder="Optional note"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-red-300 text-black px-6 py-2 rounded-full hover:bg-red-200 cursor-pointer"
                    >
                        Add Expense
                    </button>
                </div>
                <button
                    className="text-sm text-red-500 hover:underline cursor-pointer"
                    onClick={onClose}
                >
                    Close
                </button>
            </form>
            <ToastContainer position='top-center' autoClose={2000} />
        </div>
    );
}

export default AddExpenseForm;
