import React from 'react';
import { _urlProviders} from '../../configURL';
import { useState, useEffect } from 'react';





export default function EditProvider() {
    let location = window.location.href;
    let idprovider = location.split('/')[4];

    const [provider, setProvider] = useState({
        _id: idprovider,
        product: '',
        description: '',
        telefono: '',
        direction: '',
        email: '',
        name:"",
        cantidadproduct: '',
    });

    const getProvider = async () => {
        
        const respuesta = await fetch(_urlProviders + "/" + idprovider);
        const Provider = await respuesta.json();

        setProvider({
            _id: idprovider,
            product: Provider.product,
            description: Provider.description,
            telefono: Provider.telefono,
            direction: Provider.direction,
            email: Provider.email,
            name:Provider.name,
            cantidadproduct: Provider.cantidadproduct

        });
        console.log(Provider);
    }

    const onChange = e => {
        setProvider({
            ...provider,
            [e.target.name]: e.target.value
        });

        console.log(provider);
    }
    const editProvider = async (e) => {
        e.preventDefault();
        const respuesta = await fetch(_urlProviders + "/edit/" + idprovider, {
            method: 'PUT',
            body: JSON.stringify(provider),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await respuesta.json();
        console.log(data);
        console.log("Editado");

        window.location.href = "/providers";
    }

    useEffect(() => {
        getProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return <div>
      
  <h1 className='proveedor-name'>Editar proveedor </h1>
  <div className="contact-wrapper animated bounceInUp">
        <div className="contact-form">
            
            <form onSubmit={editProvider}>
                <p>
                    <label>Nombre</label>
                    <input type="text" value={provider.name} className='input-provider' onChange={onChange} name="name"/>
                </p>
                <p>
                    <label>Producto</label>
                    <input type="text" value={provider.product} className='input-provider' onChange={onChange} name="product"/>
                </p>
                <p>
                    <label>Telefono</label>
                    <input type="number" value={provider.telefono} className='input-provider' placeholder='+5411665544' onChange={onChange} name="telefono"/>
                </p>
                <p>
                    <label>Email</label>
                    <input className='input-provider' value={provider.email} type="email" placeholder='Holamundo@hotmail.com' onChange={onChange} name="email"/>
                </p>
                <p>
                    <label>Direction</label>
                    <input className='input-provider' value={provider.direction} type="text" onChange={onChange} name="direction"/>
                </p>
                <p>
                   <label>Cantidad</label> 
                    <input name="cantidadproduct" value={provider.cantidadproduct} className='input-provider' onChange={onChange} rows="3"></input>
                    </p>
                <p className="block">
                    <button type='submit' className="btn-provider">
                        Editar Proveedor
                    </button>
                </p>
            </form>
    </div>

</div>    



</div>
}
