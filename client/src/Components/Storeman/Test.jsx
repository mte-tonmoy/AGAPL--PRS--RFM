import React, { useEffect, useState } from "react";

const Test = () => {
  const [users, setUsers] = useState([]);
  const [request, setRequest] = useState([]);
  useEffect(() => {
    fetch("https://prs-server-vogi.onrender.com/allUser")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);
  useEffect(() => {
    fetch("https://prs-server-vogi.onrender.com/allRequest")
      .then((res) => res.json())
      .then((data) => setRequest(data));
  }, [request]);

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const password = form.password.value;

    event.target.reset();

    const testUserData = {
      name,
      password,
    };

    fetch("https://prs-server-vogi.onrender.com/testUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testUserData),
    })
      .then((res) => res.json())
      .then((data) => {});
  };
  return (
    <div>
      <h1>
        {users.map((user, index) => (
          <ul>{user.name}</ul>
        ))}
      </h1>
      <span>
        <ul className="bg-green-50">
          {request.map((www) => (
            <ul>{www.productName}</ul>
          ))}
        </ul>
      </span>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleAddUser}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="name"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
