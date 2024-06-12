import React from "react";
import { FaTrash } from "react-icons/fa";
const LineItems = ({ item, handleClick, handleDelete }) => {
  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => handleClick(item.id)}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleClick(item.id)}
      >
        {item.item}
      </label>
      <FaTrash
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default LineItems;
