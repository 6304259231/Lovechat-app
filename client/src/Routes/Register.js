import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Register.css'

function Register() {
    const [userAvatar, setUserAvatar] = useState('https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg')

    let navigate = useNavigate();

    let selectHandler = (e) => {
        setUserAvatar(e.target.src);
    }
    let [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        bio: "",
        location: "",
        avatar: "",
    })
    input.avatar = userAvatar;
    let changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    let submitHandler = async (e) => {
        e.preventDefault();
        if (!input.username || !input.email || !input.password || !input.confirmpassword || !input.location) {
            return toast.error('Please provide all the details');
        }
        if (input.password !== input.confirmpassword) {
            return toast.error('Passwords are not correct');
        }

        axios.post('http://localhost:5600/register', input)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.success);
                    setTimeout(() => {
                        navigate('/');
                    }, 3000)
                }
            })
            .catch((error) => {
                if (error.response) {
                    return toast.error(error.response.data.exists)
                }
                else {
                    return toast.error(' ! server error')
                }
            })
    }
    return (
        <div className='register-section' style={{ 'margin': '5px auto', boxShadow: '4px 3px 5px black', padding: '10px', width: "80%" }}>
            <div className='icon-section' style={{ textAlign: 'center', color: 'tomato' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="66" height="69" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                </svg>
            </div>
            <form onSubmit={submitHandler} method="POST">
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='username'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">User name <span style={{ color: 'red' }}>*</span></label>
                </div>

                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='email'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Email address <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name='password'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingPassword">Password <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="confirmpassword"
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='bio'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Bio <span style={{ color: 'red' }}>*</span></label>
                </div>
                <div className="form-floating" style={{ width: '50%', margin: '30px auto' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='location'
                        onChange={changeHandler}
                    />
                    <label htmlFor="floatingInput">Location <span style={{ color: 'red' }}>*</span></label>
                </div>
                <center className='avatar-section mt-4 mb-5'>
                    <div className='avatar-item-select' style={{ display: 'block' }} onClick={selectHandler}>
                        <img className='avatar-image' src={userAvatar}  alt="avatar"/>
                    </div>
                    <h1 style={{ color: '#ffffff', fontFamily: 'monoscope', margin: '40px' }}> Choose your Avataar </h1>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src='/Avatars/men1.jpg' alt="avatar" />
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/men2.jpg"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/women1.svg"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/women2.jpg"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/women3.jpeg"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/men3.jpeg"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/men4.png"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/men5.png"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/default2.png"  alt="avatar"/>
                    </div>
                    <div className='avatar-item' onClick={selectHandler}>
                        <img className='avatar-image' src="/Avatars/default.jpg"  alt="avatar"/>
                    </div>
                </center>
                <center className="col-auto register-btn">
                    <button type="submit" className="btn btn-primary m-3" style={{ width: '50%', fontSize: '22px' }}>Register</button>
                </center>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Register