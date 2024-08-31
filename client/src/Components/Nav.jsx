import React, { useContext, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { FaPenFancy } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import useAdmin from "./../hooks/useAdmin";
import useStoreMan from "./../hooks/useStoreMan";
import useEmployee from "../hooks/useEmployee";
import useManager from "../hooks/useManager";
import logo from "../assets/logo.png";
import { GrStakeholder } from "react-icons/gr";

import Swal from "sweetalert2";
import { FaStore } from "react-icons/fa";
import { GrDocumentConfig } from "react-icons/gr";

import { BiSolidPurchaseTag } from "react-icons/bi";
import { AuthContext } from "./../AuthContext/AuthProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useUserData from "../hooks/useUserData";

const Nav = () => {
  const [userData, refetch] = useUserData([]);
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isStoreMan] = useStoreMan();
  const [isEmployee] = useEmployee();
  const [isManager] = useManager();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged Out", "You have been logged out.", "success");
            navigate("/");
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const menus = [
    { name: "Home", link: "/home", icon: AiFillHome },
    isStoreMan
      ? { name: "Add Product", link: "/addProduct", icon: MdAssignmentAdd }
      : undefined,
    isStoreMan
      ? { name: "Add PR", link: "/addPr", icon: FaPenFancy }
      : undefined,
    isStoreMan
      ? { name: "Add Quantity", link: "/deliverProduct", icon: GrStakeholder  }
      : undefined,
    isStoreMan
      ? { name: "All Request", link: "/prAdded", icon: FaTasks }
      : undefined,
    isManager
      ? {
          name: "Purchase Requisition",
          link: "/purchaseRequisition",
          icon: BiSolidPurchaseTag ,
        }
      : undefined,
    isManager
      ? {
          name: "Store Requisition",
          link: "/storeRequisition",
          icon: FaStore ,
        }
      : undefined,
    isManager
      ? {
          name: "All Requisition",
          link: "/productUpdate",
          icon: GrDocumentConfig ,
        }
      : undefined,
    isEmployee
      ? {
          name: "Product List",
          link: "/purchaseRequest",
          icon: MdOutlinePendingActions,
        }
      : undefined,
    // isEmployee
    //   ? {
    //       name: "Store Request",
    //       link: "/storeRequest",
    //       icon: AiFillDashboard,
    //     }
    //   : undefined,
    isEmployee
      ? {
          name: "My Request List",
          link: "/myRequest",
          icon: AiFillDashboard,
        }
      : undefined,
    isAdmin ? { name: "Admin", link: "/admin", icon: RiAdminFill } : undefined,
    user
      ? { name: "Account", link: "/profile", icon: AiOutlineUser }
      : undefined,
  ].filter((menu) => menu !== undefined); // Filter out undefined values

  return (
    <section className="pb-20">
      <div
        className={`fixed z-10 bg-gray-800 min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between items-center">
          {open && (
            <div className="py-3 w-full flex justify-between">
              <div className="w-full">
                <img
                  className="sm:h-10 sm:w-40 hidden sm:block mx-auto"
                  src={logo}
                  alt="website logo"
                />
                <p className="hidden sm:block tracking-wide font-bold text-lg text-center">
                  <br />
                  <span className="text-lime-500">P</span>
                  <span className="text-sky-500"> R</span>
                  <span className="text-pink-500"> S</span>
                </p>
              </div>
              <HiMenuAlt3
                size={26}
                className="cursor-pointer ms-5"
                onClick={() => setOpen(!open)}
              />
            </div>
          )}
          {!open && (
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              onClick={menu.name === "Sign Out" ? handleLogOut : undefined}
              key={i}
              className={`${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-100 hover:text-indigo-500 rounded-md ${
                location.pathname === menu.link
                  ? "bg-indigo-100  text-indigo-500"
                  : ""
              }`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `.05s`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>

        <div className="w-full absolute bottom-5 left-0  cursor-pointer flex items-center">
          <MdAccountCircle size={28} className={`text-indigo-300 mx-auto ${
              open && "w-2/12"
            }`} />
          {open && user && (
            <div className="leading-4 text-left w-8/12">
              <h4 className="text-sm font-semibold text-white">
                {userData[0]?.name}
              </h4>

              <span className="text-xs text-gray-300">{user.email}</span>
            </div>
          )}
          <FaPowerOff
            title="Sign Out"
            size={24}
            className={` text-green-500 hover:text-red-500 w-2/12  ${
              !open && "hidden"
            }`}
            onClick={handleLogOut}
          />
        </div>
      </div>

      <div
        className={`transition-all px-5 duration-500 ${
          open ? "ml-72" : "ml-16"
        }`}
      >
        <Outlet />
      </div>
    </section>
  );
};

export default Nav;


