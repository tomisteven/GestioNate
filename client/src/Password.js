import React from 'react'
import "./login.css";
import { _urlUsers } from './configURL';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';


export default function Password() {
  
  const [users, setUsers] = useState({
    usuarios: []
  });

  const getUsers = async () => {
    
      const respuesta = await fetch(_urlUsers + '/getusers');
      const data = await respuesta.json();
      //console.log(data)

      setUsers(data);

      return data;
     
  }
  
  const validation = async (e) =>{
    e.preventDefault();

   
    const {
      name,
      contraseña
    } = e.target;
    
    console.log(name.value, contraseña.value);
    
    //buscamos dentro de usuarios si hay coincidencia
    getUsers();

     const usuario =  users.find(user => user.name === name.value && user.contraseña === contraseña.value);
     

     if( usuario ){
      await swal("Bienvenido", "Has ingresado correctamente", "success");
      window.location.href = '/panel';
    }
    else{
      await swal("Error", "Usuario o contraseña incorrectos", "error");
      //redireccionar al panel 
    } 
  }
  


 
  const onChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }


  useEffect(() => {
    
    getUsers();
  }, [])

  return (
    <div>
            <div className="login-box">
                <img  className="avatar"  src="https://telework-time.app/wp-content/uploads/2020/09/icon512.png" alt=""/>
                <h1>Acceder al dashboard</h1>
                <div className="textbox">
                    <form onSubmit={validation}>
                    <label >Username</label>
                    <input type="text" required placeholder="Enter Username" name='name' onChange={onChange}/>
                    <label >Password</label>
                    <input type="password" required name='contraseña' onChange={onChange} placeholder="Enter Password"/>
                    <input type="submit" value="Log In"/>
                    </form>
                </div>
            </div>

    </div>
    
  )
}






