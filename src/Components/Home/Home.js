import React from 'react'
import Section1 from './Section1/Section1.js'
import Section2 from './Section2/Section2.js'
import Layout from '../Layout/Layout.js'
import { useAuth } from '../../Context/Auth.js'



const Home = () => {
  const [auth,setAuth]=useAuth();
  
  return (
    <>

         <Layout title={"Home-Toefit"}>
           
           <Section1/>
           <Section2/>
          </Layout>
        
          
        
    </>
  )
}

export default Home;
