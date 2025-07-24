import React from 'react'
import axios from 'axios';

function UserNavbar() {
    const handleLogout = async () => {
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
            withCredentials: true,
          });
          
          window.location.href = '/signin';
        } catch (err) {
          console.error('Logout failed:', err);
        }
      };
    return (
        <>
            <div className='bg-red-100'>
                <div className='p-4 flex justify-between items-center'>
                <h1 className='text-xl font-semibold'>Expense Tracker</h1>
                <button
                    onClick={handleLogout}
                    className="bg-white text-black px-4 py-2  hover:bg-red-300 rounded-full">
                    Sign Out
                </button>
                </div>
            </div>
        </>

    )
}

export default UserNavbar