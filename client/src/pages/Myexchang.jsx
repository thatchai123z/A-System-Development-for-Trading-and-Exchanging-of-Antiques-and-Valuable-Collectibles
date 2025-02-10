import React from 'react'
import { useState, useEffect } from 'react'

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'
import { Link } from 'react-router-dom'

//icons
import StorefrontIcon from '@mui/icons-material/Storefront';

function Myexchang() {
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
                                console.log(data.result[0]);
                                const jsonData = {
                                    buyer_id: data.result[0].id
                                }
                                fetch('http://localhost:3001/myExchanglist', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(jsonData)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            console.log(data.result);
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
                                            console.log(data.result);
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
                        const jsonDataMybuy = {
                            id: user.id,
                            myexchang: user.myexchang - 1
                        }
                        fetch(`http://localhost:3001/updatemyexchang`, {
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
                                        myoffer: data.result[0].myoffer - 1
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
                                }
                            })
                            .catch(err => {
                                console.error('Error', err);
                            })
                        alert('ยกเลิกรายการเรียบร้อย')
                        window.location = "/myexchang"
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

    function showconfirm(item) {
        if (item.check_express === 0 && item.price_for_exchang > 0) {
            if (item.status_express === "รอการยืนยันข้อเสนอ") {
                return (
                    <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                )
            } else if (item.status_express === "ต้องการข้อเสนอใหม่") {
                return (
                    <>
                        <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => onClickupdateExchang(item)}>เปลี่ยนข้อเสนอใหม่</button>
                    </>
                )
            } else if (item.status_express === "รอการชำระเงินเพิ่มเติม") {
                return (
                    <button onClick={() => updatestatus(item, "รอการยืนยันการจัดส่ง")}>ยื่นยันการชำระเงิน</button>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "รอผู้แลกเปลี่ยนยืนยันการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "รอผู้ยื่นข้อเสนอยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ") {
                return (
                    <button onClick={() => updateExchanged(item, "รอผู้แลกเปลี่ยนยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า") {
                return (
                    <button onClick={() => updateExchanged(item, "จัดส่งสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันรับสินค้า</button>
                )
            }
        } else if (item.check_express === 0) {
            if (item.status_express === "รอการยืนยันข้อเสนอ") {
                return (
                    <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                )
            } else if (item.status_express === "ต้องการข้อเสนอใหม่") {
                return (
                    <>
                        <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => onClickupdateExchang(item)}>เปลี่ยนข้อเสนอใหม่</button>
                    </>
                )
            } else if (item.status_express === "รอการยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "รอผู้แลกเปลี่ยนยืนยันการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "รอผู้ยื่นข้อเสนอยืนยันการจัดส่ง") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการจัดส่ง")}>ยืนยันการส่งสินค้า</button>
                )
            } else if (item.status_express === "การจัดส่งสำเร็จ") {
                return (
                    <button onClick={() => updateExchanged(item, "รอผู้แลกเปลี่ยนยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า") {
                return (
                    <button onClick={() => updateExchanged(item, "จัดส่งสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
                )
            } else {
                return (
                    <button hidden>ยืนยันรับสินค้า</button>
                )
            }
        } else {
            if (item.status_express === "รอการยืนยันข้อเสนอ") {
                return (
                    <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                )
            } else if (item.status_express === "ต้องการข้อเสนอใหม่") {
                return (
                    <>
                        <button onClick={() => updateCancelExchang(item, "รายการแลกเปลี่ยนถูกยกเลิก")}>ยกเลิกรายการ</button>
                        <button onClick={() => onClickupdateExchang(item)}>เปลี่ยนข้อเสนอใหม่</button>
                    </>
                )
            } else if (item.status_express === "นัดรับสินค้า(โปรดติดต่อผู้แลกเปลี่ยน)") {
                return (
                    <button onClick={() => updatestatus(item, "กำลังดำเนินการนัดรับสินค้า")}>ยืนยันนัดรับสินค้า</button>
                )
            } else if (item.status_express === "กำลังดำเนินการนัดรับสินค้า") {
                return (
                    <button onClick={() => updatestatus(item, "นัดรับสินค้าแล้ว")}>ยืนยันการนัดรับสินค้าสำเร็จ</button>
                )
            } else if (item.status_express === "นัดรับสินค้าแล้ว") {
                return (
                    <button onClick={() => updateExchanged(item, "รอผู้แลกเปลี่ยนยืนยันรับสินค้า")}>ยืนยันรับสินค้า</button>
                )
            } else if (item.status_express === "รอผู้ยื่นข้อเสนอยืนยันรับสินค้า") {
                return (
                    <button onClick={() => updateExchanged(item, "นัดรับสินค้าสำเร็จเรียบร้อยแล้ว")}>ยืนยันรับสินค้า</button>
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
                    window.location = "/myexchang"
                } else {
                    alert('ล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
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

    function onClickupdateExchang(item) {
        localStorage.setItem('list_exchang_id', item.id)
        window.location = "/updateExchang"
    }

    function updateExchanged(item, status_express) {
        for (var index = 0; index < seller.length; index++) {
            if (seller[index].id === item.seller_id) {
                const jsonDataExchanged = {
                    id: item.seller_id,
                    exchanged: seller[index].exchanged + 1
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
                    window.location = "/myexchang"
                } else {
                    alert('ล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    function updateCancelExchang(item, status_express) {
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
                        total_product: data.result[0].total_product + item.total_countexchang
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
                        id: item.id
                    }
                    await fetch('http://localhost:3001/updatestatus_express_exchang', {
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
                                window.location = "/myexchang"
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

    function seller_username(item) {
        for (var index = 0; index < seller.length; index++) {
            if (seller[index].id === item.seller_id) {
                return (
                    <h4>ผู้แลกเปลี่ยน: {seller[index].username}</h4>
                )
            }
        }
    }

    function seller_tel(item) {
        for (var index = 0; index < seller.length; index++) {
            if (seller[index].id === item.seller_id) {
                return (
                    <p>ติดต่อผู้แลกเปลี่ยน: {seller[index].telephone}</p>
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
                            รายการแลกเปลี่ยนของฉัน
                        </h3>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='con-my-buy'>
                            {
                                Array.isArray(mybuylist) && mybuylist.length > 0 ? (
                                    mybuylist.map(item => (

                                        <div className='my-buy' key={item.id}>
                                            <div className='my-buy-seller'>
                                                <div className='my-buy-seller-acc'>
                                                    <div>
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
                                            <Link onClick={() => localStorage.setItem('order_id', item.id)} to='/myorderexchang' className='link-my-buy-info' >
                                                <div className='my-buy-info'>
                                                    <div className='my-buy-info-img'>
                                                        <img src={`/images/${item?.image}`} alt="" />
                                                    </div>
                                                    <div className='my-buy-info-info'>
                                                        <p>{item?.name_product}</p>
                                                        <p>จำนวน {item?.total_countexchang} ชิ้น</p>
                                                    </div>
                                                    <div>
                                                        <p>จำนวนของที่แลก {item?.total_item} ชิ้น</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <hr />
                                            <div className='my-buy-foot'>
                                                {check_addmoney(item)}
                                                <div className='my-buy-contact'>
                                                    <div className='my-buy-button'>
                                                        <div className='my-buy-button-cancel'>
                                                            {showcancelbuy(item)}
                                                        </div>
                                                        {showconfirm(item)}
                                                    </div>
                                                    {seller_tel(item)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='non-my-buy'>
                                        <h2>ไม่มีรายการแลกเปลี่ยนของคุณ</h2>
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

export default Myexchang