import React from 'react'

import {Outlet} from "react-router-dom"


import Footer from './Footer'





const Layout = () => {


  return (
    
    <div className="content pt-[1rem]">
     
    

    
     
     
      <Outlet />
  
      <Footer/>
      </div>
   
  )
}

export default Layout;
