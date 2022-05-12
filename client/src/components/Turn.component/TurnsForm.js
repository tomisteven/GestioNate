import React from 'react';
import { _urlTurns } from '../../configURL';

import { useState } from 'react';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";



import swal from 'sweetalert';

export default function TurnsForm() {

    const [turn, setTurn] = useState({
        title: '',
        description: '',
        date: new Date(),
      });
    
      
    
    //cuando se cambie el valor de task se ejecutara esta funcion
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
          const respuesta = await fetch(_urlTurns + "/create", {
            method: 'POST',
            body: JSON.stringify(turn),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          await respuesta.json();
          
          swal("Good job!", "You clicked the button!", "success").then(() => {
            window.location.href = '/turns';
          }); 
    
          
    
        }
    

    const handleChange = (e) => {
        //cunado se cambie el valor de un input, se va a ejecutar esta funcion y se va a guardar en el objeto task la propiedad que se cambio
        setTurn({...turn,[e.target.name]: e.target.value});
        console.log(turn);
      }



      return (
        <div>
          
          <h1 className='proveedor-name'>Guardar Turno</h1>
          <div className="contact-wrapper animated bounceInUp">
                <div className="contact-form">
                    
                    <form onSubmit={handleSubmit}>
                        <p>
                            <label>Titulo</label>
                            <input className='turns' type="text" onChange={handleChange} name="title"/>
                        </p>
                        <p>
                            <label>Descripcion</label>
                            <input className='turns' type="text" onChange={handleChange} name="description"/>
                        </p>

                        
                        
                            
                        {  <DatePicker className='datapicker'
                              label="Fecha"
                              name='date'
                              selected={turn.date}
                              onSelect={date => setTurn({...turn, date})}
                              onChange={date => setTurn({...turn, date})}
                              showTimeSelect
                              
                              isClearable
                              placeholderText="Fecha borrada"
                              dateFormat="dd MMMM, yyyy hh:mm aa"
                              
                        /> } 
                        
                        
                        
                        <p className="block">
                            <button className='btn-turns'  type='submit'>
                                Guardar
                            </button>
                        </p>
                    </form>
            </div>
    
        </div>    
    
    
    
        </div>
      )





}


/* <DatePicker className='datepicker'
                label="Fecha"
                name='date'
                    selected={turn.date}
                    onChange={date => setTurn({...turn, date})}
                    showTimeSelect
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="d MMMM, yyyy h:mm aa"
                    

                /> */