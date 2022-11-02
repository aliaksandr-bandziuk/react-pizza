import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/Pizzablock/PizzaBlock";
import { Skeleton } from "../components/Pizzablock/Skeleton";
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onCangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  }

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // вариант получения через fetch
    // fetch(`https://635bdcab8aa87edd91532385.mockapi.io/items?page=${currentPage}&limit=6&${
    //   categoryId > 0 ? `category=${categoryId}` : ''
    // }&sortBy=${sortBy}&order=${order}${search}`)
    // .then(res => res.json())
    // .then(arr => {
    //   setItems(arr)
    //   setIsLoading(false)
    // });

    // вариант получения через axios
    axios
      .get(`https://635bdcab8aa87edd91532385.mockapi.io/items?page=${currentPage}&limit=6&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          value={categoryId} 
          onCangeCategory={onCangeCategory} 
        />
        <Sort />
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