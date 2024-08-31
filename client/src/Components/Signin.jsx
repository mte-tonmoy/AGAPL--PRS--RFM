import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthProvider";
import Swal from "sweetalert2";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

import MovingComponent from "react-moving-text";
import logo from "../assets/logo.png";
// import useAdmin from "../hooks/useAdmin";
// import useStoreMan from "../hooks/useStoreMan";
// import useEmployee from "../hooks/useEmployee";
// import useManager from "../hooks/useManager";

const Signin = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [isAdmin] = useAdmin();
  // const [isStoreMan] = useStoreMan();
  // const [isEmployee] = useEmployee();
  // const [isManager] = useManager();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        // if (isStoreMan) {
        //   navigate("/addProduct");
        // } else if (isEmployee) {
        //   navigate("/request");
        // } else if (isAdmin) {
        //   navigate("/admin");
        // } else if (isManager) {
        //   navigate("/requisition");
        // }

        navigate("/home");

        window.location.reload();
        Swal.fire("Welcome!", "Logged in successfully", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });

    console.log(email, password);
  };

  return (
    <>
      <div className="flex min-h-[100vh] items-center flex-1 flex-col justify-center px-6 py-auto lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img className="mx-auto h-20 w-auto" src={logo} alt="" />
          <MovingComponent
            type="fadeInFromLeft"
            duration="3000ms"
            delay="0s"
            direction="normal"
            timing="ease"
            iteration="1"
            fillMode="none"
            className="text-center text-2xl font-bold leading-9 tracking-wide text-gray-800 "
          >
            <span className="text-lime-500"> Product </span>
            <span className="text-sky-500"> Requisition </span>
            <span className="text-pink-500"> System</span>
          </MovingComponent>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form
            onSubmit={handleRegister}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  name="email"
                  type="email"
                  className="grow"
                  placeholder="example@acigodrej.com"
                />
              </label>
            </div>
            <div className="mt-2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="Password"
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2"
                >
                  {showPassword ? (
                    <FaRegEye />

                  ) : (
                    <FaRegEyeSlash />

                  )}
                </button>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
