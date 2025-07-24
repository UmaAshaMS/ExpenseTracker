
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AdminNavbar() {
    const handleLogout = async () => { }
    const navigate = useNavigate()
    return (
        <>
            <div className='bg-gray-100'>
                <div className='p-4 flex justify-between items-center'>
                    <h1 className='text-xl font-semibold'>Expense Tracker</h1>
                    <div className='flex items-center gap-4 ml-auto mr-4'>
                        <button className="bg-white text-black px-4 py-2  hover:bg-gray-300 rounded-full cursor-pointer" onClick={() => navigate('/admin/dashboard')}>Home</button>
                        <button className="bg-white text-black px-4 py-2  hover:bg-gray-300 rounded-full cursor-pointer" onClick={() => navigate('/admin/users')}>
                            Users</button>
                        <button
                            className="bg-white text-black px-4 py-2  hover:bg-gray-300 rounded-full cursor-pointer">
                            About</button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-black px-4 py-2  hover:bg-gray-300 rounded-full cursor-pointer">
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminNavbar