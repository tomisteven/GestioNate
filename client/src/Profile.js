import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import "./profile.css"

import backIMG from "./back.png"
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Profile = () => {

    const { user, isAuthenticated } = useAuth0();

    console.log(user);

  return (
    <div>
        {
            isAuthenticated  
            ? 
            <div>
              <div className="cont-img-logo">
                <img className="img-user-logo" style={{
                  borderRadius: "50%",
                  width: "180px",
                  height: "180px",
                  boxShadow: "0px 0px 3px 0px rgba(255, 255, 255, 0.602)",
                  marginTop: "40px",
                  
                  marginLeft: "100px",
                  marginRight: "20px",
                  objectFit: "cover"

                }} src={user.picture} alt=""/>
                <div className="info">
                 
                  <h3 className="info-text">♦  Nombre:  &nbsp;&nbsp;{user.name}</h3>
                  <h3 className="info-text">♦  Usuario: &nbsp;&nbsp;{user.nickname}</h3>
                  <h3 className="info-text">♦  Email: &nbsp;&nbsp;{user.email}</h3>
                  
                  <h3 className="info-text">♦  Idioma: {user.locale}</h3>
              </div>
            </div>
            <div className='cont-log-back'>
              <Link to={"/"}>
                <img className='img-logout  ' src={backIMG} alt=""/>
              </Link>
              <Link to={"/"}>
                {/* llamar componente logout y sus parametros*/}
                <Logout /> 
              </Link>

            </div>
              
              

            </div> 
            : 
            <h1>No estas autenticado</h1>
        }
        
    </div>
  )
}

export default Profile