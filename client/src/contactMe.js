import React from 'react'
import "./contactMe.css"
import left from "./chat.png"
import swal from 'sweetalert'

export default function ContactMe() {

  const swalAlert = () => {
    
    swal({
      title: "¡Gracias!",
      text: "¡En breve me pondré en contacto contigo!",
      icon: "success",
      button: "Aceptar",
    });
  }

  return (
    <div>
      <div className="contact-box">
			<div className="left">
        <img src={left} alt=""/>
      </div>
			<div className="right">
				<h2 className='h2-contactme'>Contactame</h2>
        <form action="https://formsubmit.co/3d77d33ba902fb18370706f9cacf0433" method="POST">
            <input type="text" name='Nombre' className="field" required placeholder="Nombre"/>
            <input type="text" name='Email' className="field" required placeholder="Email"/>
            <input type="text" name='Celular' className="field" placeholder="Numero Celular"/>
            <textarea placeholder="Mensaje" name='Mensaje' required className="field"></textarea>
            <input type="hidden" name="_next" value="http://localhost:3000/"></input>
            <input type="hidden" name="_captcha" value="false"></input>
            <button type="submit" onClick={swalAlert} className="btn">Enviar</button>
        </form>
			</div>
		</div>
    </div>
  )
}
