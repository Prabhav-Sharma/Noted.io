import React from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from ".";
function TopBar() {
  return (
    <nav className=" bg-stone-900 w-full ">
      <Link to="/">
        <img
          className="w-32 ml-8 ease-in duration-200 hover:scale-110 hover:cursor-pointer"
          src="https://res.cloudinary.com/carsmart/image/upload/v1652716327/Notes/Noted.io-removebg-preview_yd5uft.png"
          alt="Noted.io"
        />
      </Link>
      <LogoutButton />
    </nav>
  );
}

export default TopBar;
