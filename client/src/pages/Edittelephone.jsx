import React, { useEffect, useState } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'

function Edittelephone() {
    const [user, setUser] = useState('');
    const [telephone, settelephone] = useState('');

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
        const jsondata = {
            telephone: telephone,
            id: user.id
        }
        fetch('http://localhost:3001/updatetel', {
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
    }

    return (
        <>
            <Navbar />
            <Navbaruser />
            <div className='con-profile'>
                
                <div className='profile'>
                    <div className='profile-account'>
                        <h3>
                            แก้ไขเบอร์โทรศัพท์
                        </h3>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='edit-fname-old'>
                            <label htmlFor="">เบอร์โทรศัพท์เดิม</label>
                            <p>{user.telephone}</p>
                        </div>
                        <div className='edit-fname'>
                            <label htmlFor="">ป้อนเบอร์โทรศัพท์ที่ต้องการเปลี่ยน</label>
                            <input type="text" placeholder='เบอร์โทรศัพท์' onChange={(event) => { settelephone(event.target.value) }} />
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

export default Edittelephone