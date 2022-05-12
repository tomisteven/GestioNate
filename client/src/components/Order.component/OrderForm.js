import React from 'react';
import { _urlOrders } from '../../configURL';
import { useState } from 'react';
import swal from 'sweetalert';



export default function TaskForm() {
  
  //task es el objeto que se va a crear
  //setTask es la funcion que se va a ejecutar cuando se cambie el valor de task
  const [order, setOrder] = useState({
    product: '',
    description: '',
    price: '',
    cantidad: '',
    //color me devuelva un numero del 0 al 7
    
  });

  
  
  //cuando se cambie el valor de task se ejecutara esta funcion
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    console.log(order);
    

    if(order.product.trim() === '' || order.description.trim() === ''){
      swal("Error", "Debe completar todos los campos", "error");
    }
    else{

    
      const respuesta = await fetch(_urlOrders + "/create", {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
        
      })
      await respuesta.json();
      
      swal("Good job!", "You clicked the button!", "success").then(() => {
        //limpiamos los campos
        setOrder({
          title: '',
          description: '',
          price: '',
            cantidad: '',
        });
        
        window.location.href = '/orders';
        
      }); 

     

    }
}
  const handleChange = (e) => {
      console.log(e.target.name, e.target.value);
    //cunado se cambie el valor de un input, se va a ejecutar esta funcion y se va a guardar en el objeto task la propiedad que se cambio
    setOrder({...order,[e.target.name]: e.target.value});
  }







  return (
    <div>
      
      <h1 className='proveedor-name'>Guardar proveedor</h1>
      <div className="contact-wrapper animated bounceInUp">
            <div className="contact-form">
                
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Producto</label>
                        <input className="order"  type="text" onChange={handleChange} name="product"/>
                    </p>
                    <p>
                        <label>Description</label>
                        <input  className="order" type="text" onChange={handleChange} name="description"/>
                    </p>
                    <p>
                        <label>Precio</label>
                        <input className="order"  type="number" placeholder='$' onChange={handleChange} name="price"/>
                    </p>
                    <p>
                        <label>Cantidad</label>
                        <input className="order" type="number" placeholder='Unidades' onChange={handleChange} name="cantidad"/>
                    </p>
                    
                    <p className="block">
                        <button type='submit' className='button-order'>
                            Guardar
                        </button>
                    </p>
                </form>
        </div>

    </div>    



    </div>
  )
  
}
