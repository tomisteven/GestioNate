import React from 'react'
import "./aboutMe.css"
import photoProfile from "./foto-profile.jpeg"
import {Link} from "react-router-dom"   

export default function AboutMe() {
  return (
    <div>
        <div class="main">
            <img src={photoProfile} alt=""/>
            <div class="about-me-info">
                <h2>Tomas Steven</h2>
                <h5>Desarrollador <span>Full Stack Mern</span></h5>
                <p>
                Tengo 24 años, Me dedico al desarrollo web hace 2 años, abarco tanto Front End como Back end. Ultilizo NodeJs para BackEnd y Javascript para FrontEnd. Aplico con MongoDb y SqlServer. Realice proyectos completos con ReactJs y NodeJS. Actualmente me estoy expandiendo en el mundo BackEnd. A continuacion mis proyectos...
                </p>    
                <Link to={"/contact-me"}>
                    <button class="btn-contact">Contactame</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
