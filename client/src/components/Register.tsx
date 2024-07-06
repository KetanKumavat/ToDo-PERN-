import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://todo-pern-n60f.onrender.com/api/v1/user/register",
        {
          username,
          password,
        }
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <div className="bg-transparent p-8 rounded-lg shadow-lg max-w-sm w-full border border-white/5 shadow-neutral-800">
        <div className="text-center mb-8">
          <p className="text-gray-400">Please Login or Register below.</p>
        </div>
        <form onSubmit={userLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Your Username"
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white border-gray-600"
            />
            <label className="block text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border rounded-md bg-gray-700 text-white border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mb-4 mt-10 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Register
          </button>
        </form>
        <p className="text-gray-400">
          Already have an account?
          <Link to="/login" className="text-white">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
