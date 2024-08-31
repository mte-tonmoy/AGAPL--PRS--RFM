import React from "react";
import Swal from "sweetalert2";
import { timeAgo } from "../../reusable/timeAgo";

const PurchaseRequisitionRow = ({ product, index, refetch }) => {
  const {
    _id,
    date,
    productName,
    quantity,
    remarks,
    requestQuantity,
    totalPrice,
    unit,
    unitPrice,
    userEmail,
    userName,
  } = product;

  const dateFormate = timeAgo(date);

  const handleMakeApprove = (_id) => {
    fetch(`https://prs-server-vogi.onrender.com/request/approve/${_id}`, {
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
            title: `Request is approved!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleMakeDeny = (_id) => {
    fetch(`https://prs-server-vogi.onrender.com/request/deny/${_id}`, {
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
            title: `Request is denied!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        {userName}
        <br></br>
        {userEmail}
      </td>
      <td>{dateFormate}</td>
      <td>{productName}</td>
      <td>{quantity}</td>
      <td>{requestQuantity}</td>
      <td>{unit}</td>
      <td>{unitPrice}</td>
      <td>{totalPrice}</td>
      <td>{remarks}</td>
      <td>
        <button
          onClick={() => handleMakeApprove(_id)}
          className="btn btn-sm bg-green-500 text-white btn-block"
        >
          Accept
        </button>
      </td>
      <td>
        <button
          onClick={() => handleMakeDeny(_id)}
          className="btn btn-sm bg-red-500 text-white btn-block"
        >
          Reject
        </button>
      </td>
    </tr>
  );
};

export default PurchaseRequisitionRow;
