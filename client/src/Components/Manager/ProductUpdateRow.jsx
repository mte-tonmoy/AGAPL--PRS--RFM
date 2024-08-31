import React from "react";
import Swal from "sweetalert2";
import { MdAddBox } from "react-icons/md";
// import { timeAgo } from "../../reusable/timeAgo";

const ProductUpdateRow = ({ product, index, refetch }) => {
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
    deliveredQuantity,
    prNo,
    status,
  } = product;

  // const dateFormate = timeAgo(date);

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
      <td className="font-semibold text-gray-500">{prNo}</td>
      <td>{status}</td>
      <td>{deliveredQuantity}</td>
    </tr>
  );
};

export default ProductUpdateRow;
