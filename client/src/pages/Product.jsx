import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//components
import Navbar from './navbar'

//icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { AiOutlineCaretLeft } from 'react-icons/ai'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function Product() {
  const [product, setProduct] = useState('');
  const [user, setUser] = useState('');
  const [thisorderimages, setThisorderimages] = useState([]);
  const [count, setCount] = useState(0);

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
          console.log(data);
          fetch(`http://localhost:3001/product/${localStorage.getItem('product_id')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'ok') {
                setProduct(data.result[0]);
                console.log(data.result[0]);
                fetch(`http://localhost:3001/product_images/${data.result[0].id}`, {
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
                fetch(`http://localhost:3001/user/${data.result[0].users_id}`, {
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

  function check_product(product) {
    if (product.total_product > 0) {
      if (product.price === null) {
        return (
          <div className='slproduct-btn'>
            <div className='slproduct-btn-box1'>
              <div className='slproduct-btn-price'>
                <div className='slproduct-btn-price-v2'>
                  <h2>แลกเปลี่ยนอย่างเดียว</h2>
                </div>
              </div>
              <div className='slproduct-btn-button'>
                <h3>เหลืออยู่ {product.total_product} ชิ้น</h3>
              </div>
              <div className='slproduct-btn-button'>
                <Link to="/exchangeproduct">แลกเปลี่ยน</Link>
              </div>
            </div>

            <div className='slproduct-btn-profile' onClick={onClickProfile}>
              <div className='slproduct-btn-profile-name'>
                <AccountCircleIcon />
                <h4>{user.username}</h4>
              </div>
              <div className='slproduct-btn-profile-store'>
                <StorefrontIcon sx={{ fontSize: 30 }} />
              </div>
            </div>
          </div>
        )
      } else if (product.check_product === 1) {
        return (
          <div className='slproduct-btn'>
            <div className='slproduct-btn-box1'>
              <div className='slproduct-btn-price'>
                <h2>ราคา {product.price} บาท</h2>
              </div>
              <div className='slproduct-btn-button'>
                <h3>เหลืออยู่ {product.total_product} ชิ้น</h3>
              </div>
              <div className='slproduct-btn-button'>
                <Link to="/buyproduct" className='slproduct-btn-button-1'>ซื้อทันที</Link>
                <Link to="/exchangeproduct">แลกเปลี่ยน</Link>
              </div>
            </div>

            <div className='slproduct-btn-profile' onClick={onClickProfile}>
              <div className='slproduct-btn-profile-name'>
                <AccountCircleIcon />
                <h4>{user.username}</h4>
              </div>
              <div className='slproduct-btn-profile-store'>
                <StorefrontIcon sx={{ fontSize: 30 }} />
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className='slproduct-btn'>
            <div className='slproduct-btn-box1'>
              <div className='slproduct-btn-price'>
                <h2>ราคา {product.price} บาท</h2>
              </div>
              <div className='slproduct-btn-button'>
                <h3>เหลืออยู่ {product.total_product} ชิ้น</h3>
              </div>
              <div className='slproduct-btn-button-v2'>
                <Link to="/buyproduct" className='slproduct-btn-button-2'>ซื้อทันที</Link>
              </div>
            </div>

            <div className='slproduct-btn-profile' onClick={onClickProfile}>
              <div className='slproduct-btn-profile-name'>
                <AccountCircleIcon />
                <h4>{user.username}</h4>
              </div>
              <div className='slproduct-btn-profile-store'>
                <StorefrontIcon sx={{ fontSize: 30 }} />
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className='slproduct-btn'>
          <div className='slproduct-btn-box1'>
            <div className='slproduct-btn-price'>
              <div className='slproduct-btn-price-v2'>
                <h2>แลกเปลี่ยนอย่างเดียว</h2>
              </div>
            </div>
            <div className='slproduct-btn-button'>
              <h3>สินค้าหมด</h3>
            </div>
            {/* <div className='slproduct-btn-button'>
              <Link to="/exchangeproduct">แลกเปลี่ยน</Link>
            </div> */}
          </div>

          <div className='slproduct-btn-profile' onClick={onClickProfile}>
            <div className='slproduct-btn-profile-name'>
              <AccountCircleIcon />
              <h4>{user.username}</h4>
            </div>
            <div className='slproduct-btn-profile-store'>
              <StorefrontIcon sx={{ fontSize: 30 }} />
            </div>
          </div>
        </div>
      )
    }
  }

  function image_product(item) {
    const id = item.id
    console.log('this is id = ', id);
    for (let index = 0; index < thisorderimages.length; index++) {
      if (id === thisorderimages[index].product_id) {
        return (
          <img src={`/images/${thisorderimages[count].image}`} alt="" />
        )
      }
    }
    // return (
    //   <img src={`/images/${thisorderimages[count].image}`} alt="" />
    // )
  }

  function clickcountminus() {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  function clickcountpush() {
    if (count < thisorderimages.length - 1) {
      setCount(count + 1)
    }
  }

  function check_appprove(item) {
    if (item.approve === 1) {
      return (
        <>
          <div className='approve-box'>
            <AssignmentTurnedInIcon className='icon-h1con' sx={{ fontSize: 35 }} />
            <p>รับประกันความปลอดภัย</p>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <Navbar />
      <div className='slproduct'>
        <h1 className='h1-icon'>
          <div className='h1-icon-goback'>
            <Link to="/shop"><AiOutlineCaretLeft /></Link>
          </div>
          {check_appprove(product)}
        </h1>
        <div className='slproduct-imgandprice'>
          <div className='slproduct-img'>
            {/* <img src={`/images/${product.image}`} alt="" /> */}
            <div className='button-chang-image'>
              <ArrowCircleLeftIcon onClick={clickcountminus} />
            </div>
            {image_product(product)}
            <div className='button-chang-image'>
              <ArrowCircleRightIcon onClick={clickcountpush} />
            </div>
          </div>
          {check_product(product)}
        </div>
        <div className='slproduct-info'>
          <h1>{product.name_product}</h1>
          <p>{product.des}</p>
        </div>
      </div>
    </>

  )
}

export default Product