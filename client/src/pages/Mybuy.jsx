import React from 'react'
import { useState, useEffect } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'
import { Link } from 'react-router-dom'

//icons
import StorefrontIcon from '@mui/icons-material/Storefront';

function Mybuy() {
    const [mybuylist, setMybuylist] = useState('');
    const [seller, setSeller] = useState('');
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
                                console.log('this is user', data.result[0]);
                                const jsonData = {
                                    buyer_id: data.result[0].id
                                }
                                fetch('http://localhost:3001/mybuylist', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jsonData)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            // console.log('this mybuylist', data.result[0].seller_id);
                                            setMybuylist(data.result)
                                        }
                                    })
                                    .catch((err) => {
                                        console.error('Error', err);
                                    })
                                console.log(1);
                                fetch('http://localhost:3001/users', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            setSeller(data.result)
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

    function cancelbuy(item) {
        if (window.confirm('คุณแน่ใจที่จะยกเลิกรายการนี้ใช่ไหม!' === true)) {
            const jsonData = {
                buy_list_id: item.buy_list_id
            }
            fetch('http://localhost:3001/cancelbuy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
                .then(response => response.json())
                .then(async data => {
                    if (data.status === 'ok') {
                        const jsonDataMybuy = {
                            id: user.id,
                            mybuy: user.mybuy - 1
                        }
                        await fetch(`http://localhost:3001/updatemybuy`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonDataMybuy)
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.status === 'ok') {

                                }
                            })
                            .catch((err) => {
                                console.error('Error', err);
                            })

                        await fetch(`http://localhost:3001/user/${mybuylist[0].seller_id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => response.json())
                            .then(async data => {
                                if (data.status === 'ok') {
                                    console.log(data.result[0]);
                                    const jsonDataSeller = {
                                        id: data.result[0].id,
                                        mysell: data.result[0].mysell - 1
                                    }
                                    await fetch(`http://localhost:3001/updatemysell`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(jsonDataSeller)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.status === 'ok') {
                                            }
                                        })
                                        .catch((err) => {
                                            console.error('Error', err);
                                        })
                                }
                            })
                            .catch(err => {
                                console.error('Error', err);
                            })
                        alert('ยกเลิกรายการเรียบร้อย')
                        window.location = "/mybuy"
                    } else {
                        alert('ยกเลิกรายการล้มเหลว')
                    }
                })
                .catch((err) => {
                    console.error('Error', err);
                })
        } else {
            console.log(3168);
        }
    }

    function showcancelbuy(item) {
        if (item.status_express === "รายการสั่งซื้อถูกยกเลิก") {
            return (
                <button className='cancel-button' onClick={() => cancelbuy(item)}>ลบรายการ</button>
            )
        } else if (item.status_express === "จัดส่งสำเร็จเรียบร้อยแล้ว" || item.status_express === "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว") {
            return (
                <button onClick={() => cancelbuy(item)}>ลบรายการ</button>
            )
        } else {
            return (
                <button hidden>ยกเลิกรายการ</button>
            )
        }
    }

    function onClickpayment(item) {
        localStorage.setItem('list_buy_ld', item.buy_list_id)
        window.location = '/payment'
    }

    function onClickCheckSlip(item) {
        localStorage.setItem('list_buy_ld', item.buy_list_id)
        window.location = '/checkslip'
    }

    function showconfirm(item) {
        if (item.check_express === 0) {
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <button className='cancel-button' onClick={() => updateCancel(item, 'รายการสั่งซื้อถูกยกเลิก')}>ยกเลิกรายการ</button>
                )
            } else if (item.status_express === "รอการชำระเงิน") {
                return (
                    <>
                        <button className='cancel-button' onClick={() => updateCancel(item, 'รายการสั่งซื้อถูกยกเลิก')}>ยกเลิกรายการ</button>
                        {/* <button onClick={() => updateSold(item, "รอการยืนยันการจัดส่ง")}>ยืนยันชำระเงิน</button> */}
                        <button onClick={() => onClickpayment(item)}>แจ้งชำระเงิน</button>
                    </>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ") {
                return (
                    <button onClick={() => updateSold(item, "จัดส่งสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอตรวจสอบการชำระเงิน") {
                return (
                    <button onClick={() => onClickCheckSlip(item)}>ดูสลิป</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันรับสินค้า</button>
                )
            }
        } else {
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <button className='cancel-button' onClick={() => updateCancel(item, "รายการสั่งซื้อถูกยกเลิก")}>ยกเลิกรายการ</button>
                )
            } else if (item.status_express === "นัดรับสินค้า(โปรดติดต่อผู้ขาย)") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการนัดรับสินค้า")}>ยืนยันนัดรับสินค้า</button>
                )
            } else if (item.status_express === "กำลังดำเนินการนัดรับสินค้า") {
                return (
                    <button onClick={() => updatestatus(item, "นัดรับสินค้าแล้ว")}>ยืนยันการนัดรับสินค้าสำเร็จ</button>
                )
            } else if (item.status_express === "นัดรับสินค้าแล้ว") {
                return (
                    // <button onClick={() => updatestatus(item, "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                    <button onClick={() => updateSold(item, "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันรับสินค้า</button>
                )
            }
        }
    }

    function updatestatus(item, status_express) {
        const jsonData = {
            status_express: status_express,
            buy_list_id: item.buy_list_id
        }
        fetch('http://localhost:3001/updatestatus_express', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('เรียบร้อย')
                    window.location = "/mybuy"
                } else {
                    alert('ล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function statushead(item) {
        if (item.status_express === "รายการสั่งซื้อถูกยกเลิก") {
            return (
                <h4 className='head-myorder-2-p'>ยกเลิกรายการ</h4>
            )
        }
        if (item.status_express === "จัดส่งสำเร็จเรียบร้อยแล้ว" || item.status_express === "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว") {
            return (
                <h4 className='head-myorder-2-p-1'>สำเร็จแล้ว</h4>
            )
        } else {
            return (
                <h4 className='head-myorder-2-p'>ยังไม่สำเร็จ</h4>
            )
        }
    }

    function updateSold(item, status_express) {
        for (var index = 0; index < seller.length; index++) {
            if (seller[index].id === item.seller_id) {
                const jsonDataSold = {
                    id: item.seller_id,
                    sold: seller[index].sold + item.total_countbuy
                }
                fetch('http://localhost:3001/updatesold', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonDataSold)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            // ไม่มีไร
                        } else {
                            //ไม่มีไร
                        }
                    })
                    .catch((err) => {
                        console.error('Error', err);
                    })
            }
        }

        const jsonData = {
            status_express: status_express,
            buy_list_id: item.buy_list_id
        }
        fetch('http://localhost:3001/updatestatus_express', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('ยืนยันการรับสินค้าเรียบร้อย')
                    window.location = "/mybuy"
                } else {
                    alert('ยืนยันการรับสินค้าล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function updateCancel(item, status_express) {
        fetch(`http://localhost:3001/product/${item.product_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(async data => {
                if (data.status === 'ok') {
                    const jsonDataCancle = {
                        id: data.result[0].id,
                        total_product: data.result[0].total_product + item.total_countbuy
                    }
                    await fetch('http://localhost:3001/updatecancel_listbuy', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonDataCancle)
                    })
                        .then(response => response.json())
                        .then(async data => {
                            if (data.status === 'ok') {
                            }
                        })
                        .catch((err) => {
                            console.error('Error', err);
                        })

                    const jsonData = {
                        status_express: status_express,
                        buy_list_id: item.buy_list_id
                    }
                    await fetch('http://localhost:3001/updatestatus_express', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {
                                alert('ยกเลิกรายการเรียบร้อย')
                                window.location = "/mybuy"
                            } else {
                                alert('ยกเลิกรายการล้มเหลว')
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

    function seller_username(item) {
        for (var index = 0; index < seller.length; index++) {
            if (seller[index].id === item.seller_id) {
                return (
                    <h4>ผู้ขาย: {seller[index].username}</h4>
                )
            }
        }
    }

    function seller_tel(item) {
        for (var index = 0; index < seller.length; index++) {
            if (seller[index].id === item.seller_id) {
                return (
                    <p>ติดต่อผู้ขาย: {seller[index].telephone}</p>
                )
            }
        }
    }

    return (
        <div className='a-1321654'>
            {/* <div className='test-buy'>
                <div className='test-buy-box'>
                    <div className="products">
                        <div className="header-products">
                            <h1>สินค้าใหม่</h1>
                        </div>
                        <div className="box">
                            <div className="box-item">
                                <Link to="/product">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Ring</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>300 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p2.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Watch</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>300 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p7.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Watch</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>400 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p3.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Teddy Bear</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>110 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p6.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Flower Bouquet</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>45 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p5.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Teddy Bear</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>95 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p8.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Ring</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>450 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="box-item">
                                <Link to="#">
                                    <div className="box-new">
                                        <p>New</p>
                                    </div>
                                    <div className="con-box-image">
                                        <div className="box-image">
                                            <img src="/images/p4.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="box-info">
                                        <h3>Flower Bouquet</h3>
                                        <div className="box-price">
                                            <h3>Price</h3>
                                            <h4>70 Bath</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="btn-viewallproduct">
                            <Link to="/shop">ดูสินค้าทั้งหมด</Link>
                        </div>
                    </div>
                </div>
            </div> */}
            <Navbar />
            <Navbaruser />
            <div className='con-profile'>
                <div className='profile'>
                    <div className='profile-account'>
                        <h3>
                            รายการซื้อของฉัน
                        </h3>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='con-my-buy'>
                            {
                                Array.isArray(mybuylist) && mybuylist.length > 0 ? (
                                    mybuylist.map(item => (

                                        <div className='my-buy' key={item.buy_list_id}>
                                            <div className='my-buy-seller'>
                                                <div className='my-buy-seller-acc'>
                                                    <div>
                                                        {/* <h4>ผู้ขาย: {seller[item?.seller_id - 1]?.username}</h4> */}
                                                        {seller_username(item)}
                                                    </div>
                                                    <div>
                                                        <Link onClick={() => localStorage.setItem('store_profile', item.seller_id)} to={`/profileuser`}><StorefrontIcon sx={{ fontSize: 25 }} /></Link>
                                                    </div>
                                                </div>
                                                <div className='my-buy-seller-status'>
                                                    <p>สถานะ: {item?.status_express}</p>
                                                    <p>|</p>
                                                    {statushead(item)}
                                                </div>
                                            </div>
                                            <hr />
                                            <Link onClick={() => localStorage.setItem('order_id', item.buy_list_id)} to='/myorder' className='link-my-buy-info' >
                                                <div className='my-buy-info'>
                                                    <div className='my-buy-info-img'>
                                                        <img src={`/images/${item?.image}`} alt="" />
                                                    </div>
                                                    <div className='my-buy-info-info'>
                                                        <p>{item?.name_product}</p>
                                                        <p>จำนวน {item?.total_countbuy} ชิ้น</p>
                                                    </div>
                                                    <div>
                                                        <p>฿{item?.price}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <hr />
                                            <div className='my-buy-foot'>
                                                <div className='my-buy-totalprice'>
                                                    <div>
                                                        <p>รวมการสั่งซื้อ:</p>
                                                    </div>
                                                    <div className='my-buy-totalprice-p'>
                                                        <p>฿{item?.total_countbuy * item?.price}</p>
                                                    </div>
                                                </div>
                                                <div className='my-buy-contact'>
                                                    <div className='my-buy-button'>
                                                        <div className='my-buy-button-cancel'>
                                                            {showcancelbuy(item)}
                                                        </div>
                                                        {showconfirm(item)}
                                                    </div>
                                                    {/* <p>ติดต่อผู้ขาย: {seller[item?.seller_id - 1]?.telephone}</p> */}
                                                    {seller_tel(item)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='non-my-buy'>
                                        <h2>ไม่มีรายการซื้อของคุณ</h2>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mybuy