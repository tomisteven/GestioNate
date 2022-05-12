import React from 'react'
import { _urlProviders } from '../../configURL';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import infoIMG from '../../info.png';
export default function ProveedorList() {

  const [proveedores, setProveedores] = useState({
    hayProveedores: true,
    data: []
  });


  const getProveedores = async() => {
    const respuesta = await fetch(_urlProviders);
    const proveedores = await respuesta.json();
    console.log(proveedores);

    if(proveedores.length === 0){
      setProveedores({
        hayProveedores: false,
        data : []
      });

    }
    else{
      setProveedores({
        data: proveedores,
        hayProveedores: true,
      });

    }

  }
  const searchOrders = async () => {
    //buscar ordenes por nombre
    const respuesta = await fetch( _urlProviders);
    const provider = await respuesta.json();
    const search = document.getElementById('search').value;
    const ordersSearch = await provider.filter(provider => provider.product.includes(search) || provider.name.includes(search));
  
    if(ordersSearch.length > 0){
      setProveedores({
        hayProveedores: true,
        data : ordersSearch
      })  
    }
  } 

  const handleDelete = async(id) => {
    swal({
      title: "Estas seguro de eliminar el proveedor?",
      text: "se eliminara permanentemente",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("El proveedor ha sido eliminado", {
          icon: "success",
        });
        fetch(_urlProviders + "/delete/" + id, {
          method: 'DELETE'
        })
        setProveedores(proveedores.data.filter(provider => provider._id !== id));
        getProveedores();
      }
    });

  }

  
    const paramsId = (id) => {
      window.location.href = "/providers/" + id;
    }
  

    const info = () => {swal("Buscador", "Para buscar un proveedor por nombre o por código, escriba en el campo de texto el producto tal cual se guardo en la base de datos.", "info" );}




  useEffect(() => {
    getProveedores();

  }, [])

  return (
    <div>  
      <div className="cont-search">
          <h1 className='titulo-lista-tareas'>Lista de Proveedores</h1>
          <div className='div-search'>
            <h5>Busca tu producto..</h5>
            <input className='search' autoFocus type="text" id="search" placeholder="Buscar" onChange={searchOrders}/>
            <button className='btn-info' onClick={info}><img src={infoIMG} alt=""/></button>
          </div>
       </div>
      
{  
          
        proveedores.hayProveedores ?
          
        <div className="datatable-container">
          <table className="datatable">
            <thead>
              <tr>
                <th>Nº</th>
                <th>Producto</th>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
    
              <tbody>
                {
                  proveedores.data.map((proveedor, index) => ( 
                    
                    
                    <tr key={index}>
                      <td className='numeros'>{index + 1}</td>
                      <td>{proveedor.product}</td>
                      <td>{proveedor.name}</td>
                      <td>{proveedor.direction}</td>
                      <td>{proveedor.telefono}</td>
                      <td>{proveedor.email}</td>
                      <td>{proveedor.cantidadproduct} Unidades</td>
                      
                      <td><button onClick={()=>handleDelete(proveedor.id)} className='eliminar'>Eliminar</button><button onClick={()=> paramsId(proveedor.id)} className='editar'>Editar</button></td>

                    </tr>
                  

                ))
                }
                </tbody>
              
        </table>
        </div> 
              :
              <div>
                <h1>No hay proveedores</h1>
              </div>
            
        
      }
      </div>  

  )
}
