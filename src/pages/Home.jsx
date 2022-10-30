import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/Pizzablock/PizzaBlock";
import { Skeleton } from "../components/Pizzablock/Skeleton";

const Home = () => {
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://635bdcab8aa87edd91532385.mockapi.io/items?category=' + categoryId)
    .then(res => res.json())
    .then(arr => {
      setItems(arr)
      setIsLoading(false)
    });
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categoryId} 
          onClickCategory={(index) => setCategoryId(index)} 
        />
        <Sort />
      </div>
      <h2 className="content__title">Our Pizza</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        }
      </div>
    </div>
  )
}

export default Home;