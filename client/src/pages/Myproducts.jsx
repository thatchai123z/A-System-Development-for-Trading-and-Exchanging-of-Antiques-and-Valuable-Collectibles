import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'

function Myproducts() {
    // const [user, setUser] = useState('');
    // const [name_product, setName_product] = useState('');
    // const [price, setPrice] = useState('');
    // const [total_product, setTotal_product] = useState('');
    // const [image, setImage] = useState('');
    const [myproductList, setMyproductList] = useState([]);
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
                                // setUser(data.result[0]);
                                console.log(data.result[0]);
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
                                            setMyproductList(data.result);
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
                    <h3>{item?.price} บาท</h3>
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

    return (
        <>
            <Navbar />
            <Navbaruser />
            <div className='con-profile'>

                <div className='profile'>

                    <div className='profile-account'>
                        <h3>
                            สินค้าของฉัน
                        </h3>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='edit-fname-button'>
                            <button onClick={() => window.location = '/addproduct'}>เพิ่มสินค้าของตัวเอง</button>
                        </div>
                        <div className='box-my'>
                            {
                                myproductList.map(item => (
                                    <div className="box-item-my" key={item.id}>
                                        <Link onClick={() => localStorage.setItem('product_id', item.id)} to="/myproductinfo">
                                            {/* <div className="box-new">
                                                <p>New</p>
                                            </div> */}
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

        </>
    )
}

export default Myproducts