import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/Pizzablock/PizzaBlock";
import { Skeleton } from "../components/Pizzablock/Skeleton";
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'popular  🠗',
    sortProperty: 'rating'
  });

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(`https://635bdcab8aa87edd91532385.mockapi.io/items?page=${currentPage}&limit=6&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortBy}&order=${order}${search}`)
    .then(res => res.json())
    .then(arr => {
      setItems(arr)
      setIsLoading(false)
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categoryId} 
          onCangeCategory={(index) => setCategoryId(index)} 
        />
        <Sort 
          value={sortType}
          onChangeSort={(index) => setSortType(index)}
        />
      </div>
      <h2 className="content__title">Our Pizza</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : pizzas 
        }
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  )
}

export default Home;