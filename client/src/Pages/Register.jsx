import React from 'react'
import { useState, useEffect } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ApiRegister } from '../Utils/ApiRoutes';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, []);

    const formvalidation = () => {
        if (data.username.length < 3) {
            alert('Username must be atleast 3 characters long');
            return false;
        }
        if (data.password.length < 6) {
            alert('Password must be atleast 6 characters long');
            return false;
        }
        if (data.password !== data.confirmpassword) {
            alert('Passwords do not match');
            return false;
        }
        return true;
    }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(data);
        if (formvalidation()) {

            let res = await axios.post(ApiRegister, data);

            if (res.data.status === 400) {
                toast.error(res.data.message);
                return;
            }
            if (res.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                toast.success('Account created successfully');
                    navigate('/setAvatar');
    
                return;
            }
        }
    }

    return (
        <div className='register'>
            <form onSubmit={submitHandler} className='form'>
                <h2>C-Chat</h2>
                <input type="text" name="username" placeholder="Username" value={data.username} onChange={(e) => {
                    changeHandler(e);
                }} />
                <input type="email" name="email" placeholder="Email" value={data.email} onChange={(e) => {
                    changeHandler(e);
                }} />
                <input type="password" name="password" placeholder="Password" value={data.password} onChange={(e) => {
                    changeHandler(e);
                }} />
                <input type="password" name='confirmpassword' placeholder='Confirm password' value={data.confirmpassword} onChange={(e) => {
                    changeHandler(e);
                }} />
                <button type='submit'>Create Account</button>
                <h2>Already have an account? <Link to='/login'>Login</Link></h2>
            </form>
        </div>
    )
}

export default Register
