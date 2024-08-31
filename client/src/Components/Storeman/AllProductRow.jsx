import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

const AllProductRow = ({ product, index }) => {
  const { _id, productName, quantity, unit, description } = product;

  const handleEdit = (event) => {
    event.preventDefault();
    const form = event.target;
    const edit_id = form.id.value;
    const productName = form.productName.value;
    const quantity = form.quantity.value;
    const unit = form.unit.value;
    const description = form.description.value;

    const productEditData = {
      productName,
      quantity,
      unit,
      description,
    };
    fetch(`https://prs-server-vogi.onrender.com/editProduct/${edit_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productEditData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          // refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Product updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

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
        fetch(`https://prs-server-vogi.onrender.com/deleteProduct/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your product has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <tr>
      <td className="w-1/12">{index + 1}</td>
      <td className="w-2/12">{productName}</td>
      <td className="w-2/12 text-center">{quantity}</td>
      <td className="w-2/12">{unit}</td>
      <td className="w-4/12 text-justify">{description}</td>

      <td className="w-1/12 flex">
        <div className="p-5">
          <label htmlFor={_id}>
            <FaRegEdit size={"15px"} />
          </label>
        </div>

        <div className="p-5">
          <button onClick={() => handleDelete(_id)}>
            <RiDeleteBinLine size={"15px"} />
          </button>
        </div>

        <input type="checkbox" id={_id} className="modal-toggle" />
        <div className="modal">
          {" "}
          <div className="modal-box">
            <form onSubmit={handleEdit}>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  defaultValue={productName}
                  required
                  className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                />
              </div>
              <div className="from-control">
                <input type="hidden" name="id" value={_id} />
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
                  required
                  defaultValue={quantity}
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
                  required
                  placeholder="Unit"
                  className="input input-bordered  w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text block text-sm font-medium text-gray-700 mt-2">
                    Description
                  </span>
                </label>
                <textarea
                  name="description"
                  required
                  defaultValue={description}
                  className="textarea textarea-bordered w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md"
                  placeholder="Write the product description"
                ></textarea>
              </div>

              <div className="form-control mt-8">
                <input
                  className="btn bg-gray-800 text-white btn-block"
                  type="submit"
                  value="Update"
                />
              </div>

              <div className="modal-action ">
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
      </td>
    </tr>
  );
};

export default AllProductRow;
