import React from 'react'
import { useState, useEffect } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'
import { Link } from 'react-router-dom'

//icons
import StorefrontIcon from '@mui/icons-material/Storefront';

function Mysell() {
    const [mybuylist, setMybuylist] = useState('');
    const [buyer, setBuyer] = useState('');
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
                                const jsonData = {
                                    seller_id: data.result[0].id
                                }
                                fetch('http://localhost:3001/myselllist', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jsonData)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            console.log('this is mybuylist', data.result);
                                            setMybuylist(data.result)
                                        }
                                    })
                                    .catch((err) => {
                                        console.error('Error', err);
                                    })
                                fetch('http://localhost:3001/users', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            console.log(data.result);
                                            setBuyer(data.result)
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
                    window.location = "/mysell"
                } else {
                    alert('ล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function onClickCheckSlip(item) {
        localStorage.setItem('list_buy_ld', item.buy_list_id)
        window.location = '/checkslip'
    }

    function showconfirm(item) {
        if (item.check_express === 0) {
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <>
                        <button className='cancel-button' onClick={() => updateCancel(item, "รายการสั่งซื้อถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => updatestatus(item, "รอการชำระเงิน")}>ยืนยันการสั่งซื้อ</button>
                    </>
                )
            } else if (item.status_express === "รอตรวจสอบการชำระเงิน") {
                return (
                    <>
                        <button onClick={() => onClickCheckSlip(item)}>ดูสลิป</button>
                        <button onClick={() => updatestatus(item, "รอการยืนยันการจัดส่ง")}>ยืนยันการชำระเงิน</button>
                    </>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "กำลังดำเนินการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "การจัดส่งสำเร็จ")}>ยืนยันการจัดส่งสำเร็จ</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันการส่งสินค้า</button>
                )
            }
        } else {
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <>
                        <button className='cancel-button' onClick={() => updateCancel(item, "รายการสั่งซื้อถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => updatestatus(item, "นัดรับสินค้า(โปรดติดต่อผู้ขาย)")}>ยืนยันการสั่งซื้อ</button>
                    </>
                )
            }
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <button onClick={() => updatestatus(item, "นัดรับสินค้า(โปรดติดต่อผู้ขาย)")}>ยืนยันการสั่งซื้อ</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันการส่งสินค้า</button>
                )
            }
        }
    }

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
                        const jsonDataSeller = {
                            id: user.id,
                            mysell: user.mysell - 1
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

                        await fetch(`http://localhost:3001/user/${mybuylist[0].buyer_id}`, {
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
                                        mybuy: data.result[0].mybuy - 1
                                    }
                                    await fetch(`http://localhost:3001/updatemybuy`, {
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
                        window.location = "/mysell"
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
                                window.location = "/mysell"
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

    function buyer_username(item) {
        for (var index = 0; index < buyer.length; index++) {
            if (buyer[index].id === item.buyer_id) {
                return (
                    <h4>ผู้ซื้อ: {buyer[index].username}</h4>
                )
            }
        }
    }

    function buyer_tel(item) {
        for (var index = 0; index < buyer.length; index++) {
            if (buyer[index].id === item.buyer_id) {
                return (
                    <p>ติดต่อผู้ซื้อ: {buyer[index].telephone}</p>
                )
            }
        }
    }

    return (
        <div className='a-1321654'>
            <Navbar />
            <Navbaruser />
            <div className='con-profile'>
                <div className='profile'>
                    <div className='profile-account'>
                        <h3>
                            รายการขายของฉัน
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
                                                        {buyer_username(item)}
                                                    </div>
                                                    <div>
                                                        <Link onClick={() => localStorage.setItem('store_profile', item.buyer_id)} to={`/profileuser`}><StorefrontIcon sx={{ fontSize: 25 }} /></Link>
                                                    </div>
                                                </div>
                                                <div className='my-buy-seller-status'>
                                                    <p>สถานะ: {item?.status_express}</p>
                                                    <p>|</p>
                                                    {statushead(item)}
                                                </div>
                                            </div>
                                            <hr />
                                            <Link onClick={() => localStorage.setItem('order_id', item.buy_list_id)} to='/myordersell' className='link-my-buy-info' >
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
                                                        <div className='my-buy-button'>
                                                            <div className='my-buy-button-cancel'>
                                                                {showcancelbuy(item)}
                                                            </div>
                                                            {showconfirm(item)}
                                                        </div>
                                                    </div>
                                                    {/* <p>ติดต่อผู้ซื้อ: {seller[item?.buyer_id - 1]?.telephone}</p> */}
                                                    {buyer_tel(item)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='non-my-buy'>
                                        <h2>ไม่มีรายการขายของคุณ</h2>
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

export default Mysell