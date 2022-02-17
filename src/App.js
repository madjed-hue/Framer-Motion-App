import { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Base from "./components/Base";
import Home from "./components/Home";
import Order from "./components/Order";
import Toppings from "./components/Toppings";
import { AnimatePresence } from "framer-motion";
import Model from "./components/Modal";

function App() {
  const [pizza, setPizza] = useState({ base: "", toppings: [] });
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const addBase = (base) => {
    setPizza({ ...pizza, base });
  };

  const addTopping = (topping) => {
    let newToppings;
    if (!pizza.toppings.includes(topping)) {
      newToppings = [...pizza.toppings, topping];
    } else {
      newToppings = pizza.toppings.filter((item) => item !== topping);
    }
    setPizza({ ...pizza, toppings: newToppings });
  };
  return (
    <>
      <Header />
      <Model showModal={showModal} setShowModal={setShowModal} />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => setShowModal(false)}
      >
        <Routes location={location} key={location.key}>
          <Route
            exact
            path="/base"
            element={<Base addBase={addBase} pizza={pizza} />}
          />
          <Route
            exact
            path="/toppings"
            element={<Toppings addTopping={addTopping} pizza={pizza} />}
          />
          <Route
            exact
            path="/order"
            element={<Order pizza={pizza} setShowModal={setShowModal} />}
          />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
