import React, { useState , useEffect} from 'react'
import AdminNavbar from '../../Components/navbar/AdminNavbar'
import axios from 'axios';

function AdminUsers() {
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchExpenses = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getExpenses`, {
              
                withCredentials: true
            });
            setExpenses(res.data);
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [filter]);
    
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/admin/expenses/${id}/status`, 
                { status: newStatus }, 
                { withCredentials: true });
            fetchExpenses();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };
    return (
    <>
            <AdminNavbar />
            <h1>Users</h1>

            
                <div className=" w-[70%] mx-auto overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">User</th>
                                <th className="py-2 px-4 text-left">Title</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Status</th>
                                <th className="py-2 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map(exp => (
                                <tr key={exp._id} className="border-t">
                                    <td className="py-2 px-4">{exp.user?.username}</td>
                                    <td className="py-2 px-4">{exp.title}</td>
                                    <td className="py-2 px-4">₹{exp.amount}</td>
                                    <td className="py-2 px-4">{exp.status}</td>
                                    <td className="py-2 px-4">
                                        <select
                                            value={exp.status}
                                            onChange={(e) => handleStatusChange(exp._id, e.target.value)}
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </>
            )
}

            export default AdminUsers