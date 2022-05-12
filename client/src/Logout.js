import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import imgLogout from "./logout.png"

const Logout = (width, height) => {
    

    const { logout } = useAuth0();


  return (
    <div>
        <img className='img-logout' style={{
          width: width,
          height: height,
        }} src={imgLogout} onClick={() => logout()} alt=""/>
    </div>
  )
}

export default Logout