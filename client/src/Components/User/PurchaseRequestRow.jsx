import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthProvider";

const PurchaseRequestRow = ({ product, index }) => {
  const { _id, productName, quantity, unit, description } = product;
  const { user } = useContext(AuthContext);

  const handleAddRequestProductData = (event) => {
    event.preventDefault();
    const form = event.target;
    const status = form.status.value;
    const productName = form.productName.value;
    const quantity = parseInt(form.quantity.value, 10);
    const requestQuantity = parseInt(form.requestQuantity.value, 10);
    const unit = form.unit.value;
    const unitPrice = form.unitPrice.value;
    const remarks = form.remarks.value;

    const userName = user?.displayName;
    const userEmail = user?.email;

    if (status === "Requested for store" && requestQuantity > quantity) {
      alert("Requested quantity exceeds current stock");
      return; // Prevent form submission
    }
    // const currentDate = new Date().toLocaleString();
    // const currentDate = new Date();

    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 and pad with leading zero
    // const day = String(currentDate.getDate()).padStart(2, "0");
    // const hours = String(currentDate.getHours()).padStart(2, "0");
    // const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    // const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    // const formattedString = new Date(dateString);
    // const isoString = formattedString.toISOString();
    // const date = isoString.slice(0, 19);

    const currentDate = new Date();
    const date = currentDate.toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
    });
    const totalPrice = unitPrice * requestQuantity;
    const productData = {
      userName,
      userEmail,
      date,
      productId: _id,
      productName,
      quantity,
      remarks,
      unit,
      unitPrice,
      requestQuantity,
      totalPrice,
      status,
      prNo: "",
      deliveredQuantity: "",
    };
    console.log(productData);
    // Requested for purchase

    fetch("https://prs-server-vogi.onrender.com/requestProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Product Request successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    event.target.reset();
  };

  return (
    <tr>
      <td className="">{index + 1}</td>
      <td className="">{productName}</td>
      <td className="">{quantity}</td>
      <td className="">{unit}</td>
      <td className=" text-justify">{description}</td>
      <td className="">
        <label
          htmlFor={_id}
          className=" btn hover:shadow-form rounded-md bg-gray-700 text-center text-white outline-none"
        >
          Request
        </label>
      </td>

      <input type="checkbox" id={_id} className="modal-toggle" />
      <div className="modal">
        {" "}
        <div className="modal-box">
          <form onSubmit={handleAddRequestProductData}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium text-gray-700">
                  Select Request Type
                </span>
              </div>
              <select
                name="status"
                className="select select-bordered font-medium text-gray-700"
                required
              >
                <option value="" selected>
                  Pick one
                </option>
                <option
                  value="Requested for purchase"
                  className="font-medium text-gray-700"
                >
                  Requested for purchase
                </option>
                <option
                  value="Requested for store"
                  className="font-medium text-gray-700"
                >
                  Requested for store
                </option>
              </select>
            </label>

            <div className="form-control ">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                  Product Name
                </span>
              </label>
              <input
                type="text"
                defaultValue={productName}
                name="productName"
                disabled
                placeholder="Product Name"
                className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                  Current Stock
                </span>
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={quantity}
                disabled
                placeholder="Current Stock"
                className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                  Unit
                </span>
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={unit}
                disabled
                placeholder="Unit"
                className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                  Request Quantity
                </span>
              </label>
              <input
                type="number"
                name="requestQuantity"
                defaultValue=""
                required
                placeholder="Request Quantity"
                className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                  Unit Price
                </span>
              </label>
              <input
                type="number"
                name="unitPrice"
                required
                defaultValue=""
                placeholder="Unit Price"
                className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                  Remarks
                </span>
              </label>
              <input
                type="text"
                name="remarks"
                defaultValue=""
                required
                placeholder="Remarks"
                className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
              />
            </div>

            <div className="form-control mt-8 mb-16">
              <input
                className="btn bg-gray-800 text-white btn-block"
                type="submit"
                value="Submit"
                // onClick={() => {

                //   handleAddRequestProductData();
                // }}
              />
            </div>

            <div className="modal-action">
              <label
                htmlFor={_id}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
            </div>
          </form>
        </div>
      </div>
    </tr>
  );
};

export default PurchaseRequestRow;
