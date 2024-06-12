import React from "react";

import LineItems from "./LineItems";

const ItemsList = ({ items, handleClick, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItems
          item={item}
          key={item.id}
          handleClick={handleClick}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};
export default ItemsList;
