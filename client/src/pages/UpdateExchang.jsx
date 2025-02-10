import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

//components
import Navbar from './navbar'

//icons
// import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'

function UpdateExchang() {
  const [listFiles, setListFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [product, setProduct] = useState('');
  // const [user, setUser] = useState('');
  // const [count, setCount] = useState(1);
  // const [check_express, setCheck_express] = useState("จัดส่งปกติ");
  const [insertPrice, setInsertPrice] = useState(null);
  const [thisorderimages, setThisorderimages] = useState([]);
  const [message, setMessage] = useState('');


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
          // setUser(data.user[0]);
          console.log(data.user[0]);

          fetch(`http://localhost:3001/orderexchang/${localStorage.getItem('list_exchang_id')}`, {
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
                fetch(`http://localhost:3001/orderexhangimages/${localStorage.getItem('list_exchang_id')}`, {
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
            });
        } else {
          window.location = '/sign_in';
        }
      })
      .catch((err) => {
        console.error('Error', err);
      });
  }, []);


  const onSelcetFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

    const listimageArray = selectedFilesArray.map((file) => {
      return file
    })
    setListFiles((previousImages) => previousImages.concat(listimageArray))
  }

  const onclickDeleteImage = (image, index) => {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    setListFiles(listFiles.filter((e) => e !== listFiles[index]))
  }

  const clickconfirm = async () => {
    if (window.confirm("คุณแน่ใจที่จะแลกเปลี่ยนข้อเสนอนี้ใช่ไหม!") === true && listFiles.length > 0) {
      for (let index = 0; index < listFiles.length; index++) {
        handleUpload(listFiles[index])
      }
      const jsonData = {
        id: product.id,
        price_for_exchang: insertPrice,
        status_express: "รอการยืนยันข้อเสนอ",
        total_item: listFiles.length
      }
      await fetch('http://localhost:3001/update_exchang', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => response.json())
        .then(async data => {
          if (data.status === 'ok') {
            for (let index = 0; index < listFiles.length; index++) {
              const image = listFiles[index].name;
              const DataImage = {
                exchang_list_id: product.id,
                image: image
              }
              await fetch('http://localhost:3001/imageforexchang', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(DataImage)
              })
                .then(response => response.json())
                .then(data => {
                  if (data.status === 'ok') {
                    console.log(data.result);
                  }
                })
                .catch((err) => {
                  console.error('Error', err);
                })
            }
            alert('ยื่นข้อเสนอเรียบร้อย')
            window.location = "/myexchang"
          } else {
            alert('ยื่นข้อเสนอล้มเหลว')
          }
        })
        .catch((err) => {
          console.error('Error', err);
        })
    } else {
      alert("เกิดข้อผิดพลาด!!")
    }
  }

  function check_addmoney(item) {
    if (item.price_for_exchang !== null) {
      return (
        <h3>จำนวนเงินเพิ่มเติม {product.price_for_exchang} บาท</h3>
      )
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
            <img src={`/images/${product.image}`} alt="" />
          </div>
          <div className="buyproduct-info">
            <div className="buyproduct-info-count">
              <h2>จำนวน {product.total_countexchang} ชิ้น</h2>
            </div>
            <h1>ข้อเสนอเดิม</h1>
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
            <div className='money_addsss'>
              {check_addmoney(product)}
            </div>
            <h1>ข้อเสนอใหม่</h1>
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
            <div className='buyproduct-info-button'>
              <Link to="/myexchang">ยกเลิก</Link>
              <Link to="#" onClick={clickconfirm}>ยืนยันการเปลี่ยนข้อเสนอ</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateExchang