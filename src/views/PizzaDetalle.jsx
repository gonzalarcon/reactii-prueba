import React, { useContext } from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../Context'

const PizzaDetalle = () => {

    const { pizzasList, addCart } = useContext(Context);
    const { idPizza } = useParams();
    const pizzaSelected = pizzasList.find((p) => p.id === idPizza);

    const capitalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const navigate = useNavigate();

    return (
        <div className="container">
            <Button variant="warning" className='mt-4' onClick={() => navigate(`/home`)}> 🔙 Volver</Button>

            <Row className='mt-3 justify-content-md-center row-detalle'>
                <Col xs lg={6}>
                    <img src={pizzaSelected.img} alt={pizzaSelected.name}></img>
                </Col>
                <Col xs lg={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{capitalize(pizzaSelected.name)}</Card.Title>
                            <hr />
                            <Card.Text>
                                {pizzaSelected.desc}
                            </Card.Text>
                            <Card.Text>
                                <h5>Ingredientes:</h5>
                                <ul>
                                    {pizzaSelected.ingredients.map((ingredient, idx) => (
                                        <li key={idx}>
                                            🍕 {capitalize(ingredient)}
                                        </li>
                                    ))}
                                </ul>
                            </Card.Text>
                            <Card.Text>
                            <div className='bottom-detail'>
                                <h4>$ {pizzaSelected.price.toLocaleString("es-CL")}</h4>
                                <Button variant="danger" onClick={() => addCart(pizzaSelected)}>Añadir 🛒</Button>
                            </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PizzaDetalle