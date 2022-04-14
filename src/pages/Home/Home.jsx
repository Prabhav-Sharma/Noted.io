import React from "react";
function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-around items-center">
      <div className="flex flex-col gap-8 items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-caveat animate-bounce">
          Taking notes has never been easier!
        </h1>
        <span className="flex flex-row gap-4 md:gap-8">
          <button className="p-3 w-32 sm:w-36 md:w-44 2xl:w-48 text-base sm:text-lg md:text-xl lg:text-2xl ease-in-out duration-300 font-neuton font-medium hover:bg-cyan-600 bg-cyan-500 rounded-lg text-white">
            Get Started
          </button>
          <button className="p-3 w-32 sm:w-36 md:w-44 2xl:w-48 text-base sm:text-lg md:text-xl lg:text-2xl font-medium ease-in-out font-neuton duration-300 hover:bg-rose-500 bg-rose-400 rounded-lg text-white">
            Login
          </button>
        </span>
      </div>
      <img
        className="w-3/5 md:w-2/6 lg:w-2/5"
        src="https://res.cloudinary.com/carsmart/image/upload/v1649929257/Notes/undraw_notebook_re_id0r_1_w03pep.svg"
      />
    </main>
  );
}

export default Home;
