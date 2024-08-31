import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import MovingComponent from "react-moving-text";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://prs-server-vogi.onrender.com/allUser")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  const handleMakeManager = (user) => {
    fetch(`https://prs-server-vogi.onrender.com/makeManager/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Manager Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeStoreMan = (user) => {
    fetch(`https://prs-server-vogi.onrender.com/makeStoreMan/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is Store Man Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeUser = (user) => {
    fetch(`https://prs-server-vogi.onrender.com/makeUser/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is User Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div>
      <MovingComponent
        type="fadeInFromLeft"
        duration="1000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="1"
        fillMode="none"
        className="tracking-wider text-2xl text-bold text-gray-700 rounded-lg inline-block  py-1"
      >
        Manage User
      </MovingComponent>
      <h3 className="text-2xl font-semibold my-4 text-center tracking-widest text-gray-700 ">
        Total Users: {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table border table-zebra w-11/12 mx-auto">
          {/* head */}
          <thead>
            <tr className="my-color1">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td className="font-semibold tracking-wide">{user.name}</td>
                <td className="font-semibold tracking-wider">{user.email}</td>
                <td className="font-semibold tracking-wide">{user.role}</td>
                <td>
                  {user.role === "Store" ? (
                    <div className="my-text font-semibold text-blue-500"></div>
                  ) : user.role !== "Admin" ? (
                    <button
                      onClick={() => handleMakeStoreMan(user)}
                      className="btn btn-sm bg-sky-500 text-white h-fit p-2"
                    >
                      <FaUserShield></FaUserShield>
                      Make Store Man
                    </button>
                  ) : null}
                </td>

                <td>
                  {user.role === "Manager" ? (
                    <div className="my-text font-semibold text-green-500"></div>
                  ) : user.role !== "Admin" ? (
                    <button
                      onClick={() => handleMakeManager(user)}
                      className="btn btn-sm bg-green-500 text-white h-fit p-2"
                    >
                      <FaUserShield></FaUserShield>
                      Make Manager
                    </button>
                  ) : null}
                </td>

                <td>
                  {user.role === "User" ? (
                    <div className="my-text font-semibold text-orange-500"></div>
                  ) : user.role !== "Admin" ? (
                    <button
                      onClick={() => handleMakeUser(user)}
                      className="btn btn-sm bg-orange-400 text-white h-fit p-2"
                    >
                      <FaUserShield></FaUserShield>
                      Make User
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
