import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//components
import Navbar from './navbar'

//icons
import { AiOutlineHeart, AiOutlineCaretLeft } from 'react-icons/ai'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function Myproductinfo() {
    const [product, setProduct] = useState('');
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

    function clickdelete() {
        if (window.confirm("คุณยืนยันที่จะลบสินค้าใช่ไหม!") === true) {
            const jsonData = {
                id: product.id
            }
            fetch('http://localhost:3001/deleteproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        alert('ลบสินค้าเรียบร้อยแล้ว')
                        window.location = '/myproducts'
                    } else {
                        alert('ลบสินค้าล้มเหลว')
                    }
                })
                .catch((err) => {
                    console.error('Error', err);
                })
        }
    }

    function check_product(product) {
        if (product.price === null) {
            return (
                <div className='slproduct-btn'>
                    <div className='slproduct-btn-price'>
                        <div className='slproduct-btn-price-v2'>
                            <h2>แลกเปลี่ยนอย่างเดียว</h2>
                        </div>
                    </div>
                    <div className='slproduct-btn-button'>
                        <h3>เหลืออยู่ {product.total_product} ชิ้น</h3>
                    </div>
                    <div className='slproduct-btn-button'>
                        <Link to="/editproduct" className='slproduct-btn-button-1'>แก้ไขสินค้า</Link>
                        <Link onClick={clickdelete}>ลบสินค้า</Link>
                    </div>

                </div>
            )
        } else if (product.check_product === 1) {
            return (
                <div className='slproduct-btn'>
                    <div className='slproduct-btn-price'>
                        <h2>ราคา {product.price} บาท</h2>
                    </div>
                    <div className='slproduct-btn-button'>
                        <h3>เหลืออยู่ {product.total_product} ชิ้น</h3>
                    </div>
                    <div className='slproduct-btn-button'>
                        <Link to="/editproduct" className='slproduct-btn-button-1'>แก้ไขสินค้า</Link>
                        <Link onClick={clickdelete}>ลบสินค้า</Link>
                    </div>

                </div>
            )
        } else {
            return (
                <div className='slproduct-btn'>
                    <div className='slproduct-btn-price'>
                        <h2>ราคา {product.price} บาท</h2>
                    </div>
                    <div className='slproduct-btn-button'>
                        <h3>เหลืออยู่ {product.total_product} ชิ้น</h3>
                    </div>
                    <div className='slproduct-btn-button-v2'>
                        <Link to="/editproduct" className='slproduct-btn-button-1'>แก้ไขสินค้า</Link>
                        <Link className='slproduct-btn-button-1' onClick={clickdelete}>ลบสินค้า</Link>
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

    return (
        <>
            <Navbar />
            <div className='slproduct'>
                <div className='con-slproduct'>
                    <h1 className='h1-icon'>
                        <div className='h1-icon-goback'>
                            <Link to="/myproducts"><AiOutlineCaretLeft /></Link>
                        </div>
                        <AiOutlineHeart />
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
            </div>
        </>

    )
}

export default Myproductinfo