import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <h2 className="text-2xl font-bold text-gray-800">
        <Link to="/">DeepMate</Link>
      </h2>
      <Nav />
    </header>
  );
};

export default Header;
