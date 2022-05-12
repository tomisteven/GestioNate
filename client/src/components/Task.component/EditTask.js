import React from 'react';
import { _urlTasks} from '../../configURL';
import { useState, useEffect } from 'react';





export default function EditTask() {
    let location = window.location.href;
    let idTask = location.split('/')[4];

    const [task, setTask] = useState({
        _id: idTask,
        title: '',
        description: ''
        
    });

    const getTask = async () => {
        
        const respuesta = await fetch(_urlTasks + "/" + idTask);
        const Task = await respuesta.json();
        setTask({
            _id: idTask,
            title: Task.title,
            description: Task.description
        });
        console.log(Task);
    }

    const onChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });

        console.log(task);
    }
    const editTask = async (e) => {
        e.preventDefault();
        const respuesta = await fetch(_urlTasks + "/edit/" + idTask, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await respuesta.json();
        console.log(data);
        console.log("Editado");

        window.location.href = "/";
    }

    useEffect(() => {
        getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return <div>
      
  <h1 className='proveedor-name'>Editar Tarea</h1>
  <div className="contact-wrapper animated bounceInUp">
        <div className="contact-form">
            
            <form onSubmit={editTask}>
                <p>
                    <label>Tarea</label>
                    <input className="task" value={task.title}  type="text" onChange={onChange} name="title"/>
                </p>
                <p>
                    <label>Descripcion</label>
                    <input  className="task" value={task.description} type="text" onChange={onChange} name="description"/>
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
}
