import React from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
// import Section1 from "./Components/Section1/Section1";
// import Section2 from "./Components/Section2/Section2";
// import Section3 from "./Components/Section3/Section3";
// import Section4 from "./Components/Section4/Section4";
import Footer from "./Components/Footer/Footer.js";
import Home from "./Components/Home/Home.js";
import Ladies from "./Components/Ladies/Ladies.js";
import Men from "./Components/Men/Men.js";
import Login from "./Components/Login/Login.js"
import Signup from "./Components/Signup/Signup.js";

import {  Route, Routes } from "react-router-dom"
import Cart from "./Components/Cart/Cart.js";
// import Sale from "./Components/Sale/Sale.js";
import Kids from "./Components/Kids/Kids.js";
import About from "./Components/About/About.js";
import Checkout from "./Components/Checkout/Checkout.js";
import OrderConfirmation from "./Components/OrderConfirmation/OrderConfirmation.js";
import PageNotFound from "./Components/PageNotFound/PageNotFound.js";
  import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Components/AdminDashboard/Dashboard.js";
import PrivateRoute from "./Components/Routes/Private.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.js";
import AdminRoute from "./Components/Routes/AdminRoute.js";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard.js";
import CreateCategory from "./Components/AdminDashboard/CreateCategory.js";
import CreateProduct from "./Components/AdminDashboard/CreateProduct.js";
import Users from "./Components/AdminDashboard/Users.js";
import Orders from "./Components/UserDashboard/Orders.js";
import Profile from "./Components/UserDashboard/Profile.js";
import Products from "./Components/AdminDashboard/Products.js";
import UpdateProduct from "./Components/AdminDashboard/UpdateProduct.js";



function App() {
  return (
    <>
           
          <Header />
          <Routes>
              <Route path='/' Component={Home} />
              <Route path="/dashboard" element={<PrivateRoute/>}>
              <Route path ="user" Component={Dashboard} />
              <Route path ="user/orders" Component={Orders} />
              <Route path ="user/profile" Component={Profile} />

              </Route>
              <Route path="/dashboard" element ={<AdminRoute/>}>
                <Route path="admin" element = {<AdminDashboard/>}/>
                <Route path="admin/create-category" element = {<CreateCategory/>}/>
                <Route path="admin/create-product" element = {<CreateProduct/>}/>
                <Route path="admin/product/:slug" element = {<UpdateProduct/>}/>

                <Route path="admin/products" element={<Products />} />
                <Route path="admin/users" element = {<Users/>}/>
              </Route>

             
              <Route path='/ladies' Component={Ladies} />
              <Route path='/forgot-password' Component={ForgotPassword} />
              <Route path='/men' Component={Men} />
              {/* <Route path='/sale' Component={Sale} /> */}
              <Route path='/kids' Component={Kids} />
              <Route path='/login' Component={Login} />
              <Route path='/signup' Component={Signup} />
              <Route path='/cart' Component={Cart} />
              <Route path='/checkout' Component={Checkout} />
              <Route path='/order-confirmation' Component={OrderConfirmation} />
              <Route path='/about' Component={About} />
              
              <Route path='*' Component={PageNotFound} />
          </Routes>
       

        <Footer />
      
    </>
  );
}

export default App;
