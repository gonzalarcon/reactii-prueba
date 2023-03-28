import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Context from '../Context';
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const { pizzasList, addCart } = useContext(Context);


  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }



  const navigate = useNavigate();


  return (
    <div className="home">
      <Header></Header>

      <div className='container'>
        <Row className='row-home'>
          {pizzasList.map((pizza) => (
            <Col md={3} key={pizza.id}>
              <Card className='home-card'>
                <Card.Img variant="top" src={pizza.img} />
                <Card.Body>
                  <Card.Title>{capitalize(pizza.name)}</Card.Title>
                  <hr />
                  <Card.Text>
                    <h5>Ingredientes:</h5>
                    <ul>
                      {pizza.ingredients.map((ingredient, idx) => (
                        <li key={idx}>
                          🍕 {capitalize(ingredient)}
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='bg-transparent'>
                  <h2 className='price-home'>$ {pizza.price.toLocaleString("es-CL")}</h2>
                  <div className='buttons-home'>
                    <Button variant="info" onClick={() => navigate(`/pizza/${pizza.id}`)}>Ver Mas 👀</Button>
                    <Button variant="danger" onClick={() => addCart(pizza)}>Añadir 🛒</Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>



    </div>
  )
}

export default Home