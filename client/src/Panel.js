/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import infopng from "./info.png"
import { useState, useEffect } from 'react';
import { _urlTurns, _urlOrders, _urlProviders, _urlTasks } from './configURL';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

import Login from './Login';

import Logout from './Logout';
import Session from './Session';




import  "./panel.css";

import { useAuth0 } from '@auth0/auth0-react';


export default function Panel() {
    
    const { isAuthenticated, user } = useAuth0();
    
    const [userData, setUserData] = useState({
        nombre: '',
    });

    const authenticado = () => {

        if (isAuthenticated) {
            setUserData({
                nombre: user.name
            });
        }
        else{
            setUserData({
                nombre: 'Usuario'
            });
        } 
    }
    //states
    //user
    const [turns, setTurns] = useState({
        _turns: [],
        vencidos : 0,
        pendientes : 0,
    });
    const [orders, setOrders] = useState({
        _orders: [],
        stock: 0
    });
    const [providers, setProviders] = useState({
        _providers: [],
        cantidad: 0
    });
    const [tasks, setTasks] = useState([]);

    


        const getTasks = async () => {
            const respuesta = await fetch(_urlTasks);
            const task = await respuesta.json();
            //console.log(task.length);
    
            
            if (task.length > 0) {
                setTasks(task);
                
            }else{
                setTasks([]);
            }
        }
        const getTurns = async () => {
            const respuesta = await fetch(_urlTurns);
            const turn = await respuesta.json();
            
    
            if (turn.length > 0) {
                setTurns({
                    _turns: turn,
                });
            } 
            
            
            const Pendientes = []
            const Vencidos = []
            for (let i= 0; i < turn.length; i++) {
                //turnos vencidos
                if(turn[i].date < new Date().toISOString().slice(0,10)){
                    
                    Vencidos.push(turn[i]);
                    
                }
                else{
                    
                    Pendientes.push(turn[i]);
                }
            }
            
            return setTurns({
                _turns: turn,
                vencidos : Vencidos.length,
                pendientes : Pendientes.length
            })
            
            

        }
        const getOrders = async () => {
            const respuesta = await fetch(_urlOrders);
            const order = await respuesta.json();
            
    
            if (order.length > 0) {
                setOrders({
                    _orders: order
                });
            } else {
                setOrders([]);
            } 

            //sumamos el total de la cantidad 
            let total = 0;
            
            for (let i = 0; i < order.length; i++) {
                const numero = parseInt(order[i].cantidad);
                total = total + numero;
            }
            setOrders({
                _orders: order,
                stock: total
            })
        
            

            
            
        }
        const getProviders = async () => {
            const respuesta = await fetch(_urlProviders);
            const provider = await respuesta.json();
            
            
            
            if (provider.length > 0) {
                const provi =  providers._providers.map(provider => provider.cantidadproduct < 100)
                const cantidadProvi = provi.filter(provider => provider === true).length;
                
                setProviders({
                    _providers: provider,
                    cantidad: cantidadProvi
                })
            } else {
                setProviders({
                    _providers: []
                });
            } 
              
        }
        const info = () => {swal("Panel de control", "En el panel se encuentran las cuatro secciones de registros de GestioNate, donde se puede ver una presentacion sencilla de lo almacenado en la base de datos", "info" );}
        
        

    useEffect(() => {
        getTasks();
        getTurns();
        getOrders();
        getProviders();
        authenticado();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    return (
        <div> 
        <div className="contenedor-panel">
        {/* nav */}
        <div className="contenedor-panel-titulo">
                <h1 className='gestio'>Gestio<span className='SPAN'>Náte</span></h1>
                <div className="cont-accesos">
                    <div className="cont-accesos-1">
                        <Link className='link' to={"/tasks"}>
                            <h3 className='cont-nav-panel'>Gestion de datos</h3>
                        </Link>
                        <Link to={"/contact-me"}>
                            
                            <h3 className='cont-nav-panel'>Contacto</h3>
                        </Link>
                        <Link to={"/about-me"}>
                            <h3 className='cont-nav-panel'>Acerca de mi</h3>
                            
                        </Link>
                    </div>
                    <div className="cont-accesos-2">
                        <Link to={"/"}>
                            {
                                isAuthenticated ? <h4 className='login'><Logout /></h4>  : <h4 style={{
                                    display: 'none'
                                }}>.</h4>
                            }
                        
                        </Link>
                        <Link to={"/"}>
                            {
                                isAuthenticated ? <Session />  : <h4 className='login'><Login /></h4>
                            }
                            
                        </Link>
                     </div>
                
                </div>
            </div>
            {/* nav */}
            <div class="cont-bienvenido">
                    <h2 className='bienvenido'>
                        Panel de control
                        <button onClick={info} className='btn-info2'><img src={infopng} alt=""/></button>
                    </h2>
            </div>
                <div className="panel-controles">
                    <div className="panel-controles-item-task">
                        <i className="fas far fa-clipboard"></i>
                        <div className="cont-h4">
                            <p>{tasks.length} Tareas</p>
                        </div>
                        <div className="cont-completadas">
                            <div className="pendiente">
                                <p>Pendientes</p>
                                <h2>{tasks.filter(task => task.complete === false || task.complete === null).length}</h2>
                            </div>
                            <div className="completas">
                                <p>Completadas</p>
                                <h2>{tasks.filter(task => task.complete === true).length}</h2>
                                
                            </div>
                        </div>
                        <div className="cont-acciones">
                            <Link className='btn-link' to={"/tasks"}>Ver Tareas</Link>
                            <Link className='btn-link' to={"/task/new"}>Crear Tarea</Link>
                        </div>

                    </div>
                    <div className="panel-controles-item-turn">
                        <i className="fas far fa-stopwatch"></i>
                        <div className="cont-h4 turn-pendiente">
                            <h4>{turns.pendientes} Turnos pendientes</h4> 
                        </div>
                        <div className="cont-h4 turn-vencido">
                            <h4 >{turns.vencidos} Turnos Vencidos</h4>
                        </div>
                        <div className="cont-acciones">
                            <Link className='btn-link' to={"/turns"}>Ver Turnos</Link>
                            <Link className='btn-link' to={"/turn/new"}>Crear Turno</Link>
                        </div>
                    </div>
                    <div className="panel-controles-item-order">
                        <i className="fas far fa-shopping-cart"></i>
                        
                        
                            <div className="productos">
                                <p>Cantidad productos</p>
                                <h2>{orders._orders.length}</h2>
                            </div>
                            <div className="stock">
                                <p>Stock total de productos</p>
                                <h2>{orders.stock} </h2>
                            </div>
                        
                        <div className="cont-acciones">
                            <Link className='btn-link' to={"/turns"}>Productos</Link>
                            <Link className='btn-link' to={"/turn/new"}>Crear Producto</Link>
                        </div>
                    </div>
                    <div className="panel-controles-item-provider">
                        <i className="fas far fa-address-book"></i>
                        <div className="cont-h4">
                            <p>{ providers._providers.length} Proveedores</p>
                        </div>
                        <div className="cont-h4">
                            
                                { 
                                    providers.cantidad > 0 ?
                                    <p>{providers.cantidad} Proveedores con stock bajo</p>
                                    :
                                    <p>proveedores con stock promedio</p>
                                } 
                            
                        </div>
                        <div className="cont-acciones">
                            <Link className='btn-link proveedores' to={"/providers"}>Proveedores</Link>
                            <Link className='btn-link proveedores' to={"/providers/new"}>Crear Proveedor</Link>
                        </div>
                    </div>
                </div>

                
            
        </div>
    </div>
  )
}
