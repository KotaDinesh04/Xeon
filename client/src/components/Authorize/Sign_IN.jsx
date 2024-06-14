import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import "./Sign_IN.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "https://xeon-two.vercel.app";
const Sign_IN = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(""); //state for error message

  const navigate = useNavigate();
  const onSignUpClick = () => {
    navigate("/signup");
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", { email, password })

      .then((res) => {
        console.log("login: " + res.data);
        // Extracting token from res
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token); // Store token in local storage
          navigate("/home"); // Redirect to home page
        } else {
          setErrorMessage(" " + res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occured: " + err);
      });
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-14 w-auto"
          src="/Noe.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {errorMessage && (
            <div className="text-danger mt-4 ">{errorMessage}</div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {/* <Link to="/Home" style={{color:"white"}}> Sign in </Link> */}
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={onSignUpClick}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Sign_IN;
