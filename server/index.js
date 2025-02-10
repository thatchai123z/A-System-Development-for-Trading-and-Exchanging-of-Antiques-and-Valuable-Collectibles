const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'Fullstack-Login-2023'
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

app.use(cors());
app.use(express.json());

const jsonParser = bodyParser.json()

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "project_db"
})

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file);
})

app.get('/users', jsonParser, (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    });
});

app.get('/user/:id', jsonParser, (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.post('/selleruser', jsonParser, (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [req.body.seller_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

// app.post('/myseller', jsonParser, (req, res) => {
//     db.query("SELECT * FROM users WHERE id = ?", [req.body.seller_id], (err, result) => {
//         if (err) {
//             res.json({ status: 'error', message: err })
//             return
//         } else {
//             res.json({ status: 'ok', result })
//         }
//     })
// })

app.post('/register', jsonParser, (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     db.query("INSERT INTO employees (fname, lname, username, email, password) VALUES(?,?,?,?,?)",
    //         [fname, lname, username, email, hash],
    //         (err, result) => {
    //             if (err) {
    //                 res.json({ status: 'error', message: err })
    //                 return
    //             } else {
    //                 res.json({ status: 'ok' })
    //             }
    //         }
    //     )
    // })

    db.query("INSERT INTO users (fname, lname, username, email, password) VALUES(?,?,?,?,?)",
        [fname, lname, username, email, password],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok' })
            }
        }
    )
});

app.post('/login', jsonParser, (req, res) => {
    db.query("SELECT * FROM users WHERE email = ?",
        [req.body.email],
        (err, users) => {
            if (err) { res.json({ status: 'error', message: err }); return }
            if (users.length == 0) { res.json({ status: 'error', message: 'no user found' }); return }
            // bcrypt.compare(req.body.password, users[0].password, (err, isLogin) => {
            //     if (isLogin) {
            //         var token = jwt.sign({ email: users[0].email, user: users }, secret, { expiresIn: '1h' });
            //         res.json({ status: 'ok', message: 'login success', token })
            //     } else {
            //         res.json({ status: 'error', message: 'login failed' })
            //         return
            //     }
            // })


            if (req.body.password === users[0].password) {
                var token = jwt.sign({ email: users[0].email, user: users }, secret, { expiresIn: '1h' });
                res.json({ status: 'ok', message: 'login success', token })
            } else {
                res.json({ status: 'error', message: 'login failed' })
                return
            }

        }
    )
});

app.post('/authen', jsonParser, (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, secret);
        var user = decoded.user;
        res.json({ status: 'ok', decoded, user })
    } catch (err) {
        res.json({ status: 'error', message: err.message })
        return
    }
})

app.put('/updatefname', jsonParser, (req, res) => {
    db.query("UPDATE users SET fname = ? WHERE id = ?", [req.body.fname, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update fname failed' })
        } else {
            res.json({ status: 'ok', message: 'update fname success' })
            return
        }
    })
})

app.put('/updatelname', jsonParser, (req, res) => {
    db.query("UPDATE users SET lname = ? WHERE id = ?", [req.body.lname, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update lname failed' })
        } else {
            res.json({ status: 'ok', message: 'update lname success' })
            return
        }
    })
})

app.put('/updatetel', jsonParser, (req, res) => {
    db.query("UPDATE users SET telephone = ? WHERE id = ?", [req.body.telephone, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update telephone failed' })
        } else {
            res.json({ status: 'ok', message: 'update telephone success' })
            return
        }
    })
})

app.put('/updatesold', jsonParser, (req, res) => {
    db.query("UPDATE users SET sold = ? WHERE id = ?", [req.body.sold, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update sold failed' })
        } else {
            res.json({ status: 'ok', message: 'update sold success' })
            return
        }
    })
})

app.put('/updateexchanged', jsonParser, (req, res) => {
    db.query("UPDATE users SET exchanged = ? WHERE id = ?", [req.body.exchanged, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update exchanged failed' })
        } else {
            res.json({ status: 'ok', message: 'update exchanged success' })
            return
        }
    })
})

app.put('/updatemybuy', jsonParser, (req, res) => {
    db.query("UPDATE users SET mybuy = ? WHERE id = ?", [req.body.mybuy, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.put('/updatemysell', jsonParser, (req, res) => {
    db.query("UPDATE users SET mysell = ? WHERE id = ?", [req.body.mysell, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.put('/updatemyexchang', jsonParser, (req, res) => {
    db.query("UPDATE users SET myexchang = ? WHERE id = ?", [req.body.myexchang, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.put('/updatemyoffer', jsonParser, (req, res) => {
    db.query("UPDATE users SET myoffer = ? WHERE id = ?", [req.body.myoffer, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.put('/updatereportcount', jsonParser, (req, res) => {
    db.query("UPDATE users SET report_count = ? WHERE id = ?", [req.body.report_count, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.put('/updateaddress', jsonParser, (req, res) => {
    db.query("UPDATE users SET address = ? WHERE id = ?", [req.body.address, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update address failed' })
        } else {
            res.json({ status: 'ok', message: 'update address success' })
            return
        }
    })
})

app.put('/updatepassword', jsonParser, (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?",
        [req.body.id],
        (err, result) => {
            if (err) { res.json({ status: 'error', message: err }); return }
            if (req.body.password === result[0].password) {
                db.query("UPDATE users SET password = ? WHERE id = ?", [req.body.newpassword, req.body.id], (err, result) => {
                    if (err) {
                        res.json({ status: 'error', message: 'update password failed' })
                    } else {
                        res.json({ status: 'ok', message: 'update password success' })
                        return
                    }
                })
            } else {
                res.json({ status: 'error', message: 'check password failed' })
                return
            }
        })
})

app.post('/checkemailforgetpassword', jsonParser, (req, res) => {
    db.query("SELECT email FROM users WHERE email = ?", [req.body.email], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.put('/forgetpassword', jsonParser, (req, res) => {
    db.query("UPDATE users SET password = ? WHERE email = ?", [req.body.newpassword, req.body.email], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update password failed' })
        } else {
            res.json({ status: 'ok', message: 'update password success' })
            return
        }
    })

})

////////////////////////////////////////////////PRODUCT///////////////////////////////////////////////////////////////////////////////////////////

app.get('/products_canbuy', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE price > 0 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_canexchang', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE check_product = 1 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_canbuy_only', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE price > 0 AND check_product = 0 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_canexchang_only', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE price IS NULL AND check_product = 1 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_canbuy_and_canexchang', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE price > 0 AND check_product = 1 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_category_1', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE category = 1 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_category_2', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE category = 2 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/products_category_3', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE category = 3 ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.post('/products_minmaxmoney', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE price BETWEEN ? AND ? ORDER BY products.id DESC", [req.body.minmoney, req.body.maxmoney], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.post('/products_search', jsonParser, (req, res) => {
    const searchTerm = `%${req.body.search}%`
    db.query(`SELECT * FROM products WHERE name_product LIKE ? ORDER BY products.id DESC`, [searchTerm], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});



app.post('/product_images', jsonParser, (req, res) => {
    db.query("INSERT INTO product_images (product_id, image) VALUES(?,?)", [req.body.product_id, req.body.image],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})

app.get('/product_images/:id', jsonParser, (req, res) => {
    db.query("SELECT * FROM product_images WHERE product_id = ?", [req.params.id],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})

app.get('/all_product_images/', jsonParser, (req, res) => {
    db.query("SELECT * FROM product_images ",
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})








app.get('/products', jsonParser, (req, res) => {
    db.query("SELECT * FROM products ORDER BY products.id DESC", (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.get('/product/:id', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.post('/addproduct', jsonParser, (req, res) => {
    db.query("INSERT INTO products (name_product, price, des, total_product, check_product, users_id, category) VALUES(?,?,?,?,?,?,?)",
        [req.body.name_product, req.body.price, req.body.des, req.body.total_product, req.body.check_product, req.body.users_id, req.body.category],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})

app.post('/myproducts', jsonParser, (req, res) => {
    db.query("SELECT * FROM products WHERE users_id = ? ORDER BY products.id DESC", [req.body.users_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.put('/updateproduct', jsonParser, (req, res) => {
    db.query('UPDATE products SET name_product = ?, price = ?, des = ?, total_product = ?, check_product = ? WHERE id = ?',
        [req.body.name_product, req.body.price, req.body.des, req.body.total_product, req.body.check_product, req.body.id],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})

app.put('/updateproduct_on_images', jsonParser, (req, res) => {
    db.query('DELETE FROM product_images WHERE product_id = ?', [req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            db.query('UPDATE products SET name_product = ?, price = ?, des = ?, total_product = ?, check_product = ? WHERE id = ?',
                [req.body.name_product, req.body.price, req.body.des, req.body.total_product, req.body.check_product, req.body.id],
                (err, result) => {
                    if (err) {
                        res.json({ status: 'error', message: err })
                        return
                    } else {
                        res.json({ status: 'ok', result })
                    }
                }
            )
        }
    })
})

app.put('/updatecancel_listbuy', jsonParser, (req, res) => {
    db.query("UPDATE products SET total_product = ? WHERE id = ?", [req.body.total_product, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.post('/deleteproduct', jsonParser, (req, res) => {
    db.query('DELETE FROM product_images WHERE product_id = ?', [req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            db.query('DELETE FROM products WHERE id = ?', [req.body.id], (err, result) => {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                } else {
                    res.json({ status: 'ok', result })
                }
            })
        }
    })
})

////////////////////////////////////////////////Buy_List///////////////////////////////////////////////////////////////////////////////////////////

app.get('/order/:id', jsonParser, (req, res) => {
    db.query("SELECT * FROM buy_list WHERE buy_list_id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.post('/buyproduct', jsonParser, (req, res) => {
    db.query('UPDATE products SET total_product = ? WHERE id = ?',
        [req.body.total_product, req.body.product_id],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                db.query("INSERT INTO buy_list (buyer_id, seller_id, product_id, name_product, price, total_countbuy, image, check_express, contact, status_express) VALUES(?,?,?,?,?,?,?,?,?,?)",
                    [req.body.buyer_id, req.body.seller_id, req.body.product_id, req.body.name_product, req.body.price, req.body.total_countbuy, req.body.image, req.body.check_express, req.body.contact, req.body.status_express],
                    (err, result) => {
                        if (err) {
                            res.json({ status: 'error', message: err })
                            return
                        } else {
                            res.json({ status: 'ok', result })
                        }
                    }
                )
            }
        }
    )
})

app.post('/mybuylist', jsonParser, (req, res) => {
    db.query("SELECT * FROM buy_list WHERE buyer_id = ? ORDER BY buy_list.buy_list_id DESC", [req.body.buyer_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.post('/myselllist', jsonParser, (req, res) => {
    db.query("SELECT * FROM buy_list WHERE seller_id = ? ORDER BY buy_list.buy_list_id DESC", [req.body.seller_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.post('/cancelbuy', jsonParser, (req, res) => {
    db.query('DELETE FROM buy_list WHERE buy_list_id = ?', [req.body.buy_list_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.put('/updatestatus_express', jsonParser, (req, res) => {
    db.query("UPDATE buy_list SET status_express = ? WHERE buy_list_id = ?", [req.body.status_express, req.body.buy_list_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.put(`/updatepayment`, jsonParser, (req, res) => {
    db.query('UPDATE buy_list SET image_slip = ? WHERE buy_list_id = ?', [req.body.image_slip, req.body.buy_list_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

////////////////////////////////////////////////Exchang_List && images_exchang///////////////////////////////////////////////////////////////////////////////////////////

app.post('/exchangproduct', jsonParser, (req, res) => {
    db.query('UPDATE products SET total_product = ? WHERE id = ?',
        [req.body.total_product, req.body.product_id],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                db.query("INSERT INTO exchang_list (buyer_id, seller_id, product_id, name_product, price_for_exchang, total_countexchang, image, check_express, contact, status_express, total_item) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                    [req.body.buyer_id, req.body.seller_id, req.body.product_id, req.body.name_product, req.body.price_for_exchang, req.body.total_countexchang, req.body.image, req.body.check_express, req.body.contact, req.body.status_express, req.body.total_item],
                    (err, result) => {
                        if (err) {
                            res.json({ status: 'error', message: err })
                            return
                        } else {
                            res.json({ status: 'ok', result })
                        }
                    }
                )
            }
        }
    )
})

app.post('/imageforexchang', jsonParser, (req, res) => {
    db.query("INSERT INTO images_for_exchang (exchang_list_id, image) VALUES(?,?)", [req.body.exchang_list_id, req.body.image],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})

app.get('/exchangListId/:id', jsonParser, (req, res) => {
    db.query("SELECT id FROM exchang_list WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.post('/myExchanglist', jsonParser, (req, res) => {
    db.query("SELECT * FROM exchang_list WHERE buyer_id = ? ORDER BY exchang_list.id DESC", [req.body.buyer_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.post('/myOfferReceivedlist', jsonParser, (req, res) => {
    db.query("SELECT * FROM exchang_list WHERE seller_id = ? ORDER BY exchang_list.id DESC", [req.body.seller_id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.send({ status: 'ok', result });
        }
    });
});

app.put('/updatestatus_express_exchang', jsonParser, (req, res) => {
    db.query("UPDATE exchang_list SET status_express = ? WHERE id = ?", [req.body.status_express, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            res.json({ status: 'ok', message: 'update success' })
            return
        }
    })
})

app.post('/cancelexchang', jsonParser, (req, res) => {
    db.query('DELETE FROM images_for_exchang WHERE exchang_list_id = ?', [req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            db.query('DELETE FROM exchang_list WHERE id = ?', [req.body.id], (err, result) => {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                } else {
                    res.json({ status: 'ok', result })
                }
            })
        }
    })
})

app.get('/orderexchang/:id', jsonParser, (req, res) => {
    db.query("SELECT * FROM exchang_list WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.get('/orderexhangimages/:id', jsonParser, (req, res) => {
    db.query("SELECT * FROM images_for_exchang WHERE exchang_list_id = ?", [req.params.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: err })
            return
        } else {
            res.json({ status: 'ok', result })
        }
    })
})

app.put('/update_exchang', jsonParser, (req, res) => {
    db.query("UPDATE exchang_list SET price_for_exchang = ?, total_item = ?, status_express = ? WHERE id = ?", [req.body.price_for_exchang, req.body.total_item, req.body.status_express, req.body.id], (err, result) => {
        if (err) {
            res.json({ status: 'error', message: 'update failed' })
        } else {
            db.query('DELETE FROM images_for_exchang WHERE exchang_list_id = ?', [req.body.id], (err, result) => {
                if (err) {
                    res.json({ status: 'error', message: err })
                    return
                } else {
                    res.json({ status: 'ok', result })
                }
            })
        }
    })
})

////////////////////////////////////////////////USERS_HAS_PRODUCTS///////////////////////////////////////////////////////////////////////////////////////////

app.post('/owner_product', jsonParser, (req, res) => {
    db.query("INSERT INTO users_has_products (users_id, products_id) VALUES(?,?)",
        [req.body.users_id, req.body.products_id],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', result })
            }
        }
    )
})

////////////////////////////////////////////////report///////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/report', jsonParser, (req, res) => {
    db.query("INSERT INTO report (report, user_id) VALUE(?,?)",
        [req.body.report, req.body.user_id],
        (err, result) => {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            } else {
                res.json({ status: 'ok', message: "Insert success" })
            }
        }
    )
})


app.listen('3001', jsonParser, () => {
    console.log('Server is running on port 3001');
});