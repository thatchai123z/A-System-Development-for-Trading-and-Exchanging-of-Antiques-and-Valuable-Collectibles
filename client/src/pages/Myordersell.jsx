import React from 'react'
import { useState, useEffect } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'
import { Link } from 'react-router-dom'

//icons
import StorefrontIcon from '@mui/icons-material/Storefront';
import DescriptionIcon from '@mui/icons-material/Description';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import StarIcon from '@mui/icons-material/Star';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import CancelIcon from '@mui/icons-material/Cancel';
import PaidIcon from '@mui/icons-material/Paid';

function Myordersell() {
    const [thisorder, setThisorder] = useState('');
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
                                fetch(`http://localhost:3001/order/${localStorage.getItem('order_id')}`, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            console.log(data.result[0]);
                                            setThisorder(data.result[0])
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

                        await fetch(`http://localhost:3001/user/${thisorder.buyer_id}`, {
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
            } else {
                return (
                    <button hidden>ยืนยันการส่งสินค้า</button>
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
                    alert('ยืนยันการรับสินค้าเรียบร้อย')
                    window.location = "/myordersell"
                } else {
                    alert('ยืนยันการรับสินค้าล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function showstatus(item) {
        if (item.check_express === 0) {
            if (item.status_express === "รายการสั่งซื้อถูกยกเลิก") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-cancel'>
                                <CancelIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>รายการสั่งซื้อถูกยกเลิก</p>
                            </div>
                        </div>
                    </div>
                )
            }
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>

                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <PaidIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ชำระเงินเรียบร้อยแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AirportShuttleIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการจัดส่งแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "รอการชำระเงิน" || item.status_express === "รอตรวจสอบการชำระเงิน") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>

                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <PaidIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ชำระเงินเรียบร้อยแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AirportShuttleIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการจัดส่งแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง" || item.status_express === "กำลังดำเนินการจัดส่ง") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <PaidIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ชำระเงินเรียบร้อยแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AirportShuttleIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการจัดส่งแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>

                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <PaidIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ชำระเงินเรียบร้อยแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AirportShuttleIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการจัดส่งแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>

                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <PaidIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ชำระเงินเรียบร้อยแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AirportShuttleIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการจัดส่งแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            }
        } else {
            if (item.status_express === "รายการสั่งซื้อถูกยกเลิก") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-cancel'>
                                <CancelIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>รายการสั่งซื้อถูกยกเลิก</p>
                            </div>
                        </div>
                    </div>
                )
            }
            if (item.status_express === "รอการยืนยันการสั่งซื้อ") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AirportShuttleIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการนัดรับแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "นัดรับสินค้า(โปรดติดต่อผู้ขาย)" || item.status_express === "กำลังดำเนินการนัดรับสินค้า") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <GroupIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการนัดรับแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "นัดรับสินค้าแล้ว") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <GroupIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการนัดรับแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งซื้อใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการสั่งซื้อแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <GroupIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ทำการนัดรับแล้ว</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <InventoryIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ได้รับสินค้าแล้ว</p>
                            </div>
                        </div>
                        {/* <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <StarIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>คำสั่งซื้อสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            }
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
                <h4 className='head-myorder-2-p-1'>คำสั่งซื้อสำเร็จแล้ว</h4>
            )
        } else {
            return (
                <h4 className='head-myorder-2-p'>คำสั่งซื้อยังไม่สำเร็จ</h4>
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
                                window.location = "/myordersell"
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
                        <div className='head-myorder'>
                            <p className='head-myorder-p' onClick={() => window.location = '/mybuy'}>ย้อนกลับ</p>
                            <div className='head-myorder-2'>
                                <p>หมายเลขคำสั่งซื้อ {thisorder.buy_list_id}</p>
                                <p>|</p>
                                {statushead(thisorder)}
                            </div>
                        </div>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        {showstatus(thisorder)}
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='my-buy-2'>
                            <div className='my-buy-seller'>
                                <div className='my-buy-seller-acc'>
                                    <div>
                                        {buyer_username(thisorder)}
                                    </div>
                                    <div>
                                        <Link onClick={() => localStorage.setItem('store_profile', thisorder.buyer_id)} to={`/profileuser`}><StorefrontIcon sx={{ fontSize: 25 }} /></Link>
                                    </div>
                                </div>
                                <div>
                                    <p>สถานะ: {thisorder.status_express}</p>
                                </div>
                            </div>
                            <div className='profile-account-hr'>
                                <hr />
                            </div>
                            <Link onClick={() => localStorage.setItem('product_id', thisorder.product_id)} to="/product" className='link-my-buy-info'>
                                <div className='my-buy-info'>
                                    <div className='my-buy-info-img'>
                                        <img src={`/images/${thisorder.image}`} alt="" />
                                    </div>
                                    <div className='my-buy-info-info'>
                                        <p>{thisorder.name_product}</p>
                                        <p>จำนวน {thisorder.total_countbuy} ชิ้น</p>
                                    </div>
                                    <div>
                                        <p>฿{thisorder.price}</p>
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
                                        <p>฿{thisorder.total_countbuy * thisorder.price}</p>
                                    </div>
                                </div>
                                <div className='my-buy-contact'>
                                    <div className='my-buy-button'>
                                        <div className='my-buy-button'>
                                            <div className='my-buy-button-cancel'>
                                                {showcancelbuy(thisorder)}
                                            </div>
                                            {showconfirm(thisorder)}
                                        </div>
                                    </div>
                                    {buyer_tel(thisorder)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myordersell