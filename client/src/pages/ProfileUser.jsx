import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//components
import Navbar from './navbar'

//icons
import ReportIcon from '@mui/icons-material/Report';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

function ProfileUser() {
  const [user, setUser] = useState('');
  const [productList, setProductList] = useState([]);
  const [thisorderimages, setThisorderimages] = useState([]);
  const [modal, setModal] = useState(false);
  const [report, setReport] = useState('');

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
          fetch(`http://localhost:3001/user/${localStorage.getItem('store_profile')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'ok') {
                setUser(data.result[0]);
                console.log('this is user', data.result[0]);

                const jsonData = {
                  users_id: data.result[0].id
                }
                fetch('http://localhost:3001/myproducts', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(jsonData)
                })
                  .then(response => response.json())
                  .then(data => {
                    if (data.status === 'ok') {
                      setProductList(data.result);
                      console.log(data.result);
                      fetch(`http://localhost:3001/all_product_images`, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
                        .then(response => response.json())
                        .then(data => {
                          if (data.status === 'ok') {
                            setThisorderimages(data.result);
                            console.log(data.result);
                          }
                        })
                        .catch((err) => {
                          console.error('Error', err);
                        })
                    }
                  })
                  .catch((err) => {
                    console.error('Error', err);
                  })
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

  function check_product(item) {
    if (item.price === null) {
      return (
        <div className="box-price">
        </div>
      )
    } else {
      return (
        <div className="box-price">
          <h3>ราคา</h3>
          <h4>{item?.price} บาท</h4>
        </div>
      )
    }
  }

  function image_product(item) {
    const id = item.id
    for (let index = 0; index < thisorderimages.length; index++) {
      if (id === thisorderimages[index].product_id) {
        return (
          <img src={`/images/${thisorderimages[index].image}`} alt="" />
        )
      }
    }
  }

  const onClickReport = async () => {
    const jsonData = {
      id: user.id,
      report_count: user.report_count + 1
    }
    const jsonDataReport = {
      user_id: user.id,
      report: report
    }
    await fetch('http://localhost:3001/updatereportcount', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          console.log('suscess');
        } else {
          console.log('faile');
        }
      })
      .catch(err => {
        console.error('Error', err);
      })


    await fetch('http://localhost:3001/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonDataReport)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          alert('รายงานเรียบร้อยแล้ว')
          window.location = '/profileuser'
        } else {
          console.log('faile');
        }
      })
      .catch(err => {
        console.error('Error', err);
      })
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  function check_appprove (item) {
    if (item.approve === 1) {
      return (
        <div className='icon-box-new'><AssignmentTurnedInIcon sx={{ fontSize: 30 }} /></div>
      )
    }
  }

  return (
    <>
      <Navbar />
      <div className='profileuser-con'>
        <div className='profileuser-con-incon'>
          <div className='profileuser-img'>
            <StorefrontIcon sx={{ fontSize: 70 }} />
            {/* <img src={`/images/logo.png`} alt="" /> */}
          </div>
          <div className='profileuser-info'>
            <h2>{user.username}</h2>
            <h5>ขายสินค้าไปแล้ว {user.sold} ชิ้น</h5>
            <h5>แลกเปลี่ยนสินค้าไปแล้ว {user.exchanged} รายการ</h5>
          </div>
          <div className='profileuser-icons'>
            <button onClick={toggleModal} className='btn-modal'>
              <ReportIcon />
              <h4>รายงาน</h4>
            </button>

            {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                  <div className='add-report'>
                    <label className='lebel-report' htmlFor="">รายละเอียด</label>
                    <div className='add-report-textarea'>
                      <textarea name="des" id="" cols="30" rows="5" onChange={(event) => { setReport(event.target.value) }}></textarea>
                    </div>
                    <button className='btn-report' onClick={onClickReport}>
                      รายงาน
                    </button>
                  </div>

                  <button className='close-modal' onClick={toggleModal}>
                    ปิด
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="products">
        <div className="header-products">
          <h1>สินค้า</h1>
        </div>
        <div className="box">
          {
            productList.map(item => (
              <div className="box-item" key={item.id}>
                <Link onClick={() => localStorage.setItem('product_id', item.id)} to="/product">
                  <div className="box-new-2">
                    {/* <p>New</p> */}
                    {check_appprove (item)}
                  </div>
                  <div className="con-box-image">
                    <div className="box-image">
                      {/* <img src={`/images/${item?.image}`} alt="" /> */}
                      {image_product(item)}
                    </div>
                  </div>
                  <div className="box-info">
                    <h3>{item?.name_product}</h3>
                    {check_product(item)}
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default ProfileUser