import React from "react";
import { AuthModal } from "../components";
import { useToggle, useDocumentTitle } from "../Hooks";
import { useAuth } from "../contexts/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function Landing() {
  const { toggle: authModalToggle, setToggle: setAuthModalToggle } =
    useToggle();

  const {
    authState: { isAuthenticated },
  } = useAuth();

  const navigate = useNavigate();

  useDocumentTitle("Welcome");

  const CTAButton = isAuthenticated ? (
    <button
      className="p-3 w-32 sm:w-36 md:w-44 2xl:w-48 text-base sm:text-lg md:text-xl font-normal ease-in-out duration-300 hover:bg-cyan-600 bg-cyan-500 rounded-lg text-white"
      onClick={() => navigate("/home")}
    >
      Start Writing..
    </button>
  ) : (
    <button
      className="p-3 w-32 sm:w-36 md:w-44 2xl:w-48 text-base sm:text-lg md:text-xl font-normal ease-in-out duration-300 hover:bg-cyan-600 bg-cyan-500 rounded-lg text-white"
      onClick={() => setAuthModalToggle(true)}
    >
      Get Started
    </button>
  );
  return (
    <>
      <AuthModal show={{ authModalToggle, setAuthModalToggle }} />
      <main
        id="home"
        className="flex flex-col max-w-full md:flex-row bg-indigo-50 justify-around items-center"
      >
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-caveat animate-bounce">
            Taking notes has never been easier!
          </h1>
          {CTAButton}
        </div>
        <img
          className="w-3/5 md:w-2/6 lg:w-2/5"
          src="https://res.cloudinary.com/carsmart/image/upload/v1649929257/Notes/undraw_notebook_re_id0r_1_w03pep.svg"
        />
      </main>
    </>
  );
}

export default Landing;
