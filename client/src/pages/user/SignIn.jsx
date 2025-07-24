import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function SignIn() {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, formData, {
                withCredentials: true,
            });

            const userData = res.data;

            toast.success('Login successful!');

            setTimeout(() => {
                if (userData.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/home');
                }
            }, 2000);

        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed!');
        } finally {
            setLoading(false);
        }
    
    };

    return (
        <>
            <div className=' max-w-lg mx-auto h-screen'>
                <h1 className='text-3xl text-center font-bold m-7'>Sign In</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>


                    <input
                        placeholder='Email ID :'
                        type='email'
                        name='email'
                        className='bg-red-50 p-2.5 rounded-lg'
                        onChange={handleChange} />

                    <input
                        placeholder='Password :'
                        type='password'
                        name='password'
                        className='bg-red-50 p-2.5  rounded-lg'
                        onChange={handleChange} />

                    <div className='flex justify-center items-center'>
                        <button className='cursor-pointer w-60 bg-red-100 p-3 text-center rounded-full hover:bg-red-300 transition'>{loading ? 'Loading...' : 'Sign in'}</button>

                    </div>

                    {/* <button className='cursor-pointer'>SignIn via Google</button> */}
                </form>

                <div className='flex gap-2 mt-5'>
                    <p className='text-black-600'>New User ? </p>
                    <Link to='/signup' >
                        <span className='text-blue-500 flex'>Sign Up </span>
                    </Link>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={2000} />

        </>
    )
}

export default SignIn