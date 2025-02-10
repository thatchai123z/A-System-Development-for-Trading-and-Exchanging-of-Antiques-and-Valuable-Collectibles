import React, { useEffect, useState } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'

function Address() {
  const [user, setUser] = useState('');
  const [address, setAddress] = useState('');

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
      address: address,
      id: user.id
    }
    fetch('http://localhost:3001/updateaddress', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsondata)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          alert('เปลี่ยนที่อยู่ของคุณเรียบร้อยแล้ว')
          window.location = 'http://localhost:3000/user/profile'
        } else {
          alert('เกิดข้อผิดพลาด')
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
              ที่อยู่ของฉัน
            </h3>
            <div className='profile-account-hr'>
              <hr />
            </div>
            <div className='address-con'>
              <div className='address-present'>
                <label htmlFor="">ที่อยู่ปัจจุบัน</label>
                <p>{user.address}</p>
              </div>
              <div className='address-modify'>
                <label htmlFor="">ที่อยู่ที่ต้องการแก้</label>
                <textarea name="textarea" cols="30" rows="5" onChange={(event) => { setAddress(event.target.value) }}></textarea>
              </div>
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

export default Address