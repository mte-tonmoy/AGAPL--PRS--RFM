import React, { useEffect, useState } from "react";
import useAddPr from "../../hooks/useAddPr";
import AddPrRow from "./AddPrRow";
import MovingComponent from "react-moving-text";

const AddPr = () => {
  const [addPr, refetch] = useAddPr([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterRequests = (requests, term) => {
    if (!term) return requests;

    return requests.filter((request) => {
      const searchableFields = [
        request.userName,
        request.productName,
        request.date,
        request.currentStock,
        request.requestQuantity,
        request.unit,
        request.unitPrice,
        request.totalPrice,
        request.remarks,
        request.status,
        request.addPrNo,
      ];

      return searchableFields.some((field) =>
        field?.toString().toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  const filteredRequests = filterRequests(addPr, searchTerm);

  const sortedData = [...filteredRequests].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="">
      <div className="w-full flex justify-between items-center p-4 ">
        <div>
          <p className="text-xl font-semibold">Add PR</p>
        </div>
        <div className="flex items-center space-x-5">
          {/* <div className="hidden md:flex ">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div> */}
        </div>
      </div>
      <table className="table border">
        <thead>
          <tr>
            <th>#</th>
            <th>
              User <br></br> Name
            </th>
            <th>
              Request <br></br>Date
            </th>
            <th>
              Product <br></br> Name
            </th>
            <th>
              Request <br /> Time <br /> Stock
            </th>
            <th>
              Request <br></br> Quantity
            </th>
            <th>Unit</th>
            <th>
              Unit <br></br> Price
            </th>
            <th>
              Total <br></br> Price
            </th>
            <th>Remarks</th>
            <th>Status</th>
            <th>Add PR No</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((product, index) => (
            <AddPrRow
              key={product._id}
              product={product}
              index={index}
              refetch={refetch}
            ></AddPrRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPr;
