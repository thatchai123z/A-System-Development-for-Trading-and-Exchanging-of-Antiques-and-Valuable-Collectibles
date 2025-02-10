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

function MyorderofferReceived() {
    const [thisorder, setThisorder] = useState('');
    const [thisorderimages, setThisorderimages] = useState([]);
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
                                fetch(`http://localhost:3001/orderexchang/${localStorage.getItem('order_id')}`, {
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
                                fetch(`http://localhost:3001/orderexhangimages/${localStorage.getItem('order_id')}`, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            setThisorderimages(data.result);
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
            id: item.id
        }
        fetch('http://localhost:3001/updatestatus_express_exchang', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('สำเร็จ')
                    window.location = "/myorderofferReceived"
                } else {
                    alert('ล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function showconfirm(item) {
        if (item.check_express === 0 && item.price_for_exchang > 0) {
            if (item.status_express === "รอการยืนยันข้อเสนอ") {
                return (
                    <>
                        <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => updatestatus(item, "ต้องการข้อเสนอใหม่")}>ต้องการข้อเสนอใหม่</button>
                        <button onClick={() => updatestatus(item, "รอการชำระเงินเพิ่มเติม")}>ยันยันข้อเสนอ</button>
                    </>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "รอผู้ยื่นข้อเสนอยืนยันการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "รอผู้แลกเปลี่ยนยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "กำลังดำเนินการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "การจัดส่งสำเร็จ")}>ยืนยันการจัดส่งสำเร็จ</button>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ") {
                return (
                    <button onClick={() => updateExchanged(item, "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอผู้แลกเปลี่ยนยืนยันรับสินค้า") {
                return (
                    <button onClick={() => updateExchanged(item, "จัดส่งสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันการส่งสินค้า</button>
                )
            }
        } else if (item.check_express === 0) {
            if (item.status_express === "รอการยืนยันข้อเสนอ") {
                return (
                    <>
                        <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => updatestatus(item, "ต้องการข้อเสนอใหม่")}>ต้องการข้อเสนอใหม่</button>
                        <button onClick={() => updatestatus(item, "รอการยืนยันการจัดส่ง")}>ยันยันข้อเสนอ</button>
                    </>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "รอผู้ยื่นข้อเสนอยืนยันการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "รอผู้แลกเปลี่ยนยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "กำลังดำเนินการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "การจัดส่งสำเร็จ")}>ยืนยันการจัดส่งสำเร็จ</button>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ") {
                return (
                    <button onClick={() => updateExchanged(item, "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอผู้แลกเปลี่ยนยืนยันรับสินค้า") {
                return (
                    <button onClick={() => updateExchanged(item, "จัดส่งสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันการส่งสินค้า</button>
                )
            }
        } else {
            if (item.status_express === "รอการยืนยันข้อเสนอ") {
                return (
                    <>
                        <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => updatestatus(item, "ต้องการข้อเสนอใหม่")}>ต้องการข้อเสนอใหม่</button>
                        <button onClick={() => updatestatus(item, "นัดรับสินค้า(โปรดติดต่อผู้แลกเปลี่ยน)")}>ยันยันข้อเสนอ</button>
                    </>
                )
            } else if (item.status_express === "นัดรับสินค้าแล้ว") {
                return (
                    // <button onClick={() => updatestatus(item, "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                    <button onClick={() => updateExchanged(item, "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอผู้แลกเปลี่ยนยืนยันรับสินค้า") {
                return (
                    // <button onClick={() => updatestatus(item, "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                    <button onClick={() => updateExchanged(item, "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
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
                id: item.id
            }
            fetch('http://localhost:3001/cancelexchang', {
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
                            myoffer: user.myoffer - 1
                        }
                        await fetch(`http://localhost:3001/updatemyoffer`, {
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
                                    const jsonDataMyexchang = {
                                        id: data.result[0].id,
                                        myexchang: data.result[0].myexchang - 1
                                    }
                                    await fetch(`http://localhost:3001/updatemyexchang`, {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(jsonDataMyexchang)
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
                        window.location = "/myofferreceived"
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
        if (item.status_express === "รายการแลกเปลี่ยนถูกยกเลิก") {
            return (
                <button onClick={() => cancelbuy(item)}>ลบรายการ</button>
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
        if (item.status_express === "รายการแลกเปลี่ยนถูกยกเลิก") {
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

    function check_addmoney(item) {
        if (1 * item.price_for_exchang > 0) {
            return (
                <div className='my-buy-totalprice'>
                    <div>
                        <p>จำนวนเงินเพิ่มเติม:</p>
                    </div>
                    <div className='my-buy-totalprice-p'>
                        <p>฿{1 * item?.price_for_exchang}</p>
                    </div>
                </div>
            )
        }
    }

    function updateExchanged(item, status_express) {
        for (var index = 0; index < buyer.length; index++) {
            if (buyer[index].id === item.buyer_id) {
                const jsonDataExchanged = {
                    id: item.buyer_id,
                    exchanged: buyer[index].exchanged + 1
                }
                fetch('http://localhost:3001/updateexchanged', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonDataExchanged)
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
            id: item.id
        }
        fetch('http://localhost:3001/updatestatus_express_exchang', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('สำเร็จ')
                    window.location = "/myorderofferReceived"
                } else {
                    alert('ล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function showstatus(item) {
        if (item.check_express === 0 && item.price_for_exchang > 0) {
            if (item.status_express === "รายการแลกเปลี่ยนถูกยกเลิก") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-cancel'>
                                <CancelIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>รายการแลกเปลี่ยนถูกยกเลิก</p>
                            </div>
                        </div>
                    </div>
                )
            }
            if (item.status_express === "รอการยืนยันข้อเสนอ" || item.status_express === "ต้องการข้อเสนอใหม่") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "รอการชำระเงินเพิ่มเติม") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง" || item.status_express === "กำลังดำเนินการจัดส่ง" || item.status_express === "รอผู้แลกเปลี่ยนยืนยันการจัดส่ง" || item.status_express === "รอผู้ยื่นข้อเสนอยืนยันการจัดส่ง") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ" || item.status_express === "รอผู้แลกเปลี่ยนยืนยันรับสินค้า" || item.status_express === "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
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
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            }
        } else if (item.check_express === 0) {
            if (item.status_express === "รายการแลกเปลี่ยนถูกยกเลิก") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-cancel'>
                                <CancelIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>รายการแลกเปลี่ยนถูกยกเลิก</p>
                            </div>
                        </div>
                    </div>
                )
            }
            if (item.status_express === "รอการยืนยันข้อเสนอ" || item.status_express === "ต้องการข้อเสนอใหม่") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง" || item.status_express === "กำลังดำเนินการจัดส่ง" || item.status_express === "รอผู้แลกเปลี่ยนเสนอยืนยันการจัดส่ง" || item.status_express === "รอผู้ยื่นข้อเสนอยืนยันการจัดส่ง") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ" || item.status_express === "รอผู้แลกเปลี่ยนยืนยันรับสินค้า" || item.status_express === "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
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
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            }
        } else {
            if (item.status_express === "รายการแลกเปลี่ยนถูกยกเลิก") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-cancel'>
                                <CancelIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>รายการแลกเปลี่ยนถูกยกเลิก</p>
                            </div>
                        </div>
                    </div>
                )
            }
            if (item.status_express === "รอการยืนยันข้อเสนอ" || item.status_express === "ต้องการข้อเสนอใหม่") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon-off'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "นัดรับสินค้า(โปรดติดต่อผู้แลกเปลี่ยน)" || item.status_express === "กำลังดำเนินการนัดรับสินค้า") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            } else if (item.status_express === "นัดรับสินค้าแล้ว" || item.status_express === "รอผู้แลกเปลี่ยนยืนยันรับสินค้า" || item.status_express === "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า") {
                return (
                    <div className='status-myorder'>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <DescriptionIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
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
                                <p>มีคำสั่งแลกเปลี่ยนใหม่</p>
                            </div>
                        </div>
                        <div className='status-myorder-item'>
                            <div className='status-myorder-item-icon'>
                                <AssignmentTurnedInIcon sx={{ fontSize: 70 }} />
                            </div>
                            <div>
                                <p>ยืนยันการแลกเปลี่ยนแล้ว</p>
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
                                <p>คำสั่งแลกเปลี่ยนสำเร็จแล้ว</p>
                            </div>
                        </div> */}
                    </div>
                )
            }
        }
    }

    function updateCancelExchang(item, status_express) {
        fetch(`http://localhost:3001/product/${item.product_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    const jsonDataCancle = {
                        id: data.result[0].id,
                        total_product: data.result[0].total_product + item.total_countexchang
                    }
                    fetch('http://localhost:3001/updatecancel_listbuy', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonDataCancle)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {

                            }
                        })
                        .catch((err) => {
                            console.error('Error', err);
                        })

                    const jsonData = {
                        status_express: status_express,
                        id: item.id
                    }
                    fetch('http://localhost:3001/updatestatus_express_exchang', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsonData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'ok') {
                                alert('สำเร็จ')
                                window.location = "/myorderofferReceived"
                            } else {
                                alert('ล้มเหลว')
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
                    <h4>ผู้ยื่นข้อเสนอ: {buyer[index].username}</h4>
                )
            }
        }
    }

    function buyer_tel(item) {
        for (var index = 0; index < buyer.length; index++) {
            if (buyer[index].id === item.buyer_id) {
                return (
                    <p>ติดต่อผู้ยื่นข้อเสนอ: {buyer[index].telephone}</p>
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
                                <p>หมายเลขคำสั่งแลกเปลี่ยน {thisorder.id}</p>
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
                            <Link onClick={() => localStorage.setItem('order_id', thisorder.id)} to='/product' className='link-my-buy-info' >
                                <div className='my-buy-info'>
                                    <div className='my-buy-info-img'>
                                        <img src={`/images/${thisorder.image}`} alt="" />
                                    </div>
                                    <div className='my-buy-info-info'>
                                        <p>{thisorder.name_product}</p>
                                        <p>จำนวน {thisorder.total_countexchang} ชิ้น</p>
                                    </div>
                                    <div>
                                        <p>จำนวนของที่แลก {thisorder.total_item} ชิ้น</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="myorder-exchang-product-images">
                                {thisorderimages &&
                                    thisorderimages.map((image, index) => {
                                        return (
                                            <div key={index} className='exchang-product-image'>
                                                <img src={`/images/${image.image}`} height="200" alt='' />
                                                <p>{index + 1}</p>
                                            </div>
                                        )
                                    })}
                            </div>
                            <hr />
                            <div className='my-buy-foot'>
                                <div className='my-buy-totalprice'>
                                    <div className='my-buy-totalprice-p'>
                                        <p>{check_addmoney(thisorder)}</p>
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

export default MyorderofferReceived