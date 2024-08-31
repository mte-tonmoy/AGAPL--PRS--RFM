import React from "react";
import { timeAgo } from "../../reusable/timeAgo";
import Swal from "sweetalert2";

const StoreRequestRow = ({ product, index, refetch }) => {
  const {
    _id,
    date,
    productName,
    remarks,
    requestQuantity,
    totalPrice,
    unit,
    unitPrice,
    status,
    prNo,
  } = product;

  const dateFormate = timeAgo(date);

  const handleStoreRequest = (_id) => {
    fetch(`https://prs-server-vogi.onrender.com/request/store/${_id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Requested for store!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{dateFormate}</td>
      <td>{productName}</td>
      <td>{requestQuantity}</td>
      <td>{unit}</td>
      <td>{unitPrice}</td>
      <td>{totalPrice}</td>
      <td>{remarks}</td>
      <td>{status}</td>
      <td>{prNo}</td>
      <td>
        <button
          onClick={() => handleStoreRequest(_id)}
          className="btn hover:shadow-form rounded-md bg-gray-800 py-3 px-8 text-center text-sm font-semibold text-white outline-none"
        >
          Request
        </button>
      </td>
    </tr>
  );
};

export default StoreRequestRow;
