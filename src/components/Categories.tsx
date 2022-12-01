import React from 'react';

type CategoriesProps = {
  value: number;
  onCangeCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ value, onCangeCategory }) => {

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
            onClick={() => onCangeCategory(index)}
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