import React from "react";
import Swal from "sweetalert2";
import { MdAddBox } from "react-icons/md";
import { timeAgo } from "../../reusable/timeAgo";

const DeliverProductRow = ({ product, index }) => {
  const {
    _id,
    date,
    productName,
    productId,
    quantity,
    remarks,
    requestQuantity,
    totalPrice,
    unit,
    unitPrice,
    userEmail,
    userName,
    status,
  } = product;

  // const dateFormate = timeAgo(date);

  const handleAddDeliverQuantity = (event) => {
    event.preventDefault();
    const form = event.target;
    const deliveredQuantity = form.deliveredQuantity.value;
    event.target.reset();

    const deliverQuantity = parseInt(deliveredQuantity);
    const updateCurrentStock = {
      deliverQuantity,
    };
    fetch(
      `https://prs-server-vogi.onrender.com/updateCurrentStock/${productId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateCurrentStock),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount) {
          const deliveredQuantityData = {
            deliveredQuantity,
            status: "Product delivered",
          };
          fetch(
            `https://prs-server-vogi.onrender.com/addDeliverQuantity/${_id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(deliveredQuantityData),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.modifiedCount) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `Deliver Quantity added`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        } else {
          Swal.fire("Delivery Quantity Exceeds Current Stock!");
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
        <form onSubmit={handleAddDeliverQuantity}>
          <div className="flex items-center">
            <div className="form-control ">
              <input
                type="number"
                name="deliveredQuantity"
                placeholder="Add deliver quantity"
                // required
                className="input input-bordered rounded-md border border-[#e0e0e0] bg-white  text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md w-40"
              />
            </div>

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

export default DeliverProductRow;
