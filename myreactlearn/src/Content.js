import React from "react";
import ItemsList from "./ItemsList";

const Content = ({
  items,
  handleClick,
  handleDelete,
  setfetchError,
  fetchError,
}) => {
  return (
    <main>
      <p> {fetchError ? fetchError : ""}</p>
      {items.length ? (
        <ItemsList
          items={items}
          handleClick={handleClick}
          handleDelete={handleDelete}
        />
      ) : (
        <p
          style={{
            backgroundColor: "black",
            color: "white",
            fontStyle: "strong",
          }}
        >
          YOUR TO DO LIST IS EMPTY
        </p>
      )}
    </main>
  );
};

export default Content;
