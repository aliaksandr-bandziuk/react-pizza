import React, { useState } from 'react'

const Categories = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    'All',
    'Meat',
    'Vegetarian',
    'Grill',
    'Chili'
  ]

  const onClickCategory = (index) => {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={value}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? "active" : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories;