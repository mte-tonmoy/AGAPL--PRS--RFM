import React from "react";
import { timeAgo } from "../../reusable/timeAgo";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const MyRequestRow = ({ product, index, refetch }) => {
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
    status,
    prNo,
    deliveredQuantity,
  } = product;

  // const dateFormate = timeAgo(date);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://prs-server-vogi.onrender.com/deleteMyRequest/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Your request has been deleted.",
                "success"
              );
            }
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
      <td>{date}</td>
      <td>{productName}</td>
      <td>{quantity}</td>
      <td>{requestQuantity}</td>
      <td>{unit}</td>
      <td>{unitPrice}</td>
      <td>{totalPrice}</td>
      <td>{remarks}</td>
      <td>{status}</td>
      <td>{prNo}</td>
      <td className="text-center">{deliveredQuantity}</td>
      <td>
        <div className="p-5">
          <button onClick={() => handleDelete(_id)}>
            <RiDeleteBinLine size={"15px"} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyRequestRow;
