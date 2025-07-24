import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'user' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData, {
                withCredentials: true,
            });
            // alert('Signup successful!');
            toast.success('Signup successful!');
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (err) {
            // alert(err.response.data.message);
            toast.error(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <>
            <div className='p-3 max-w-lg mx-auto h-screen'>
                <h1 className='text-3xl text-center font-bold m-7'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} className='bg-red-50 p-2.5 rounded-lg' required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className='bg-red-50 p-2.5 rounded-lg' required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} className='bg-red-50 p-2.5 rounded-lg' required />
                    
                    <div className='flex justify-center items-center'>
                        <button type="submit" className='cursor-pointer bg-red-200 p-3 w-60  text-center rounded-full hover:bg-red-300 transition'>Signup</button>
                    </div>
                </form>

                <div className='flex gap-2 mt-5'>
                    <p>Already have an account ? </p>
                    <Link to='/signin' >
                        <span className='text-blue-500 flex'>Sign In </span>
                    </Link>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default Signup;
