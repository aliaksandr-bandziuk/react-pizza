import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>Basket is empty <icon>😕</icon></h2>
        <p>
          Probably you don't added any pizza to basket. You have to go to main page for order.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" class="button button--black">
          <span>Go to main page</span>
        </Link>
      </div>
    </>
  )
}

export default CartEmpty;