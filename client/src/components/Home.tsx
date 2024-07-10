import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white/50 text-black">
      <h1 className="text-5xl font-bold mb-10 drop-shadow-lg">
        Keep grinding!
      </h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-8 py-3 text-lg font-semibold bg-gray-100 text-gray-800 rounded-full shadow-md hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1">
          Login
        </Link>
        <Link
          to="/register"
          className="px-8 py-3 text-lg font-semibold bg-zinc-400 text-gray-800 rounded-full shadow-md hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1">
          Register
        </Link>
        <Link
          to="/todos"
          className="px-8 py-3 text-lg font-semibold bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-300 hover:text-black transition duration-300 ease-in-out transform hover:-translate-y-1">
          Your ToDos
        </Link>
      </div>
    </div>
  );
};

export default Home;
