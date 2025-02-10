import React, { useEffect, useState } from 'react'
import axios from 'axios';

//components
import Navbar from './navbar'
import Navbaruser from './Navbaruser'

function Addproduct() {
    const [listFiles, setListFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [user, setUser] = useState('');
    const [name_product, setName_product] = useState('');
    const [price, setPrice] = useState('');
    const [total_product, setTotal_product] = useState('');
    const [des, setDes] = useState('');
    const [check, setCheck] = useState('แลกเปลี่ยนไม่ได้');
    const [category, setCategory] = useState(1);
    const [message, setMessage] = useState('');


    // const handleFileChange = (e) => {
    //     setFile(e.target.files[0]);
    //     setImage(e.target.value)
    // };

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

    const clickbuttonEdit = () => {
        if (window.confirm('คุณแน่ใจว่าจะเพิ่มสินค้านี้ใช่ไหม!') === true) {
            for (let index = 0; index < listFiles.length; index++) {
                handleUpload(listFiles[index])
            }
            if (check === "แลกเปลี่ยนไม่ได้") {
                // console.log(name_product, price, des, total_product, 0, image.substring(12), user.id);
                const jsonData = {
                    name_product: name_product,
                    price: price,
                    des: des,
                    total_product: total_product,
                    check_product: 0,
                    users_id: user.id,
                    category: category
                }
                fetch('http://localhost:3001/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            for (let index = 0; index < listFiles.length; index++) {
                                const image = listFiles[index].name;
                                const DataImage = {
                                    product_id: data.result.insertId,
                                    image: image
                                }
                                fetch('http://localhost:3001/product_images', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(DataImage)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {

                                        } else {
                                            alert('เพิ่มสินค้าล้มเหลว')
                                            return
                                        }
                                    })
                                    .catch((err) => {
                                        console.error('Error', err);
                                    })
                            }
                            window.location = '/myproducts'
                        } else {
                            alert('เพิ่มสินค้าล้มเหลว1')
                        }
                    })
                    .catch((err) => {
                        console.error('Error', err);
                    })
            } else if (price === '' && check === "แลกเปลี่ยนได้") {
                // console.log(name_product, null, des, total_product, 0, image.substring(12), user.id);
                const jsonData = {
                    name_product: name_product,
                    price: null,
                    des: des,
                    total_product: total_product,
                    check_product: 1,
                    users_id: user.id,
                    category: category
                }
                fetch('http://localhost:3001/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            for (let index = 0; index < listFiles.length; index++) {
                                const image = listFiles[index].name;
                                const DataImage = {
                                    product_id: data.result.insertId,
                                    image: image
                                }
                                fetch('http://localhost:3001/product_images', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(DataImage)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            alert('เพิ่มสินค้าของคุณเรียบร้อยแล้ว')
                                            window.location = '/myproducts'
                                        }
                                    })
                                    .catch((err) => {
                                        console.error('Error', err);
                                    })
                            }
                        } else {
                            alert('เพิ่มสินค้าล้มเหลว2')
                        }
                    })
                    .catch((err) => {
                        console.error('Error', err);
                    })
            } else {
                // console.log(name_product, price, des, total_product, 1, image.substring(12), user.id);
                const jsonData = {
                    name_product: name_product,
                    price: price,
                    des: des,
                    total_product: total_product,
                    check_product: 1,
                    users_id: user.id,
                    category: category
                }
                fetch('http://localhost:3001/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'ok') {
                            for (let index = 0; index < listFiles.length; index++) {
                                const image = listFiles[index].name;
                                const DataImage = {
                                    product_id: data.result.insertId,
                                    image: image
                                }
                                fetch('http://localhost:3001/product_images', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(DataImage)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'ok') {
                                            alert('เพิ่มสินค้าของคุณเรียบร้อยแล้ว')
                                            window.location = '/myproducts'
                                        }
                                    })
                                    .catch((err) => {
                                        console.error('Error', err);
                                    })
                            }
                        } else {
                            alert('เพิ่มสินค้าล้มเหลว3')
                        }
                    })
                    .catch((err) => {
                        console.error('Error', err);
                    })
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
                            เพิ่มสินค้าของตัวเอง
                        </h3>
                        <div className='profile-account-hr'>
                            <hr />
                        </div>
                        <div className='add-product'>
                            <div className='add-product-v1'>
                                <label htmlFor="">ชื่อสินค้า</label>
                                <input type="text" placeholder='กรอกชื่อสินค้า' name='name' onChange={(event) => { setName_product(event.target.value) }} />
                            </div>
                            <div className='add-product-v2'>
                                <label htmlFor="">ราคาสินค้า</label>
                                <input type="number" placeholder='กรอกราคาสินค้า (ไม่กรอกจะเป็นการแลกเปลี่ยน)' onChange={(event) => { setPrice(event.target.value) }} />
                            </div>
                            <div className='add-product-v3'>
                                <label htmlFor="">จำนวนสินค้า</label>
                                <input type="number" placeholder='กรอกจำนวนสินค้า' onChange={(event) => { setTotal_product(event.target.value) }} />
                            </div>
                            {/* <div className='add-product-v4'>
                                <input type="file" onChange={handleFileChange} />
                            </div> */}
                            <div className="exchang-product-images">
                                {selectedImages &&
                                    selectedImages.map((image, index) => {
                                        return (
                                            <div key={index} className='exchang-product-image'>
                                                <img src={image} height="200" alt='upload' />
                                                <button onClick={() => onclickDeleteImage(image, index)}>ลบ</button>
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
                            <div className='add-product-v5'>
                                <label htmlFor="">สินค้าของคุณสามารถแลกเปลี่ยนได้หรือไม่</label>
                                <div>
                                    <select id="" onChange={(event) => { setCheck(event.target.value) }}>
                                        <option value="แลกเปลี่ยนไม่ได้">แลกเปลี่ยนไม่ได้</option>
                                        <option value="แลกเปลี่ยนได้">แลกเปลี่ยนได้</option>
                                    </select>
                                </div>
                            </div>
                            <div className='add-product-v5'>
                                <label htmlFor="">หมวดหมู่สินค้าของคุณ</label>
                                <div>
                                    <select id="" onChange={(event) => { setCategory(event.target.value) }}>
                                        <option value={1}>ของสะสมทั่วไป</option>
                                        <option value={2}>วินเทจ</option>
                                        <option value={3}>ของโบราณ</option>
                                    </select>
                                </div>
                            </div>
                            <div className='add-product-v6'>
                                <label htmlFor="">รายละเอียด</label>
                                <div>
                                    <textarea name="des" id="" cols="80" rows="10" onChange={(event) => { setDes(event.target.value) }}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='edit-fname-button'>
                            <button onClick={clickbuttonEdit}>บันทึก</button>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addproduct