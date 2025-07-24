import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AdminLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/admin/login`, formData, {
          withCredentials: true, 
        })
  
        if (res.data.success) {
          navigate('/admin/dashboard') 
        }
      } catch (err) {
        alert(err.response.data.message || 'Login failed')
      }
    }
    return (
        <>
            <div className=' p-4 max-w-lg mx-auto h-screen'>
                <h1 className='text-3xl text-center font-bold m-7'>Admin login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='email'
                        placeholder='Email ID :'
                        id='email'
                        className='bg-slate-200 p-2.5 rounded-lg'
                        onChange={handleChange}
                    />
                    <input
                        type='password'
                        placeholder='Password :'
                        id='password'
                        className='bg-slate-200 p-2.5 rounded-lg'
                        onChange={handleChange}
                    />

                    <div className='flex justify-center items-center'>
                        <button className='cursor-pointer w-60 bg-slate-400 p-3 text-center rounded-full hover:bg-slate-700 transition'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin