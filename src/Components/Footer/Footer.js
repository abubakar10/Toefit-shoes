import React from 'react'
import "./Footer.css"
import logo from "./../../Assets/logos/logo.png"
import facebook from "./../../Assets/icons/icons8-facebook-50.png"
import twitter from "./../../Assets/icons/icons8-twitter-50.png"
import instagram from "./../../Assets/icons/icons8-instagram-50.png"
import linkedin from "./../../Assets/icons/icons8-linked-in-50.png"
import google from "./../../Assets/icons/icons8-google-50.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    
   
    <div className='footer-contents'>
    <div className='footer'>
        <div className='footer-div1'>
            <div className="logo">
               <a href="/"><img src={logo} alt="Falcon Logistics" /></a>
            </div>
            <div className='text'>
                <p>If you’re looking for the best dispatch service for owner operators & independent truckers, you’ve come to the right place.</p>
            </div>
            <div className='icons'>
                <div className='icon'>
                    <Link to="/home"><img src={facebook} alt="" /></Link>
                </div>
                <div className='icon'>
                    <a href=""><img src={twitter} alt="" /></a>
                </div>
                <div className='icon'>
                    <a href=""><img src={instagram} alt="instagram" /></a>
                </div>
                <div className='icon'>
                    <a href=""><img src={linkedin} alt="" /></a>
                </div>
                <div className='icon'>
                    <a href=""><img src={google} alt="" /></a>
                </div>
            </div>

        </div>
        <div className='footer-div2'>
            <h4>Company</h4>
              <div className='links'>
                <Link to="/">Home</Link>
              </div>
              <div className='links'>
                <Link to="/about">About</Link>
              </div>
              <div className='links'>
                <Link to="/ladies">Ladies</Link>
              </div>
             
              <div className='links'>
                <Link to="/sale">Sale</Link>
              </div>
              <div className='links'>
                <Link to="/contact">Contact Us</Link>
              </div>

        </div>
        <div className='footer-div3'>
            <h4>Get In Touch</h4>
            <p>312 SW Greenwich Drive Lees Summit MO 64082 <br />(636) 638-3311</p>
            <p>Support@Falcondispatchservices.com</p>
            
        </div>
        
     </div>
     <h6>Copyright © 2024 Falcon Dispatch Services | Powered by Lg Dispatch Services</h6>
    </div>
  )
}

export default Footer