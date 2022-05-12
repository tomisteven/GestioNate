import React from 'react';
import { _urlTasks } from '../../configURL';
import { useState } from 'react';
import swal from 'sweetalert';



export default function TaskForm() {
  
  const colores = [
    'rgba(246, 128, 32, 0.808)',
    'rgba(42, 211, 197, 0.616)',
    'rgba(27, 71, 214, 0.616)',
     'rgba(146, 18, 185, 0.616)',
    '#FFC0CB',

  ]
  //task es el objeto que se va a crear
  //setTask es la funcion que se va a ejecutar cuando se cambie el valor de task
  const [task, setTask] = useState({
    title: '',
    description: '',
    //color me devuelva un numero del 0 al 7
    color: colores[Math.floor(Math.random() * colores.length)],
  });

  
  
  //cuando se cambie el valor de task se ejecutara esta funcion
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    console.log(task);
    

    if(task.title.trim() === '' || task.description.trim() === ''){
      swal("Error", "Debe completar todos los campos", "error");
    }
    else{

    
      const respuesta = await fetch(_urlTasks + "/create", {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json'
        }
        
      })
      await respuesta.json();
      
      swal("Good job!", "You clicked the button!", "success").then(() => {
        //limpiamos los campos
        setTask({
          title: '',
          description: '',
          color: colores[Math.floor(Math.random() * colores.length)]
        });
        
        window.location.href = '/tasks';
        
      }); 

      

    }
}
  const handleChange = (e) => {
    //cunado se cambie el valor de un input, se va a ejecutar esta funcion y se va a guardar en el objeto task la propiedad que se cambio
    setTask({...task,[e.target.name]: e.target.value});
  }







  
  return (
    <div>
      
      <h1 className='proveedor-name'>Crear Tarea</h1>
      <div className="contact-wrapper animated bounceInUp">
            <div className="contact-form">
                
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Tarea</label>
                        <input className="task"  type="text" onChange={handleChange} name="title"/>
                    </p>
                    <p>
                        <label>Descripcion</label>
                        <input  className="task" type="text" onChange={handleChange} name="description"/>
                    </p>
                    <p className="block">
                        <button type='submit' className='button-task'>
                            Guardar
                        </button>
                    </p>
                </form>
        </div>

    </div>    



    </div>
  )
  
}
