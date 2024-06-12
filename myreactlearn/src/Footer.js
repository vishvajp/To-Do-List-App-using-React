import React from "react";

const Footer = ({ length }) => {
  return (
    <footer>
      {length} {length === 1 ? "thing" : "things"} we have to do today
    </footer>
  );
};
export default Footer;
