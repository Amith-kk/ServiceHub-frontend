import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthenticationResponseContext = createContext()

const TokenAuth = ({children}) => {
    const [isAuthorized,setIsAuthorized]=useState(false)

    useEffect(()=>{
    const token = sessionStorage.getItem('token');
    const tokenFreelancer = sessionStorage.getItem('tokenfreelancer');
    const adminToken = sessionStorage.getItem('admintoken');
    
    if (token || tokenFreelancer || adminToken) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    },[])

  return (
    <>
    <TokenAuthenticationResponseContext.Provider value={{isAuthorized,setIsAuthorized}}>
        {children}
    </TokenAuthenticationResponseContext.Provider>
    </>
  )
}

export default TokenAuth