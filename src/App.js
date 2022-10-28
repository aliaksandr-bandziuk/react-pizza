import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/Pizzablock/PizzaBlock";
import { Skeleton } from "./components/Pizzablock/Skeleton";

import './scss/app.scss';

function App() {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://635bdcab8aa87edd91532385.mockapi.io/items')
    .then(res => res.json())
    .then(arr => {
      setItems(arr)
      setIsLoading(false)
    })
  }, []);



  return (
    <div className="App">
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Our Pizza</h2>
          <div className="content__items">
            {
              isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
