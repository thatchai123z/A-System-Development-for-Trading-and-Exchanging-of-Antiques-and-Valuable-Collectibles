import React from 'react'
import { Link } from 'react-router-dom'

//components
import Navbar from './navbar'

//icons
import { FaSearch } from 'react-icons/fa'
import { AiFillCaretDown } from "react-icons/ai";

function Exchange() {
    return (
        <div>
            <Navbar />
            <div className='category-shop'>
                <div className='con-category-shop'>
                    <ul>
                        <li>Category <AiFillCaretDown />
                            <ul className='category-shop-dropdown'>
                                <li><Link to="#">Collectible</Link></li>
                                <li><Link to="#">Vintage</Link></li>
                                <li><Link to="#">Antique</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className='category-shop-srearch'>
                        <form action="">
                            <input type="search" placeholder='Search' name='search' />
                            <FaSearch />
                        </form>
                    </div>
                </div>
            </div>
            <div className="exchanges">
                <div className='header-exchanges'>
                    <h1>ITEMS EXCHANGES</h1>
                </div>
                <div className='exchanges-box'>
                    <div className='exchanges-box-item'>
                        <Link to="/selectexchange">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Watch</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p2.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Ring</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p1.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Flower Bouquet</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p6.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Teddy Bear</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p3.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Watch</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p2.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Ring</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p1.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Flower Bouquet</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p6.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Teddy Bear</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p3.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Watch</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p2.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Ring</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p1.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Flower Bouquet</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p6.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Teddy Bear</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p3.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Watch</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p2.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Ring</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p1.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Flower Bouquet</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p6.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='exchanges-box-item'>
                        <Link to="#">
                            <div className='exchanges-box-item-newAndname'>
                                <p>New</p>
                                <h2>Teddy Bear</h2>
                            </div>
                            <div className="exchanges-box-item-imageAinfo">
                                <div className="con-exchanges-box-item-image">
                                    <div className='exchanges-box-item-image'>
                                        <img src="/images/p3.png" alt="" />
                                    </div>
                                </div>
                                <div className='exchanges-box-item-info'>
                                    <h4>description<br /><div className='exchanges-box-item-info-text'>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda perspiciatis, aspernatur animi blanditiis consequatur, fugiat accusamus non inventore impedit sit officiis, nemo laborum temporibus alias exercitationem nulla sed ipsam delectus nihil optio nesciunt! Soluta quaerat deserunt ipsam quae maxime veritatis minus, ratione labore quidem dolores deleniti. Molestiae, laudantium. Asperiores, ratione.</p>
                                    </div></h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exchange