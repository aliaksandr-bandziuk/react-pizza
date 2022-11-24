import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {

  const [pizza, setPizza] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://635bdcab8aa87edd91532385.mockapi.io/items/' + id);
        setPizza(data);
        } catch (error) {
          alert('Error to reseived. Redirect to main page.');
          navigate('/');
        }
      }
      fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} €</h4>
    </div>
  )
}

export default FullPizza;