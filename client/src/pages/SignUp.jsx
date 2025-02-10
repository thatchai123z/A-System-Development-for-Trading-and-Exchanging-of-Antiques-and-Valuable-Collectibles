import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';

function SignUp() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const [employeeList, setEmployeeList] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/users').then((response) => {
            setEmployeeList(response.data.result);
            console.log(response.data);
        });
    }, [])

    const addEmployee = () => {
        if (password === confirmpassword && password !== "" && fname !== "" && lname !== "" && username !== "" && email !== "") {
            if (Array.isArray(employeeList)) {
                const check = employeeList.find((element) =>
                    element.username === username || element.email === email
                );
                // ทำสิ่งที่ต้องการกับ check ต่อไป
                if (check === undefined) {
                    Axios.post('http://localhost:3001/register', {
                        fname: fname,
                        lname: lname,
                        username: username,
                        email: email,
                        password: password
                    }).then((response) => {
                        alert('สมัครสมาชิกเรียบร้อยแล้ว');
                        window.location = '/sign_in'
                    });
                } else {
                    alert('ชื่อผู้ใช้งานหรืออีเมล ซ้ำกัน!!')
                }
            } else {
                console.error('employeeList is not an array');
            }
        } else {
            alert('การสมัครสมาชิกผิดพลาด โปรดตรวจสอบใหม่');
        }
    }

    return (
        <div className='signup'>
            <div className='con-signup'>
                <div className='signup-img'>
                    <img src="https://cdn.pixabay.com/photo/2018/01/18/20/56/auto-3091234_640.jpg" alt="" />
                </div>
                <div className='signup-form'>
                    <div className='title-signup'>
                        <h1>สมัครสมาชิก</h1>
                    </div>
                    <div className='signup-name'>
                        <input type="text" placeholder='ชื่อจริง' onChange={(event) => { setFname(event.target.value) }} />
                        <input type="text" placeholder='นามสกุล' onChange={(event) => { setLname(event.target.value) }} />
                    </div>
                    <div className="signup-info">
                        <input type="text" placeholder='ชื่อผู้ใช้' onChange={(event) => { setUsername(event.target.value) }} />
                        <br />
                        <input type="email" placeholder='อีเมล' onChange={(event) => { setEmail(event.target.value) }} />
                        <br />
                        <input type="password" placeholder='รหัสผ่าน' onChange={(event) => { setPassword(event.target.value) }} />
                        <br />
                        <input type="password" placeholder='ยืนยันรหัสผ่าน' onChange={(event) => { setConfirmpassword(event.target.value) }} />
                    </div>
                    <div className='signup-btn-summit'>
                        <button onClick={addEmployee}>สมัครสมาชิก</button>
                    </div>
                    <div className='signup-btn-ald'>
                        <Link to="/sign_in">เข้าสู่ระบบ</Link>
                        <Link to="/">กลับหน้าหลัก</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp