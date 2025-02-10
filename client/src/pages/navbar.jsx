import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//icons
import { FaUserAlt } from 'react-icons/fa'

//css
import "../css/style.css"

function Navbar() {
    const [user, setUser] = useState('');

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
                    setUser(data.user[0])
                    console.log(data.user[0]);
                    // alert('authen sucess');
                } else {
                    // alert('authe failed');
                    // window.location = '/sign_in';
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }, [])

    return (
        <>
            <div className="logo">
                <h1><img src="/images/logo.png" alt="" width={150} /></h1>
            </div>
            <section className="nav-acc">
                <div className="nav">
                    <ul>
                        <li><Link to="/">หน้าหลัก</Link></li>
                        <li><Link to="/shop">สินค้า</Link></li>
                    </ul>
                </div>
                <div className="acc">
                    <ul>
                        <li><Link className='acc-name' to="/user/profile"><FaUserAlt /><p>{user.username}</p></Link></li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Navbar