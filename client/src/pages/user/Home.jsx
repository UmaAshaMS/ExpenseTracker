import React, { useEffect, useState } from 'react';
import UserNavbar from '../../Components/navbar/UserNavbar'
import axios from 'axios';
import AddExpenseForm from './AddExpense';

function UserHome() {
    const [message, setMessage] = useState('');
    const [expenses, setExpenses] = useState([]);

    
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/home`, {
                    withCredentials: true
                });
                setMessage(res.data.message);
            } catch (err) {
                setMessage('Access denied or session expired');
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getExpenses`, {
                    withCredentials: true 
                });
                setExpenses(res.data.expenses);
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to fetch expenses');
            }
        };

        fetchExpenses();
    }, []);

    const handleAddExpense = (formData) => {
        console.log("Expense Added:", formData);
        setShowForm(false); 
      };

    return (
        <>
            <UserNavbar />
            <div className='p-5 text-center'>
                <h2 className='text-4xl font-bold'>{message}</h2>
                <h3 className='text-2xl font-bold'>Track Your Expenses</h3>
                <br/>
                <button onClick={() => setShowForm(true)} className="bg-red-200 text-black px-4 py-2  hover:bg-red-300 rounded-full cursor-po inter">Add Expense</button>
                <br />
            </div>

            <div className=" w-[70%] mx-auto overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-r border-gray-300">Date</th>
                            <th className="py-2 px-4 border-r border-gray-300">Category</th>
                            <th className="py-2 px-4 border-r border-gray-300">Amount (₹)</th>
                            <th className="py-2 px-4 border-r border-gray-300">Note</th>
                            <th className="py-2 px-4 border-r border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {console.log(expenses)}
                        {expenses.map((expense, index) => (
                           
                            <tr key={index} className="text-center hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{expense.date}</td>
                                <td className="py-2 px-4 border-b">{expense.category}</td>
                                <td className="py-2 px-4 border-b">{expense.amount}</td>
                                <td className="py-2 px-4 border-b">{expense.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {showForm && <AddExpenseForm onSubmit={handleAddExpense} onClose={() => setShowForm(false)}/>}


        </>

    );
}

export default UserHome;
