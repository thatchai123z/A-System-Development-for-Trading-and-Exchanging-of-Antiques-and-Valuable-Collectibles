import React from 'react'
import { useState } from 'react';

function Forgetpassword() {
    const [email, setEmail] = useState("");

    // const [data, setData] = useState([]);

    const clickLogin = () => {
        const jsonData = {
            email: email
        }
        console.log('this is fetch');
        fetch('http://localhost:3001/checkemailforgetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    localStorage.setItem('email', data.result[0].email);
                    // console.log(localStorage.getItem('email'));
                    alert('อีเมลถูกต้อง');
                    window.location = "/updatepassword"
                } else {
                    alert('อีเมลไม่ถูกต้อง');
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
                        <h1>ลืมรหัสผ่าน</h1>
                    </div>
                    <div className="signup-info">
                        <input type="email" placeholder='อีเมล' onChange={(event) => { setEmail(event.target.value) }} name='email' id="email" autoComplete='email' />
                    </div>
                    <div className='signup-btn-summit'>
                        <button onClick={() => window.location = "/sign_in"}>ย้อนกลับ</button>
                        <button onClick={clickLogin}>ดำเนินการต่อ</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgetpassword