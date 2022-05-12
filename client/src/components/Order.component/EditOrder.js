import React from 'react';
import { _urlOrders} from '../../configURL';
import { useState, useEffect } from 'react';





export default function EditOrder() {
    let location = window.location.href;
    let idOrder = location.split('/')[4];

    const [order, setOrder] = useState({
        _id: idOrder,
        product: '',
        description: '',
        price: '',
        cantidad: '',
        
    });

    const getOrder = async () => {
        
        const respuesta = await fetch(_urlOrders + "/" + idOrder);
        const Order = await respuesta.json();
        setOrder({
            _id: idOrder,
            product: Order.product,
            description: Order.description,
            price: Order.price,
            cantidad: Order.cantidad
        });
        console.log(Order);
    }

    const onChange = e => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });

        console.log(order);
    }
    const editOrder = async (e) => {
        e.preventDefault();
        const respuesta = await fetch(_urlOrders + "/edit/" + idOrder, {
            method: 'PUT',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await respuesta.json();
        console.log(data);
        console.log("Editado");

        window.location.href = "/orders";
    }

    useEffect(() => {
        getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  return <div>
      
  <h1 className='proveedor-name'>Guardar proveedor</h1>
  <div className="contact-wrapper animated bounceInUp">
        <div className="contact-form">
            
            <form onSubmit={editOrder}>
                <p>
                    <label>Producto</label>
                    <br></br>
                    <input className="order" value={order.product}  type="text" onChange={onChange} name="product"/>
                </p>
                <p>
                    <label>Description</label>
                    <br></br>
                    <input  className="order" value={order.description} type="text" onChange={onChange} name="description"/>
                </p>
                <p>
                    <label>Precio</label>
                    <br></br>
                    <input className="order" value={order.price}  type="number" placeholder='$' onChange={onChange} name="price"/>
                </p>
                <p>
                    <label>Cantidad</label>
                    <br></br>
                    <input className="order" value={order.cantidad} type="number" placeholder='Unidades' onChange={onChange} name="cantidad"/>
                </p>
                
                <p className="block">
                    <button type='submit' className='button-order'>
                        Editar orden
                    </button>
                </p>
            </form>
    </div>

</div>    



</div>
}
