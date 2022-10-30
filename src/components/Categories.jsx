import React, { useState } from 'react'

const Categories = ({ value, onClickCategory }) => {

  const categories = [
    'All',
    'Meat',
    'Vegetarian',
    'Grill',
    'Chili'
  ]

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories;