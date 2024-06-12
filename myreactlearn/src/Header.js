import React from "react";

const Header = (Props) => {
  return (
    <div>
      <header>
        <h1>{Props.title}</h1>
      </header>
    </div>
  );
};

Header.defaultProps = {
  title: "TO DO LIST",
};
export default Header;
