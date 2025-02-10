import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

//components
import Navbar from './navbar'

//icons
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'

function Exchangeproduct() {
    const [listFiles, setListFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [product, setProduct] = useState('');
    const [user, setUser] = useState('');
    const [count, setCount] = useState(1);
    const [check_express, setCheck_express] = useState("จัดส่งปกติ");
    const [insertPrice, setInsertPrice] = useState(null);
    const [message, setMessage] = useState('');
    const [thisorderimages, setThisorderimages] = useState([]);


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
        const token = localStorage.getItem('token');

        fetch('http://localhost:3001/authen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    setUser(data.user[0]);
                    console.log(data.user[0]);

                    fetch(`http://localhost:3001/product/${localStorage.getItem('product_id')}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Network response was not ok: ${response.statusText}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data.status === 'ok') {
                                setProduct(data.result[0]);
                                console.log(data.result[0]);
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
                        });
                } else {
                    window.location = '/sign_in';
                }
            })
            .catch((err) => {
                console.error('Error', err);
            });
    }, []);

    function clickcountminus() {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    function clickcountpush() {
        if (count < product.total_product) {
            setCount(count + 1)
        }
    }

    const onSelcetFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })
        setSelectedImages((previousImages) => previousImages.concat(imagesArray))

        const listimageArray = selectedFilesArray.map((file) => {
            console.log(file);
            return file
        })
        setListFiles((previousImages) => previousImages.concat(listimageArray))
    }

    const onclickDeleteImage = (image, index) => {
        setSelectedImages(selectedImages.filter((e) => e !== image))
        setListFiles(listFiles.filter((e) => e !== listFiles[index]))
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

    const clickconfirm = async () => {
        if (window.confirm("คุณแน่ใจที่จะซื้อสินค้านี้ใช่ไหม!") === true && listFiles.length > 0) {
            for (let index = 0; index < listFiles.length; index++) {
                handleUpload(listFiles[index])
            }
            if (check_express === "จัดส่งปกติ") {
                for (let index = 0; index < thisorderimages.length; index++) {
                    if (product.id === thisorderimages[index].product_id) {
                        const jsonData = {
                            buyer_id: user.id,
                            seller_id: product.users_id,
                            product_id: product.id,
                            name_product: product.name_product,
                            price_for_exchang: insertPrice,
                            total_countexchang: count,
                            image: thisorderimages[index].image,
                            check_express: 0,
                            contact: user.telephone,
                            status_express: "รอการยืนยันข้อเสนอ",
                            total_item: listFiles.length,
                            total_product: product.total_product - count
                        }
                        await fetch('http://localhost:3001/exchangproduct', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonData)
                        })
                            .then(response => response.json())
                            .then(async data => {
                                if (data.status === 'ok') {
                                    console.log(data.result.insertId);
                                    for (let index = 0; index < listFiles.length; index++) {
                                        const image = listFiles[index].name;
                                        const DataImage = {
                                            exchang_list_id: data.result.insertId,
                                            image: image
                                        }
                                        await fetch('http://localhost:3001/imageforexchang', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(DataImage)
                                        })
                                            .catch((err) => {
                                                console.error('Error', err);
                                            })
                                    }

                                    await fetch(`http://localhost:3001/user/${user.id}`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(async data => {
                                            if (data.status === 'ok') {
                                                const jsonDatamyoffer = {
                                                    id: data.result[0].id,
                                                    myexchang: data.result[0].myexchang + 1
                                                }
                                                await fetch(`http://localhost:3001/updatemyexchang`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(jsonDatamyoffer)
                                                })
                                                    .catch(err => {
                                                        console.error('Error', err);
                                                    })
                                            }
                                        })

                                    await fetch(`http://localhost:3001/user/${product.users_id}`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.status === 'ok') {
                                                const jsonDatamyoffer = {
                                                    id: data.result[0].id,
                                                    myoffer: data.result[0].myoffer + 1
                                                }
                                                fetch(`http://localhost:3001/updatemyoffer`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(jsonDatamyoffer)
                                                })
                                                    .catch(err => {
                                                        console.error('Error', err);
                                                    })
                                            }
                                        })
                                    alert('ยื่นข้อเสนอเรียบร้อย')
                                    window.location = "/myexchang"

                                    return
                                } else {
                                    alert('ยื่นข้อเสนอล้มเหลว')
                                }
                            })
                            .catch((err) => {
                                console.error('Error', err);
                            })

                        return
                    }
                }


            } else if (check_express === "นัดรับสินค้า") {
                for (let index = 0; index < thisorderimages.length; index++) {
                    if (product.id === thisorderimages[index].product_id) {
                        const jsonData = {
                            buyer_id: user.id,
                            seller_id: product.users_id,
                            product_id: product.id,
                            name_product: product.name_product,
                            price_for_exchang: insertPrice,
                            total_countexchang: count,
                            image: thisorderimages[index].image,
                            check_express: 1,
                            contact: user.telephone,
                            status_express: "รอการยืนยันข้อเสนอ",
                            total_item: listFiles.length,
                            total_product: product.total_product - count
                        }
                        await fetch('http://localhost:3001/exchangproduct', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(jsonData)
                        })
                            .then(response => response.json())
                            .then(async data => {
                                if (data.status === 'ok') {
                                    console.log(data.result.insertId);
                                    for (let index = 0; index < listFiles.length; index++) {
                                        const image = listFiles[index];
                                        const DataImage = {
                                            exchang_list_id: data.result.insertId,
                                            image: image
                                        }
                                        await fetch('http://localhost:3001/imageforexchang', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(DataImage)
                                        })
                                            .catch((err) => {
                                                console.error('Error', err);
                                            })
                                    }

                                    await fetch(`http://localhost:3001/user/${user.id}`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.status === 'ok') {
                                                const jsonDatamyoffer = {
                                                    id: data.result[0].id,
                                                    myexchang: data.result[0].myexchang + 1
                                                }
                                                fetch(`http://localhost:3001/updatemyexchang`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(jsonDatamyoffer)
                                                })
                                                    .catch(err => {
                                                        console.error('Error', err);
                                                    })
                                            }
                                        })

                                    await fetch(`http://localhost:3001/user/${product.users_id}`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.status === 'ok') {
                                                const jsonDatamyoffer = {
                                                    id: data.result[0].id,
                                                    myoffer: data.result[0].myoffer + 1
                                                }
                                                fetch(`http://localhost:3001/updatemyoffer`, {
                                                    method: 'PUT',
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(jsonDatamyoffer)
                                                })
                                                    .catch(err => {
                                                        console.error('Error', err);
                                                    })
                                            }
                                        })
                                    alert('ยื่นข้อเสนอเรียบร้อย')
                                    window.location = "/myexchang"

                                    return
                                } else {
                                    alert('ยื่นข้อเสนอล้มเหลว')
                                }
                            })
                            .catch((err) => {
                                console.error('Error', err);
                            })

                        return
                    }
                }
            }
        } else {
            alert("เกิดข้อผิดพลาด!!")
        }
    }

    return (
        <>
            <Navbar />
            <div className='box-buyproduct'>
                <div className="buyproduct-name">
                    <h1>
                        {product.name_product}
                    </h1>
                </div>
                <div className='exchangproduct-imgandinfo'>
                    <div className="buyproduct-img">
                        {/* <img src={`/images/${product.image}`} alt="" /> */}
                        {image_product(product)}
                    </div>
                    <div className="buyproduct-info">
                        <div className="buyproduct-info-count">
                            <h1><AiOutlineCaretLeft onClick={clickcountminus} /></h1>
                            <h2>{count}</h2>
                            <h1><AiOutlineCaretRight onClick={clickcountpush} /></h1>
                        </div>
                        <h1>ข้อเสนอ</h1>
                        <div className="exchang-product-images">
                            {selectedImages &&
                                selectedImages.map((image, index) => {
                                    return (
                                        <div key={index} className='exchang-product-image'>
                                            <img src={image} height="200" alt='upload' />
                                            <button onClick={() => onclickDeleteImage(image, index)}>ลบข้อเสนอ</button>
                                            <p>{index + 1}</p>
                                            {message && <p>{message}</p>}
                                        </div>
                                    )
                                })}
                        </div>
                        <div className='exchangproduct-imgandbutton'>
                            <input type="file" name="images" onChange={onSelcetFile} multiple accept='images/*' id='uploadBtn' />
                            <label htmlFor="uploadBtn">เลือกรูปภาพ</label>
                        </div>
                        <div className='exchangproduct-text'>
                            <input type="number" placeholder='จำนวนเงิน(ไม่จำเป็นต้องใส่ก็ได้)' onChange={(event) => { setInsertPrice(event.target.value) }} />
                        </div>
                        <div className='buyproduct-info-shippingmethod'>
                            <h2>วิธีการจัดส่ง</h2>
                            <select name="gender" id="gender" className='buyproduct-info-shippingmethod-select' onChange={(event) => { setCheck_express(event.target.value) }}>
                                <option>จัดส่งปกติ</option>
                                <option>นัดรับสินค้า</option>
                            </select>
                        </div>
                        <div className='buyproduct-info-button'>
                            <Link to="/shop">ยกเลิก</Link>
                            <Link to="#" onClick={clickconfirm}>ยืนยันการแลกเปลี่ยน</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exchangeproduct