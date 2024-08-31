import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import MovingComponent from "react-moving-text";
import logo from "../assets/logo.png";
import { useState } from "react";
import { AuthContext } from "./../AuthContext/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "./../hooks/useAdmin";
import useStoreMan from "./../hooks/useStoreMan";
import useEmployee from "../hooks/useEmployee";
import useManager from "../hooks/useManager";

const NavBar = () => {
  const [open, setOpen] = useState(true);
  const { user, logOut } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");
  const [isAdmin] = useAdmin();
  const [isStoreMan] = useStoreMan();
  const [isEmployee] = useEmployee();
  const [isManager] = useManager();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <div className="fixed w-full bg-[#FAFAFA] z-[1] ">
      <div className="navbar ">
        <div className="navbar-start ">
          <div className="dropdown ">
            <div
              onClick={() => setOpen(!open)}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3 ${
                open ? "" : "hidden"
              }`}
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[2px]" : isPending ? "pending" : ""
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/table"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/home">
            <div>
              <img
                className="h-10 w-auto md:w-auto mb-[0.38rem] md:mb-0 sm:h-8 ml-20"
                src={logo}
                alt="website logo"
              />
              <MovingComponent
                type="spin"
                duration="3000ms"
                delay="0s"
                direction="normal"
                timing="ease"
                iteration="1"
                fillMode="none"
                className="text-gray-300 items-center tracking-widest font-semibold"
              >
                <span className="text-lime-500">Product</span>
                <span className="text-sky-500"> Requisition</span>
                <span className="text-pink-500"> System</span>
              </MovingComponent>
            </div>
          </Link>
        </div>
        <ul className="menu menu-horizontal px-1 text-[15px] space-x-4">
          <li>
            <NavLink
              to="/home"
              className={({ isActive, isPending }) =>
                isActive ? "border-b-[2px]" : isPending ? "pending" : ""
              }
            >
              Home
            </NavLink>
          </li>
          {isStoreMan && (
            <>
              <li>
                <NavLink
                  to="/addProduct"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[2px]" : isPending ? "pending" : ""
                  }
                >
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addPr"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[2px]" : isPending ? "pending" : ""
                  }
                >
                  Add PR
                </NavLink>
              </li>
            </>
          )}
          {isManager && (
            <li>
              <NavLink
                to="/requisition"
                className={({ isActive, isPending }) =>
                  isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                }
              >
                Requisition
              </NavLink>
            </li>
          )}
          {isEmployee && (
            <>
              <li>
                <NavLink
                  to="/request"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                  }
                >
                  Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myRequest"
                  className={({ isActive, isPending }) =>
                    isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                  }
                >
                  My Request
                </NavLink>
              </li>
            </>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="/admin"
                className={({ isActive, isPending }) =>
                  isActive ? "border-b-[1px]" : isPending ? "pending" : ""
                }
              >
                Admin Panel
              </NavLink>
            </li>
          )}
        </ul>{" "}
        <div className="navbar-center hidden lg:flex bg-white px-12 rounded-[2rem] "></div>
        <div className="navbar-end">
          {/* <button
            className="btn-neutral btn bg-white md:text-[15px] text-slate-700 hover:text-white px-8 rounded-[2rem] border-[1px] border-gray-200 shadow-none"
            onClick={handleLogOut}
          >
            Sign Out
          </button> */}

          {user ? (
            <>
              <Link to="/">
                <button
                  className="btn-neutral btn bg-white md:text-[15px] text-slate-700 hover:text-white px-8 rounded-[2rem] border-[1px] border-gray-200 shadow-none"
                  onClick={handleLogOut}
                >
                  Sign Out
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>{userRole}</div>
    </div>
  );
};

export default NavBar;
