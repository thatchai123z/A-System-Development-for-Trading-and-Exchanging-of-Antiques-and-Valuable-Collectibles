import React, { useEffect } from 'react'
import { useState } from 'react';

//components
import Navbar from './navbar'

function Checkslip() {
    const [list, setList] = useState('');
    const [seller, setSeller] = useState('');

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
                                console.log(`List : `, data.result[0]);
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
    },[])

    return (
        <>
            <Navbar />
            <div className='image-slip'>
                <img width="640" height="max-content" src={`/images/${list.image_slip}`} alt="" />
            </div>
        </>
    )
}

export default Checkslip