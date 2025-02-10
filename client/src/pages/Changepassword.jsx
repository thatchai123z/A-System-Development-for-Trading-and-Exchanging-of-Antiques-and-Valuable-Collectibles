import React, { useEffect, useState } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'

function Changepassword() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmnewpassword, setConfirmnewpassword] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3001/authen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    // alert('authen sucess');
                    fetch(`http://localhost:3001/user/${data.user[0].id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {
                                setUser(data.result[0]);
                                console.log(data.result[0]);
                            }
                        })
                        .catch((err) => {
                            console.error('Error', err);
                        })
                } else {
                    // alert('authe failed');
                    window.location = '/sign_in';
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }, [])

    const clickbuttonEdit = () => {
        if (newpassword === confirmnewpassword) {
            const jsondata = {
                id: user.id,
                password: password,
                newpassword: newpassword
            }
            fetch('http://localhost:3001/updatepassword', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsondata)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        alert('update success')
                        window.location = 'http://localhost:3000/user/profile'
                    } else {
                        alert('update failed')
                    }
                })
        }else {
            alert('การยืนยันรหัสผ่านผิดพลาด')
        }
    }

    return (
        <>
            <Navbar />
            <Navbaruser />
            <div className='con-profile'>
            
                <div className='profile'>
                    
                    <div className='profile-account'>
                        <h3>
                            เปลี่ยนรหัสผ่าน
                        </h3>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='edit-fname'>
                            <label htmlFor="">รหัสผ่านปัจจุบัน</label>
                            <input type="password" placeholder='กรอกรหัสผ่าน' onChange={(event) => { setPassword(event.target.value) }} />
                            <label htmlFor="">รหัสผ่านใหม่</label>
                            <input type="password" placeholder='กรอกรหัสผ่าน' onChange={(event) => { setNewpassword(event.target.value) }} />
                            <label htmlFor="">ยืนยันรหัสผ่านใหม่</label>
                            <input type="password" placeholder='กรอกรหัสผ่าน' onChange={(event) => { setConfirmnewpassword(event.target.value) }} />
                        </div>
                        <div className='edit-fname-button'>
                            <button onClick={clickbuttonEdit}>บันทึก</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Changepassword