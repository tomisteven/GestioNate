import React from 'react';
import {Link} from "react-router-dom";
import panelcontrol from "../../panel-de-control.png"


export default function NavVertical() {
  return <div className='contenedor-nav-vertical'>

                <ul className='nav-vertical'>
                    <Link className='li-navertical' aria-current="page" to={"/tasks"}> <i className="fas fa-clipboard"></i> &nbsp; Tareas   </Link>
                    
                    <Link className='li-navertical' aria-current="page" to={"/turns"}>  <i className="fas fa-stopwatch"></i> &nbsp; Turnos </Link>
                    
                    <Link className='li-navertical' aria-current="page" to={"/orders"}><i className="fas fa-shopping-cart"></i>&nbsp; Pedidos</Link>

                    <Link className='li-navertical' aria-current="page" to={"/providers"}> <i className="fas fa-address-book"></i> &nbsp; Proveedores</Link>
                
                </ul>
            <div>
                <div className="panel-controles">
                  <Link className='btn-panel-img' to={"/"}>
                    <img src={panelcontrol} alt=""/>
                    <h4>Panel de control</h4>
                  </Link>
                </div>
            </div>


  </div>;
}
