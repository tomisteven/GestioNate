import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import "./login.css"
import { Link } from 'react-router-dom';


const Session = () => {
const { user } = useAuth0();
console.log(user)
const { name, picture, email } = user;


  return (
    <div>
        
            <Link to={"/profile"}>
            
            <img src={picture} title={user.name} className="img-user bax-shadow" alt=""/>
            </Link>

            
        
    </div>
  )
}

export default Session