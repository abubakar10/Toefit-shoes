import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import store from "./store.jsx";
import App from "./App.js"
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./Context/Auth.js";
import { CartProvider } from "./Context/CartProvider.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
  <CartProvider>
  <BrowserRouter>
   <App/>
  </BrowserRouter>
  </CartProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
