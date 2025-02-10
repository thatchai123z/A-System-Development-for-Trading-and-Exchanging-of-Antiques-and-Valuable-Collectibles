import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

//components
import Navbar from './navbar'

//icons
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { FaSearch } from 'react-icons/fa'
// import { AiFillCaretDown } from "react-icons/ai";

//css
import "../css/style.css"

function Shop() {
    const [productList, setProductList] = useState([]);
    const [minmoney, setMinmoney] = useState(0);
    const [maxmoney, setMaxmoney] = useState(999999);
    const [search, setSearch] = useState('');
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

    function onClickAllproducts() {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickproductsCanbuy() {
        fetch('http://localhost:3001/products_canbuy', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickproductsCanexchang() {
        fetch('http://localhost:3001/products_canexchang', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickproductsCanbuyOnly() {
        fetch('http://localhost:3001/products_canbuy_only', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickproductsCanexchangOnly() {
        fetch('http://localhost:3001/products_canexchang_only', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickproductsCanbuyAndCanexchang() {
        fetch('http://localhost:3001/products_canbuy_and_canexchang', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickCategory_1() {
        fetch('http://localhost:3001/products_category_1', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickCategory_2() {
        fetch('http://localhost:3001/products_category_2', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickCategory_3() {
        fetch('http://localhost:3001/products_category_3', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickButtonMinMaxMoney() {
        const jsonData = {
            minmoney: minmoney,
            maxmoney: maxmoney
        }
        fetch('http://localhost:3001/products_minmaxmoney', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickSearch() {
        const jsonData = {
            search: search
        }
        fetch('http://localhost:3001/products_search', {
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
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function image_product(item) {
        const id = item.id
        console.log('this is id = ', id);
        for (let index = 0; index < thisorderimages.length; index++) {
            if (id === thisorderimages[index].product_id){
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
            <Navbar />
            <div className='category-shop'>
                <div className='con-category-shop'>
                    <div className='category-shop-srearch'>
                        <input type="search" placeholder='ค้นหา' onChange={(event) => { setSearch(event.target.value) }} />
                        <div className='category-shop-srearch-icon'>
                            <FaSearch onClick={onClickSearch} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='user-info '>
                <ul>
                    <li className='user-info-li' onClick={onClickAllproducts}>สินค้าทั้งหมด</li>
                    <li>หมวดหมู่สินค้า
                        <ul>
                            <li onClick={onClickCategory_1}>ของสะสมทั่วไป</li>
                            <li onClick={onClickCategory_2}>วินเทจ</li>
                            <li onClick={onClickCategory_3}>ของโบราณ</li>
                        </ul>
                    </li>
                    <hr />
                    <div>
                        <li>
                            ช่วงราคา
                        </li>
                        <div className='shop-money-input'>
                            <input type="number" placeholder='ราคาต่ำสุด' onChange={(event) => { setMinmoney(event.target.value) }} />
                            <br />
                            <input type="number" placeholder='ราคาสูงสุด' onChange={(event) => { setMaxmoney(event.target.value) }} />
                            <br />
                            <button onClick={onClickButtonMinMaxMoney}>ตกลง</button>
                        </div>
                    </div>
                    <hr />
                    <li>ประเภทสินค้า
                        <ul>
                            <li onClick={onClickproductsCanbuy}>สามารถซื้อ</li>
                            <li onClick={onClickproductsCanexchang}>สามารถแลกเปลี่ยน</li>
                            <li onClick={onClickproductsCanbuyOnly}>ซื้อเท่านั้น</li>
                            <li onClick={onClickproductsCanexchangOnly}>แลกเปลี่ยนเท่านั้น</li>
                            <li onClick={onClickproductsCanbuyAndCanexchang}>ซื้อหรือแลกเปลี่ยนเท่านั้น</li>
                        </ul>
                    </li>
                    <hr />
                </ul>
            </div>

            <div className='shop-cate'>
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
            </div>

        </div>
    )
}

export default Shop