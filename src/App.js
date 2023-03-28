import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Context from "./Context";
import Carrito from "./views/Carrito";
import Home from "./views/Home";
import PizzaDetalle from "./views/PizzaDetalle";

function App() {

  const endpoint = "/pizzas.json";
  const [total, setTotal] = useState(0);
  const [carritoList, setCarritoList] = useState([]);
  const [pizzasList, setPizzasList] = useState([]);

  //Funciones se agregan al context provider ya que se usan en distintos componentes del sitio.
  const calcularTotal = (carritoListNew) => {
    let totalActual = 0;

    carritoListNew.forEach((p) => {
      totalActual = totalActual + (p.pizza.price * p.cantidad);
    });

    return totalActual;
  }

  const addCart = (pizza) => {

    const findProduct = carritoList.findIndex(p => p.pizza.id === pizza.id);
    const pizzaSelected = pizzasList.find(p => p.id === pizza.id);
    const pizzatocart = { pizza: pizzaSelected, cantidad: 1 };

    if (findProduct >= 0) {
      carritoList[findProduct].cantidad = carritoList[findProduct].cantidad + 1;
      setCarritoList([...carritoList]);
      setTotal(calcularTotal(carritoList));
    } else {
      setCarritoList([...carritoList, pizzatocart]);
      setTotal(calcularTotal([...carritoList, pizzatocart]));
    }
  }

  const removeCart = (pizza) => {
    const findProduct = carritoList.findIndex(p => p.pizza.id === pizza.id);

    if (findProduct >= 0) {
      carritoList[findProduct].cantidad = carritoList[findProduct].cantidad - 1;

      if (carritoList[findProduct].cantidad >= 1) {
        setCarritoList([...carritoList]);
        setTotal(calcularTotal(carritoList));
      } else {
        const newCarrito = [...carritoList];
        newCarrito.splice(findProduct, 1);
        console.log("deletecarrito", newCarrito);
        setCarritoList(newCarrito);
        setTotal(calcularTotal(newCarrito));
      }
    }
  }

  const sharePizzaData = { total, setTotal, pizzasList, setPizzasList, carritoList, setCarritoList, addCart, removeCart };

  const getPizzasList = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();

    setPizzasList(data);
  };

  useEffect(() => {
    getPizzasList();
  }, []);

  return (
    <div className="App">
      <Context.Provider value={sharePizzaData}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/home" replace />}
            />
            <Route path='/home' element={<Home />} />
            <Route path='/pizza/:idPizza' element={<PizzaDetalle />} />
            <Route path='/carrito' element={<Carrito />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
