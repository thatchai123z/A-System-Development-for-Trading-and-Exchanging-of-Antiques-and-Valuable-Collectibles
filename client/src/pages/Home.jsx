import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//components
import Navbar from './navbar'

//icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

//css
import "../css/style.css"


function Home() {
  const [linkhidden, setLinkhinden] = useState("not-hidden");
  const [productList, setProductList] = useState([]);
  const [thisorderimages, setThisorderimages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
          setLinkhinden("hidden")
        } else {
          // alert('authe failed');
          // window.location = '/sign_in';
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
    console.log('this is id = ', id);
    for (let index = 0; index < thisorderimages.length; index++) {
      if (id === thisorderimages[index].product_id) {
        return (
          <img src={`/images/${thisorderimages[index].image}`} alt="" />
        )
      }
    }
  }

  function check_appprove (item) {
    if (item.approve === 1) {
      return (
        <div className='icon-box-new'><AssignmentTurnedInIcon sx={{ fontSize: 30 }} /></div>
      )
    }
  }

  return (
    <div>
      <div className="head-1">
        <Navbar />
        <header className="welcome">
          <div className="con-welcome-info">
            <div className="welcome-info">
              <h1>ยินดีต้อนรับสู่<br />AncientEraTrade<br />
                <p>เว็บไซต์ซื้อขายและแลกแลกเปลี่ยนที่สร้างขึ้นบนพื้นฐานของความเข้าใจและความเคารพต่อประวัติศาสตร์และวัฒนธรรมโบราณของมนุษยชาติ
                  โดยเฉพาะในยุคโบราณที่มีการค้าแลกเปลี่ยนที่เจริญรุ่งอย่างมากในตำนานของมนุษยชาติ
                  โดยมีจุดมุ่งหมายในการสร้างประสบการณ์การช้อปปิ้งที่น่าทึ่งและที่ไม่เหมือนใครให้กับคุณ</p>
              </h1>
              <Link className={linkhidden} to="/sign_in">เข้าสู่ระบบ</Link>
              <Link className={linkhidden} to="/sign_up">สมัครสมาชิก</Link>
            </div>
          </div>
          <div className="welcome-img">
            <img src="/images/pngegg (8).png" alt="" />
          </div>
        </header>
      </div>

      <div className="products">
        <div className="header-products">
          <h1>สินค้าใหม่</h1>
        </div>
        <div className="box">
          {
            productList.slice(0, 8).map(item => (
              <div className="box-item" key={item.id}>
                <Link onClick={() => localStorage.setItem('product_id', item.id)} to="/product">
                  <div className="box-new">
                    <p>New</p>
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
        <div className="btn-viewallproduct">
          <Link to="/shop">ดูสินค้าทั้งหมด</Link>
        </div>
      </div>
      <footer>
        <p>Copyright &copy;2023 MyWebsite. Designed By Home_cs</p>
      </footer>
    </div>
  )
}

export default Home