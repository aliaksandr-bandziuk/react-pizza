import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../App';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { sortList } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from "../components/Pizzablock/PizzaBlock";
import { Skeleton } from "../components/Pizzablock/Skeleton";
import Pagination from '../components/Pagination/Pagination';

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizza);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  
  const { searchValue } = useContext(SearchContext);
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  const onCangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
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
    // axios
    //   .get(`https://635bdcab8aa87edd91532385.mockapi.io/items?page=${currentPage}&limit=6&${
    //   categoryId > 0 ? `category=${categoryId}` : ''
    //   }&sortBy=${sortBy}&order=${order}${search}`)
    //   .then(res => {
    //     setItems(res.data)
    //     setIsLoading(false)
    //   })

    // вариант получения через async/await


    // window.scrollTo(0, 0);

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
          categoryId
        })
      );

    window.scrollTo(0, 0);
  }

  // если изменили параметры и был первый рендер, то проверяем
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage
      });
      
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortType === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getPizzas();

    // if (!isSearch.current) {
    //   getPizzas();
    // }

    // isSearch.current = false;

  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  // разобраться здесь с роутингом по картинке
  // const pizzas = items.map((obj) => 
  //   <Link key={obj.id} to={`/pizza/${obj.id}`}>
  //     <PizzaBlock {...obj} />
  //   </Link>);
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
      {
        status === 'error' ? (
          <div className='content__error-info'>
            <h2>An error has occurred</h2>
            <p>Sorry, we were unable to receive the products. Try again later</p>
          </div>
        ) : (
          <div className="content__items">
            {
              status === 'loading' ? skeletons : pizzas 
            }
          </div>
        )
      }

      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home;