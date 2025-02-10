import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

//components
import Navbar from './navbar'



function Payment() {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const [message, setMessage] = useState('');
    const [list, setList] = useState('');
    const [seller, setSeller] = useState('');

    const handleUpload = async (file) => {
        if (!file) {
            setMessage('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            if (error.response) {
                // The server responded with a status code other than 2xx
                setMessage(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage('Error: No response received from server.');
            } else {
                // Something happened in setting up the request
                setMessage(`Error: ${error.message}`);
            }
        }


    };

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
            .then(async data => {
                if (data.status === 'ok') {
                    // alert('authen sucess');
                    // setUser(data.user[0]);
                    // console.log(data.user[0]);
                    await fetch(`http://localhost:3001/order/${localStorage.getItem('list_buy_ld')}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => response.json())
                        .then(async data => {
                            if (data.status === 'ok') {
                                console.log(`List : `, data.result[0].buy_list_id);
                                setList(data.result[0])
                                await fetch(`http://localhost:3001/user/${data.result[0].seller_id}`, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            console.log(`seller :`, data.result[0]);
                                            setSeller(data.result[0])
                                        }
                                    })
                                    .catch((err) => {
                                        console.error('Error', err);
                                    })
                            }
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

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images])


    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function checkimage() {
        if (imageURLs.length > 0) {
            return (
                <div className='btn-payment-2'>
                    <div className='exchangproduct-imgandbutton'>
                        <input type="file" name="images" onChange={onImageChange} multiple accept='images/*' id='uploadBtn' />
                        <label htmlFor="uploadBtn">แก้ไขรูปภาพ</label>
                    </div>
                    <button className='payment-btn-summit' onClick={() => onClickpayment(list, "รอตรวจสอบการชำระเงิน")}>แจ้งชำระเงิน</button>
                </div>
            )
        } else {
            return (
                <div className='exchangproduct-imgandbutton'>
                    <input type="file" name="images" onChange={onImageChange} multiple accept='images/*' id='uploadBtn' />
                    <label htmlFor="uploadBtn">เลือกรูปภาพ</label>
                </div>
            )
        }
    }

    const onClickpayment = async (item, status_express) => {
        await handleUpload(images[0])
        const jsonDataUpdateSlip = {
            buy_list_id: list.buy_list_id,
            image_slip: images[0].name
        }
        await fetch(`http://localhost:3001/updatepayment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonDataUpdateSlip)
        })

        const jsonDataSold = {
            id: item.seller_id,
            sold: seller.sold + item.total_countbuy
        }
        await fetch('http://localhost:3001/updatesold', {
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
                    alert('แจ้งชำระเงินเรียบร้อย')
                    window.location = "/mybuy"
                } else {
                    alert('แจ้งชำระเงินล้มเหลว')
                }
            })
            .catch((err) => {
                console.error('Error', err);
            })
    }

    // console.log("Images : ", images);
    // console.log("ImageURLs : ", imageURLs);
    // console.log("name image : ", images[0].name);

    return (
        <>
            <Navbar />
            <div className='con-payment'>
                <h1>แจ้งชำระเงิน</h1>
                {imageURLs && imageURLs.map((imageSrc, idx) => {
                    return (
                        <div>
                            <img key={idx} width="640" height="max-content" src={imageSrc} alt='' />
                            {message && <p>{message}</p>}
                        </div>
                    )
                })}
                {checkimage()}
            </div>
        </>
    )
}

export default Payment