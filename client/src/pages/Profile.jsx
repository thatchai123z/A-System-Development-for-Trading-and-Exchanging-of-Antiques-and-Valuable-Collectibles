import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'

function Profile() {
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
          // alert('authen sucess');
          // setUser(data.user[0]);
          // console.log(data.user[0]);
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

  return (
    <>
      <Navbar />
      <Navbaruser />
      <div className='con-profile'>
        <div className='profile'>
          <div className='profile-account'>
            <h3>
              ข้อมูลของฉัน
            </h3>
            <div className='profile-account-hr'>
              <hr />
            </div>
            <div className='profile-account-info'>
              <div className='profile-account-info-input'>
                <div className='profile-account-info-input-edit'>
                  <div className='profile-account-info-input-edit-1'>
                    <label htmlFor="">ชื่อผู้ใช้</label>
                  </div>
                  <p>{user.username}</p>
                </div>
                <div className='profile-account-info-input-edit'>
                  <div className='profile-account-info-input-edit-2'>
                    <label htmlFor="">ชื่อจริง</label>
                  </div>
                  <p>{user.fname}</p>
                  <Link to='/user/profile/editfname'>แก้ไขข้อมูล</Link>
                </div>
                <div className='profile-account-info-input-edit'>
                  <div className='profile-account-info-input-edit-3'>
                    <label htmlFor="">นามสกุล</label>
                  </div>
                  <p>{user.lname}</p>
                  <Link to='/user/profile/editlname'>แก้ไขข้อมูล</Link>
                </div>
                <div className='profile-account-info-input-edit'>
                  <div className='profile-account-info-input-edit-4'>
                    <label htmlFor="">อีเมล</label>
                  </div>
                  <p>{user.email}</p>
                </div>
                <div className='profile-account-info-input-edit'>
                  <div className='profile-account-info-input-edit-5'>
                    <label htmlFor="">หมายเลขโทรศัพท์</label>
                  </div>
                  <p>{user.telephone}</p>
                  <Link to='/user/profile/edittelephone'>แก้ไขข้อมูล</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile