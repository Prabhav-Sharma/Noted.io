import React from "react";
import { Link } from "react-router-dom";
function Navigation() {
  return (
    <nav className="p-1 pb-2 bg-stone-900 w-full ">
      <Link to="/">
        <img
          className="w-28 lg:w-40 ml-8 ease-in duration-200 text-3xl md:text-5xl  hover:scale-110 hover:cursor-pointer"
          src="https://res.cloudinary.com/carsmart/image/upload/v1649935998/Notes/Noted.io__2_-removebg-preview_1_tabb7f.png"
          alt="Noted.io"
        />
      </Link>
    </nav>
  );
}

export default Navigation;
