import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie"; 
export let logincontext=createContext()
export  function Logincontextprovider(props){

    const [logged,setlogged]=useState(false)
    function saviingtoken(accessToken) {
        localStorage.setItem('acesstoken',accessToken)
       
      
        setlogged(true);
      }
      const logout = (e) => {

        setlogged(false)

        localStorage.removeItem('access_token');
   }
    return<logincontext.Provider value={{saviingtoken,logged,logout}}>{props.children}</logincontext.Provider>
}