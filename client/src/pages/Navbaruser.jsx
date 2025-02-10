import React, { useEffect, useState } from 'react'

function Navbaruser() {
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

  function onClickProfile() {
    localStorage.setItem('store_profile', user.id)
    window.location = '/profileuser'
  }

  function check_mybuy() {
    if (user.mybuy > 0) {
      return (
        <li className='usernavbar-li' onClick={() => window.location = '/mybuy'}>รายการซื้อ <p>( {user.mybuy} )</p></li>
      )
    } else {
      return (
        <li onClick={() => window.location = '/mybuy'}>รายการซื้อ</li>
      )
    }
  }

  function check_mysell() {
    if (user.mysell > 0) {
      return (
        <li className='usernavbar-li' onClick={() => window.location = '/mysell'}>รายการขาย <p>( {user.mysell} )</p></li>
      )
    } else {
      return (
        <li onClick={() => window.location = '/mysell'}>รายการขาย</li>
      )
    }
  }

  function check_myexchang() {
    if (user.myexchang > 0) {
      return (
        <li className='usernavbar-li' onClick={() => window.location = '/myexchang'}>รายการแลกเปลี่ยน <p>( {user.myexchang} )</p></li>
      )
    } else {
      return (
        <li onClick={() => window.location = '/myexchang'}>รายการแลกเปลี่ยน</li>
      )
    }
  }

  function check_myoffer() {
    if (user.myoffer > 0) {
      return (
        <li className='usernavbar-li' onClick={() => window.location = '/myofferreceived'}>รายการข้อเสนอที่ได้ <p>( {user.myoffer} )</p></li>
      )
    } else {
      return (
        <li onClick={() => window.location = '/myofferreceived'}>รายการข้อเสนอที่ได้</li>
      )
    }
  }

  return (
    <div className='user-info'>
      <ul>
        <li className='user-info-li' onClick={onClickProfile}>ดูโปรไฟล์ของฉัน</li>
        <li>บัญชีของฉัน
          <ul>
            <li onClick={() => window.location = '/user/profile'}>ข้อมูลส่วนตัว</li>
            <li onClick={() => window.location = '/user/address'}>ที่อยู่</li>
            <li onClick={() => window.location = '/user/changepassword'}>เปลี่ยนรหัสผ่าน</li>
          </ul>
        </li>
        <div>
          <li className='user-info-li' onClick={() => window.location = '/myproducts'}>สินค้าของฉัน</li>
          <li>การซื้อและการขายของฉัน
            <ul>
              {check_mybuy()}
              {check_mysell()}
            </ul>
          </li>
          <li>การแลกเปลี่ยนและข้อเสนอที่ได้ของฉัน
            <ul>
              {check_myexchang()}
              {check_myoffer()}
            </ul>
          </li>
          <li className='user-info-li'
            onClick={() => {
              localStorage.removeItem('token');
              window.location = '/';
            }}>
            ออกจากระบบ
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Navbaruser