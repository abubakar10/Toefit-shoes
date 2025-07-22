import React, { useState } from 'react'
import "./LadiesSection1.css"
import LadiesProductData from "./LadiesProductData.js"
import { IoCloseCircleSharp } from "react-icons/io5";
import { useCart } from '../../../Context/CartProvider.js';

const LadiesSection1 = () => {
  const [cart,setCart]=useCart()
  const [detail, setDetail] = useState([]);
  const [close, setClose] = useState(false);
  const detailPage = (LadiesSection1) => {
    setDetail([{ ...LadiesSection1 }])
    setClose(true)
  }
  return (
    <>
    
      {
        close ?
          <div className='detail-container'>
            <div className='detail-content'>
              <button className='close' onClick={() => setClose(false)}><IoCloseCircleSharp size={33} /></button>
              {
                detail.map((x) => {
                  return (
                    <>
                      <div className='detail-info'>
                        <div className='img-box'>
                          <img src={x.img} alt={x.title} />
                        </div>
                        <div className='product-detail'>
                          <h2>{x.title}</h2>
                          <h3>$ {x.price}</h3>
                          <p>{x.description}</p>
                          <button onClick={()=>setCart()}>Add To Cart</button>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div> : null
      }

      <div className='container'>
        {
          LadiesProductData.map((curElm) => {
            return (
              <>
                <div className='box'>
                  <div className='content'>
                    <div className='img-box'>
                      <img src={curElm.img} alt={curElm.title} />
                    </div>
                    <div className='detail'>
                      <div className='info'>
                        <h3>{curElm.title}</h3>
                        <p>$ {curElm.price}</p>
                      </div>
                      <div className='view-btn'>
                        <button onClick={() => detailPage(curElm)}>View</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>

    </>
  )
}

export default LadiesSection1
