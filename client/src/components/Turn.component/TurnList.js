import React from 'react';

import { _urlTurns } from '../../configURL';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import comprobado from "../../../src/comprobado.png";





export default function TurnList() {

    //states
  const [turns, setTurns] = useState({
    data: [],
    hayTurns: true,
    _id : '',
  });




  const getTurns = async () => {

    const respuesta = await fetch(_urlTurns);
    const turns = await respuesta.json();
    

    if(turns.length === 0){
        setTurns({
          hayTurns: false,
          data: []
        });
      }else{
        setTurns({
          data: turns,
          hayTurns: true
    
        });
      }
      console.log(turns);
  }
  const deleteTurn = async (id) => {
    
    swal({
      title: "Estas seguro de eliminar el turno?",
      text: "se eliminara permanentemente",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Listo eliminado", {
          icon: "success",
        }).then(() => {
          fetch(_urlTurns + "/delete/" + id, {
            method: 'DELETE',
          });


          
          //elimina el turno de la lista, filtra los turnos que no sean el que se elimino
          setTurns({
            data: turns.data.filter(turn => turn._id !== id),
            hayTurns: true
          });

          getTurns();

          setTimeout(() => {
            getTurns();
          } , 500);



          
        })
      } else {
        swal("Perfecto, turno convervado!");
      }
    });
    
    }

  useEffect(() => {
    getTurns();
    
  }, []);


  const paramsId = (id) => {
    window.location.href = "/turns/" + id;
  }

  const obtenerFecha = (fecha) => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


    const FECHA = {
    dia: new Date(fecha).getDate(),
    mes: meses[new Date(fecha).getMonth()],
    anio: new Date(fecha).getFullYear(),
    hora: new Date(fecha).getHours(),
    minutos: new Date(fecha).getMinutes()

  }
    

    return FECHA;
  }
  

  return (
     <div>
       <div class="cont-search">
        <h1 className='titulo-lista-tareas'>Turnos pendientes</h1>

       </div>


        {
          turns.hayTurns ?
            <div className="cont-turn-list">

            {
              turns.data.map((turn, index) => (
                  <div className="card" key={turn.id}>
                      <div className="left-column background1-left-column">
                          
                          <h1>{obtenerFecha(turn.date).dia}</h1>
                          <h4>{obtenerFecha(turn.date).mes}</h4>
                          <h5>{obtenerFecha(turn.date).anio}</h5>
                          
                          <i class="far fa-calendar-alt"></i>
                      </div>
              <div className="right-column">
                
                  <h3>{turn.title}</h3>
                  <p>{turn.description}</p>
                  <div className="cont-button">
                      <button onClick={ ()=> deleteTurn(turn.id)} className="button background1-left-column">Eliminar</button>
                      <button onClick={() => paramsId(turn.id)} className="button background1-left-column">Editar</button>
                  </div>
              </div>
              </div>

              ))
            
              
              
          }

        </div>

        : 
          <div className='nohayturnos'>
            <h1>No hay turnos pendientes</h1>
            <img src={comprobado} alt=""/>
          </div>

        }




       
    </div> 
   
  
)
};








