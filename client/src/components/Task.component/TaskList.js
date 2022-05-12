import React from 'react';
import { _urlTasks } from '../../configURL';
import { useState, useEffect } from 'react';

import { Button} from '@mui/material';
import swal from 'sweetalert';



export default function TaskList() {

  //states
  const [tasks, setTasks] = useState({
    hayTareas: true,
    data: [].sort(function(a, b){return a - b})
  });
  
  
  
const getTasks = async () => {
  const respuesta = await fetch(_urlTasks);
  const task = await respuesta.json();
  console.log(task);

  
  if(task.length === 0){
    return setTasks({
      hayTareas: false,
      data : [].sort(function(a, b){return a - b})
    });
  }else{
    return setTasks({
      data: task.sort(function(a, b){return a - b}),
      hayTareas: true,
      
    });
  }
  
}

  const deleteTask = async (id) => {
    swal({
      title: "Estas seguro de eliminar la tarea?",
      text: "se eliminara permanentemente",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Listo eliminado", {
          icon: "success",
        });
        fetch(_urlTasks + "/delete/" + id, {
          method: 'DELETE',
        });
        setTasks(tasks.data.filter(task => task._id !== id));
        getTasks();
        setTimeout(() => {
          getTasks();
        } , 500);
        
        

      } else {
        swal("Perfecto, a completar la tarea!");
      }
    });
    
  }
  const paramsId = (id) => {
    window.location.href = "/tasks/" + id;
  }

   const completeTask = async (ID, valor) => {
    
    try {
      const respuesta = await fetch(_urlTasks + "/complete/" + ID, {
        method: 'PUT',
        body: JSON.stringify({
          complete: false
        }),
      });
      //prevenir que se recargue la pagina
      if(respuesta.ok){
        setTasks({
          ...tasks,
        })
        getTasks();
      }
    


      const task = await respuesta.json();
      
      console.log(task);
      
      
    } catch (error) {
      console.log(error);
    }
    
  }  
  
  //cuando se cargue la pagina se ejecuta esta funcion
useEffect(() => {
  getTasks();
  
}, []);
   
  return (
     <div>
       <div class="cont-search">

       <h1 className='titulo-lista-tareas'>Lista de tareas</h1>
       </div>

        {
          tasks.hayTareas ?

       <div className="datatable-container">
          <table className="datatable">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Tarea</th>
                <th>Descripcion</th>
                <th>Acciones</th>
                <th>Completado/Pendiente</th>
              </tr>
            </thead>
              <tbody>
                {
                  tasks.data.map((task, index) => ( 
                    <tr key={index}>
                      <td className='numeros'>{index + 1}</td>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td><button onClick={()=>deleteTask(task.id)} className='eliminar'>Eliminar</button> <button onClick={()=> paramsId(task.id)} className='editar'>Editar</button></td>
                      <td>

                        {
                          task.complete 

                          ?
                          <Button type='submit' className='btn-completado'  onClick={() => completeTask(task.id, task.complete)}  variant="contained"> Completada &nbsp;
                          </Button>

                          :

                          <Button className='btn-pendiente'  onClick={() => completeTask(task.id, task.complete)}  type='submit' variant="contained"> pendiente &nbsp; </Button>
                        }

                      </td>
                    </tr>
                ))
                }
                </tbody>
              
        </table>
        </div>


        :

        <div className="no-tasks">
          <h2>No hay tareas</h2>
          <img src="https://cdn.icon-icons.com/icons2/1506/PNG/512/emblemok_103757.png" alt=""/>
        </div>

      }






    </div>
       
  )
}      


  
   

/* <Button type='submit' onClick={ () => deleteTask(task.id)} sx={{marginRight:"15px", marginBottom:"20px", marginLeft:"15px", backgroundColor:"red"}} variant="contained">Eliminar</Button>
      <Button onClick={ () => paramsId(task.id)} sx={{marginRight:"15px", marginBottom:"20px", backgroundColor:"green"}} variant="contained">Editar</Button> */



      /* 
      { 
          task.complete ? 
        
        
        <Button type='submit'   onClick={() => completeTask(task.id, task.complete)} sx={{marginRight:"15px", marginBottom:"20px", backgroundColor:"moccasin", color:"black"}} variant="contained"> Completada &nbsp;
        
        <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/190/190411.png" /></Button> 

        :
        <Button  onClick={() => completeTask(task.id, task.complete)} sx={{marginRight:"15px", marginBottom:"20px", backgroundColor:"moccasin", color:"black"}} type='submit' variant="contained"> pendiente &nbsp; </Button>
        
        
        } */