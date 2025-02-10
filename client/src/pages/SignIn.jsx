import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
// import Axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const [data, setData] = useState([]);

    const clickLogin = () => {
        const jsonData = {
            email: email,
            password: password
        }
        console.log('this is fetch');
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    localStorage.setItem('token', data.token);
                    alert('เข้าสู่ระบบสำเร็จ');
                    window.location = '/';
                } else {
                    localStorage.removeItem('token');
                    alert('เข้าสู่ระบบล้มเหลว');
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })

        // Axios.post('http://localhost:3001/login', {
        //     email: email,
        //     password: password
        // }).then((response) => {
        //     if (response.status === 'ok') {
        //         alert('login sucess')
        //     } else {
        //         alert('login failed')
        //     }
        //     console.log('Success', response.data);
        // }).catch((err) => {
        //     console.error('Error', err);
        // })
    }

    return (
        <div className='signup'>
            <div className='con-signup'>
                <div className='signup-img'>
                    <img src="https://cdn.pixabay.com/photo/2018/01/18/20/56/auto-3091234_640.jpg" alt="" />
                </div>
                <div className='signup-form'>
                    <div className='title-signup'>
                        <h1>เข้าสู่ระบบ</h1>
                    </div>
                    <div className="signup-info">
                        <input type="email" placeholder='อีเมล' onChange={(event) => { setEmail(event.target.value) }} name='email' id="email" autoComplete='email' />
                        <br />
                        <input type="password" placeholder='รหัสผ่าน' onChange={(event) => { setPassword(event.target.value) }} name='password' id="password" />
                    </div>
                    <div className='forget-password'>
                        <Link to="/forgetpassword">ลืมรหัสผ่าน?</Link>
                    </div>
                    <div className='signup-btn-summit'>
                        <button onClick={clickLogin}>เข้าสู่ระบบ</button>
                    </div>
                    <div className='signup-btn-ald'>
                        <Link to="/sign_up">สมัครสมาชิก</Link>
                        <Link to="/">กลับหน้าหลัก</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn