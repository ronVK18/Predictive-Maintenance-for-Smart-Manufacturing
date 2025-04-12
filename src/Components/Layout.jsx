import React from 'react'

import {Outlet} from "react-router-dom"

import Header from './Header'
import Footer from './Footer'
import { useLocation } from "react-router-dom";




const Layout = () => {
  const location = useLocation();
   console.log(location.pathname);

  return (
    
    <div className="content pt-[1rem]">
     
    

      {/* <Header/> */}
     
     
      <Outlet />
  
      <Footer/>
      </div>
   
  )
}

export default Layout;
