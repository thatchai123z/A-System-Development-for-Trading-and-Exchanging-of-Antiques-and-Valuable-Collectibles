import React, { useState } from 'react'

function Editpassword() {
    const [newpassword, setNewpassword] = useState("");
    const [confirmnewpassword, setConfirmnewpassword] = useState("");

    const clickbuttonEdit = () => {
        if (newpassword === confirmnewpassword) {
            const jsondata = {
                email: localStorage.getItem('email'),
                newpassword: newpassword
            }
            fetch('http://localhost:3001/forgetpassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsondata)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        alert('เปลี่ยนรหัสผ่านเรียบร้อย')
                        localStorage.removeItem('email')
                        window.location = 'http://localhost:3000/sign_in'
                    } else {
                        alert('เปลี่ยนรหัสผ่านไม่สำเร็จ')
                    }
                })
        } else {
            alert('รหัสผ่านไม่เหมือนกัน')
        }
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
                        <input type="password" placeholder='รหัสผ่านใหม่' onChange={(event) => { setNewpassword(event.target.value) }} name='email' id="email" autoComplete='email' />
                        <br />
                        <input type="password" placeholder='ยืนยันรหัสผ่านใหม่' onChange={(event) => { setConfirmnewpassword(event.target.value) }} name='password' id="password" />
                    </div>
                    <div className='signup-btn-summit'>
                        <button onClick={() => window.location = "/sign_in"}>ย้อนกลับ</button>
                        <button onClick={clickbuttonEdit}>บันทึก</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editpassword