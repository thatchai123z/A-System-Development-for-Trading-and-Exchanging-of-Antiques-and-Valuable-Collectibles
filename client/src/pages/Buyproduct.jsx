import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//components
import Navbar from './navbar'

//icons
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'

function Buyproduct() {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState('');
  const [user, setUser] = useState('');
  const [check_express, setCheck_express] = useState("จัดส่งปกติ");
  const [thisorderimages, setThisorderimages] = useState([]);

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
          setUser(data.user[0]);
          console.log('this is user ', data.user[0]);
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
        } else {
          // alert('authe failed');
          window.location = '/sign_in';
        }
      })
      .catch((err) => {
        console.error('Error', err);
      })
  }, [])

  function clickcountminus() {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  function clickcountpush() {
    if (count < product.total_product) {
      setCount(count + 1)
    }
  }

  function image_product(item) {
    const id = item.id
    console.log('this is id = ', id);
    for (let index = 0; index < thisorderimages.length; index++) {
      if (id === thisorderimages[index].product_id) {
        return (
          <img src={`/images/${thisorderimages[index].image}`} alt="" />
        )
      }
    }
  }

  function clickconfirm() {
    if (window.confirm("คุณแน่ใจที่จะซื้อสินค้านี้ใช่ไหม!") === true) {
      if (check_express === "จัดส่งปกติ") {
        for (let index = 0; index < thisorderimages.length; index++) {
          if (product.id === thisorderimages[index].product_id) {
            const jsonData = {
              buyer_id: user.id,
              seller_id: product.users_id,
              product_id: product.id,
              name_product: product.name_product,
              price: product.price,
              total_countbuy: count,
              image: thisorderimages[index].image,
              check_express: 0,
              contact: user.telephone,
              status_express: "รอการยืนยันการสั่งซื้อ",
              total_product: product.total_product - count
            }
            fetch('http://localhost:3001/buyproduct', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonData)
            })
              .then(response => response.json())
              .then(async data => {
                if (data.status === 'ok') {
                  console.log(data.result[0]);

                  await fetch(`http://localhost:3001/user/${user.id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.status === 'ok') {
                        const jsonDataSeller = {
                          id: data.result[0].id,
                          mybuy: data.result[0].mybuy + 1
                        }
                        fetch(`http://localhost:3001/updatemybuy`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(jsonDataSeller)
                        })
                          .catch(err => {
                            console.error('Error', err);
                          })
                      }
                    })
                    .catch(err => {
                      console.error('Error', err);
                    })

                  await fetch(`http://localhost:3001/user/${product.users_id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.status === 'ok') {
                        const jsonDataSeller = {
                          id: data.result[0].id,
                          mysell: data.result[0].mysell + 1
                        }
                        fetch(`http://localhost:3001/updatemysell`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(jsonDataSeller)
                        })
                          .catch(err => {
                            console.error('Error', err);
                          })
                      }
                    })
                    .catch(err => {
                      console.error('Error', err);
                    })

                  alert('สั่งซื้อเรียบร้อย')
                  window.location = ('/mybuy');

                  return
                } else {
                  alert('สั่งซื้อล้มเหลว')
                }
              })
              .catch((err) => {
                console.error('Error', err);
              })
            return
          }
        }
      } else if (check_express === "นัดรับสินค้า") {
        for (let index = 0; index < thisorderimages.length; index++) {
          if (product.id === thisorderimages[index].product_id) {
            const jsonData = {
              buyer_id: user.id,
              seller_id: product.users_id,
              product_id: product.id,
              name_product: product.name_product,
              price: product.price,
              total_countbuy: count,
              image: thisorderimages[index].image,
              check_express: 1,
              contact: user.telephone,
              status_express: "รอการยืนยันการสั่งซื้อ",
              total_product: product.total_product - count
            }
            fetch('http://localhost:3001/buyproduct', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(jsonData)
            })
              .then(response => response.json())
              .then(async data => {
                if (data.status === 'ok') {
                  console.log(data.result[0]);
                  await fetch(`http://localhost:3001/user/${user.id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.status === 'ok') {
                        const jsonDataSeller = {
                          id: data.result[0].id,
                          mybuy: data.result[0].mybuy + 1
                        }
                        fetch(`http://localhost:3001/updatemybuy`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(jsonDataSeller)
                        })
                          .catch(err => {
                            console.error('Error', err);
                          })
                      }
                    })
                    .catch(err => {
                      console.error('Error', err);
                    })

                  await fetch(`http://localhost:3001/user/${product.users_id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(response => response.json())
                    .then(data => {
                      if (data.status === 'ok') {
                        const jsonDataSeller = {
                          id: data.result[0].id,
                          mysell: data.result[0].mysell + 1
                        }
                        fetch(`http://localhost:3001/updatemysell`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(jsonDataSeller)
                        })
                          .catch(err => {
                            console.error('Error', err);
                          })
                      }
                    })
                    .catch(err => {
                      console.error('Error', err);
                    })

                  alert('สั่งซื้อเรียบร้อย')
                  window.location = ('/mybuy');
                  return
                } else {
                  alert('สั่งซื้อล้มเหลว')
                }
              })
              .catch((err) => {
                console.error('Error', err);
              })

            return
          }
        }
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className='box-buyproduct'>
        <div className="buyproduct-name">
          <h1>
            {product.name_product}
          </h1>
        </div>
        <div className='buyproduct-imgandinfo'>
          <div className="buyproduct-img">
            {/* <img src={`/images/${product.image}`} alt="" /> */}
            {image_product(product)}
          </div>
          <div className="buyproduct-info">
            <div className="buyproduct-info-price">
              <h1>ราคา</h1>
              <h1>{product.price} บาทต่อชิ้น</h1>
            </div>
            <div className="buyproduct-info-count">
              <h1><AiOutlineCaretLeft onClick={clickcountminus} /></h1>
              <h2>{count}</h2>
              <h1><AiOutlineCaretRight onClick={clickcountpush} /></h1>
            </div>
            <div className='buyproduct-info-shippingmethod'>
              <h2>วิธีการจัดส่ง</h2>
              <select name="gender" id="gender" className='buyproduct-info-shippingmethod-select' onChange={(event) => { setCheck_express(event.target.value) }}>
                <option>จัดส่งปกติ</option>
                <option>นัดรับสินค้า</option>
              </select>
            </div>
            <div className='buyproduct-info-totalprice'>
              <h2>
                ราคารวมทั้งหมด
              </h2>
              <h2>
                {product.price * count} บาท
              </h2>
            </div>
            <div className='buyproduct-info-button'>
              <Link to="/product">ยกเลิก</Link>
              <Link to="#" onClick={clickconfirm}>ยืนยันการสั่งซื้อ</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Buyproduct