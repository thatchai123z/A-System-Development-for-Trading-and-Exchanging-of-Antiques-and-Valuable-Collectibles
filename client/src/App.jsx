import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Exchange from './pages/Exchange';
import Product from './pages/Product';
import SelectExchange from './pages/SelectExchange';
import Profile from './pages/Profile';
import Buyproduct from './pages/Buyproduct';
import Exchangeproduct from './pages/Exchangeproduct';
import Editfname from './pages/Editfname';
import Editlname from './pages/Editlname';
import Edittelephone from './pages/Edittelephone';
import Address from './pages/Address';
import Changepassword from './pages/Changepassword';
import Editpassword from './pages/Editpassword';
import Forgetpassword from './pages/Forgetpassword';
import Myproducts from './pages/Myproducts';
import Addproduct from './pages/Addproduct';
import Myproductinfo from './pages/Myproductinfo';
import Editproduct from './pages/Editproduct';
import Mybuy from './pages/Mybuy';
import Mysell from './pages/Mysell';
import Myorder from './pages/Myorder';
import Myordersell from './pages/Myordersell';
import Myexchang from './pages/Myexchang';
import MyOfferReceived from './pages/MyOfferReceived';
import Myorderexchang from './pages/Myorderexchang';
import MyorderofferReceived from './pages/MyorderofferReceived';
import UpdateExchang from './pages/UpdateExchang';
import ProfileUser from './pages/ProfileUser';
import Payment from './pages/Payment';
import Checkslip from './pages/Checkslip';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign_in' element={<SignIn />} />
        <Route path='/sign_up' element={<SignUp />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/exchange' element={<Exchange />} />
        <Route path='/product' element={<Product />} />
        <Route path='/selectexchange' element={<SelectExchange />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/buyproduct' element={<Buyproduct />} />
        <Route path='/exchangeproduct' element={<Exchangeproduct />} />
        <Route path='/user/profile/editfname' element={<Editfname />} />
        <Route path='/user/profile/editlname' element={<Editlname />} />
        <Route path='/user/profile/edittelephone' element={<Edittelephone />} />
        <Route path='/user/address' element={<Address />} />
        <Route path='/user/changepassword' element={<Changepassword />} />
        <Route path='/updatepassword' element={<Editpassword />} />
        <Route path='/forgetpassword' element={<Forgetpassword />} />
        <Route path='/myproducts' element={<Myproducts />} />
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/myproductinfo' element={<Myproductinfo />} />
        <Route path='/editproduct' element={<Editproduct />} />
        <Route path='/mybuy' element={<Mybuy />} />
        <Route path='/mysell' element={<Mysell />} />
        <Route path='/myorder' element={<Myorder />} />
        <Route path='/myordersell' element={<Myordersell />} />
        <Route path='/myexchang' element={<Myexchang  />} />
        <Route path='/myofferreceived' element={<MyOfferReceived  />} />
        <Route path='/myorderexchang' element={<Myorderexchang  />} />
        <Route path='/myorderofferReceived' element={<MyorderofferReceived  />} />
        <Route path='/updateExchang' element={<UpdateExchang  />} />
        <Route path='/profileUser' element={<ProfileUser/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/checkslip' element={<Checkslip/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
