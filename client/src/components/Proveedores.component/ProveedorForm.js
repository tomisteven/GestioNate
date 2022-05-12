import React from 'react'
import { _urlProviders } from '../../configURL';
import { useState} from 'react';
import swal from 'sweetalert';


export default function ProveedorForm() {
  
  const [proveedor, setProveedor] = useState({
    name: '',
    direction: '',
    telefono: '',
    product:"",
    email: '',
    cantidadproduct: '',
  });


  const handleChange = (e) => {
    setProveedor({
      ...proveedor,[e.target.name]: e.target.value
    });

    console.log(proveedor);
  }




  const handleSubmit = (e) => {

    e.preventDefault();

    if (proveedor.name.trim() === '' || proveedor.direction.trim() === '' || proveedor.telefono.trim() === '' || proveedor.email.trim() === '' || proveedor.cantidadproduct.trim() === '') {
      swal("Error", "Debe completar todos los campos", "error");
    }
    else {

      fetch(_urlProviders + "/create", {
        method: 'POST',
        body: JSON.stringify(proveedor),
        headers: {
          'Content-Type': 'application/json'
        }

      }).then(respuesta => respuesta.json())
        .then(data => {
          swal("Good job!", "You clicked the button!", "success").then(() => {
            //limpiamos los campos
            setProveedor({
              name: '',
              product:"",
              direction: '',
              telefono: '',
              email: '',
              cantidadproduct: '',
            });

            window.location.href = '/providers';

          });

        });

    }






  }










  return (
    <div>
      
      <h1 className='proveedor-name'>Guardar proveedor</h1>
      <div className="contact-wrapper animated bounceInUp">
            <div className="contact-form">
                
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Proveedor</label>
                        <input type="text" className='input-provider' onChange={handleChange} name="name"/>
                    </p>
                    <p>
                        <label>Producto</label>
                        <input type="text" className='input-provider' onChange={handleChange} name="product"/>
                    </p>
                    <p>
                        <label>Telefono</label>
                        <input type="number" className='input-provider' placeholder='+5411665544' onChange={handleChange} name="telefono"/>
                    </p>
                    <p>
                        <label>Email</label>
                        <input className='input-provider' type="email" placeholder='Holamundo@hotmail.com' onChange={handleChange} name="email"/>
                    </p>
                    <p>
                        <label>Direction</label>
                        <input className='input-provider' type="text" onChange={handleChange} name="direction"/>
                    </p>
                    <p>
                       <label>Cantidad</label> 
                        <input name="cantidadproduct" className='input-provider' onChange={handleChange} rows="3"></input>
                        </p>
                    <p className="block">
                        <button type='submit' className="btn-provider">
                            Guardar
                        </button>
                    </p>
                </form>
        </div>

    </div>    



    </div>
  )
}
