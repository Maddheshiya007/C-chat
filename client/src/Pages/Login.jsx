import React, { useEffect } from 'react'
import { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ApiLogin } from '../Utils/ApiRoutes';



const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, []);


    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const formvalidation = () => {
        if (data.password.length < 6) {
            alert('Password must be atleast 6 characters long');
            return false;
        }
        if (data.email.length < 3) {
            alert('Email must be atleast 3 characters long');
            return false;
        }
        return true;
    }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (formvalidation()) {
            const res = await axios.post(ApiLogin, data);
            if (res.data.status === 400) {
                toast.error(res.data.message);
                return;
            }

            if (res.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                toast.success('Account Logged in successfully');
                console.log(res.data.user.isAvatarImageSet)
                if (res.data.user.isAvatarImageSet === false) {
                    navigate('/setAvatar');
                }
                else {
                    navigate('/');
                }
                return;
            }

        }
        console.log(data);
    }
    return (
        <div className='register'>
            <form onSubmit={submitHandler} className='form'>
                <h2>C-Chat</h2>
                <input type="email" name="email" placeholder="Email" value={data.email} onChange={(e) => {
                    changeHandler(e);
                }} />
                <input type="password" name="password" placeholder="Password" value={data.password} onChange={(e) => {
                    changeHandler(e);
                }} />
                <button type='submit'>Login</button>
                <h2> If you don't have account  <Link to='/register'>Create Here</Link></h2>
            </form>
        </div>
    )
}

export default Login
