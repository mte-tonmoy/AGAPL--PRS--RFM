import React from "react";
import Swal from "sweetalert2";
import { MdAddBox } from "react-icons/md";
import { timeAgo } from "../../reusable/timeAgo";

const AddPrRow = ({ product, index, refetch }) => {
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
  } = product;

  const dateFormate = timeAgo(date);
  const handleAddPr = (event) => {
    event.preventDefault();
    const form = event.target;
    //    const add_id = form.id.value;
    const prNo = form.prNo.value;
    event.target.reset();

    const prData = {
      prNo,
    };
    console.log(prData);
    fetch(`https://prs-server-vogi.onrender.com/addPrNo/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(prData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Pr added`,
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
      <td>{date}</td>
      <td>{productName}</td>
      <td>{quantity}</td>
      <td>{requestQuantity}</td>
      <td>{unit}</td>
      <td>{unitPrice}</td>
      <td>{totalPrice}</td>
      <td>{remarks}</td>
      <td className="text-green-500 font-semibold">{status}</td>
      {/* <td>{prNo}</td> */}
      <td>
        <form onSubmit={handleAddPr}>
          <div className="flex items-center">
            <div className="form-control ">
              <input
                type="text"
                name="prNo"
                placeholder="Add PR No"
                // required
                className="input input-bordered rounded-md border border-[#e0e0e0] bg-white  text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md w-28"
              />
            </div>
            {/* <div className="from-control">
            <input type="hidden" name="id" value={_id} />
          </div> */}

            <div className="form-control  ">
              <button type="submit" value="Add">
                <MdAddBox size={"40px"} />
              </button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default AddPrRow;
