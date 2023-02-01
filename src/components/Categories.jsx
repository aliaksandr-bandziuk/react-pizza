import React from "react";

function Categories({ value, onChangeCategory }) {
  const titleCategories = [
    'All',
    'Meat',
    'Vegetarian',
    'Grill',
    'Chili'
  ];

  return (
    <div className="categories">
      <ul>
        {titleCategories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
