import React from 'react';
import { _urlTurns } from '../../configURL';
import { useState, useEffect } from 'react';

export default function EditTurn() {
    let location = window.location.href;
    let idTurn = location.split('/')[4];

    const [turn, setTurn] = useState({
        _id: idTurn,
        title: '',
        description: '',
        date: new Date(),
    });

    const getTurn = async () => {
        
        const respuesta = await fetch(_urlTurns + "/" + idTurn);
        const Turn = await respuesta.json();
        setTurn({
            _id: idTurn,
            title: Turn.title,
            description: Turn.description,
            date: Turn.date
        });
    }

    const onChange = e => {
        setTurn({
            ...turn,
            [e.target.name]: e.target.value
        });

        console.log(turn);
    }
    const editTurn = async (e) => {
        e.preventDefault();
        const respuesta = await fetch(_urlTurns + "/edit/" + idTurn, {
            method: 'PUT',
            body: JSON.stringify(turn),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await respuesta.json();
        
        window.location.href = "/turns";
    }

    const convetDate = (date) => {
        let newDate = new Date(date);
        let newMonth = newDate.getMonth() + 1;
        let newDay = newDate.getDate();
        let newYear = newDate.getFullYear();
        let newHour = newDate.getHours();
        let newMinute = newDate.getMinutes();

        
        return  (newDay + "/" + newMonth + "/" + newYear  + " A las " + newHour + ":" + newMinute).toString();
    }

    useEffect(() => {
        getTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return <div>
          
  <h1 className='proveedor-name'>Guardar Turno</h1>
  <div className="contact-wrapper animated bounceInUp">
        <div className="contact-form">
            
            <form onSubmit={editTurn}>
                <p>
                    <label>Titulo</label>
                    <br>
                    </br>
                    <input className='turns' type="text" value={turn.title} onChange={onChange} name="title"/>
                </p>
                <p>
                    <label>Descripcion</label>
                    <br>
                    </br>
                    <input className='turns' type="text" value={turn.description} onChange={onChange} name="description"/>
                </p>
                <p>
                    <label>Fecha Establecida: &nbsp; {convetDate(turn.date)}</label>

                    <br>
                    </br>
                    <input onChange={onChange }  onSelect={convetDate(turn.date)} type="datetime-local" className='datepicker-edit' name="date"/>
                </p>
                
                
                <p className="block">
                    <button className='btn-turns'  type='submit'>
                        Guardar
                    </button>
                </p>
            </form>
    </div>

</div>    



</div>
}

/* <div className='cont-edit'>
        <div className='cont-edit-titulo'>
            <h1>Editar turno</h1>
        </div>
            <form onSubmit={editTurn}>
                    <div className="formulario"  >
                        <input onChange={onChange} className='inputs' name='title' value={turn.title} type="text"/>
                        <input onChange={onChange}  className='inputs' name='description' value={turn.description} type="text"/>
                        <label >Fecha Prevista: {convetDate(turn.date)}</label>
                        <input onChange={onChange }  onSelect={convetDate(turn.date)} type="datetime-local" className='datepicker-edit' name="date"/>

                        

                        <button type='submit'>Editar turno</button>
                    </div>
            </form>
  </div>; */