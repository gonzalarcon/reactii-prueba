import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Context from '../Context'

const Carrito = () => {


    const { carritoList, total, addCart, removeCart } = useContext(Context);

    const capitalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }


    const navigate = useNavigate();

    return (
        <div className='container'>
            <Button variant="warning" className='mt-4' onClick={() => navigate(`/home`)}> 🔙 Volver</Button>
            <div className="bg-light mt-3 rounded p-2">
                <h2 className='p-4'>Detalle del Pedido: </h2>

                {carritoList?.map((p, idx) => (
                    <div className="carrito-info" key={idx}>
                        <Row  className="bg-white rounded row-carrito ">
                            <Col md={8}>
                                <img src={p.pizza.img} alt={p.pizza.name} className="w-25"></img>
                                <span className='pizza-carrito'>{capitalize(p.pizza.name)}</span>
                            </Col>
                            <Col md={2}>
                                <h2>$ {(p.pizza.price * p.cantidad).toLocaleString("es-CL")}</h2>
                            </Col>
                            <Col md={2}>
                                <div className="carrito-buttons">
                                    <Button variant="primary" onClick={() => removeCart(p.pizza)} >➖</Button>
                                    <span className='carrito-cantidad'>{p.cantidad}</span>
                                    <Button variant="danger" onClick={() => addCart(p.pizza)}>➕</Button>
                                </div>
                            </Col>
                            <hr />
                        </Row>
                    </div>
                ))}

                <div className='pay-button'>
                    <h2 className='p-4'>Total: <span>${total.toLocaleString("es-CL")}</span> </h2>
                    <Button variant="success" > 💲Ir a Pagar</Button>
                </div>

            </div>
        </div>
    )
}

export default Carrito