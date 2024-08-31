import React, { useEffect, useState } from "react";
import DeliverProductRow from "./DeliverProductRow";

const DeliverProduct = () => {
  const [storeRequestData, setStoreRequestData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://prs-server-vogi.onrender.com/deliverProductData")
      .then((res) => res.json())
      .then((data) => setStoreRequestData(data));
  }, [storeRequestData]);

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
        request.addDeliverQuantity,
      ];

      return searchableFields.some((field) =>
        field?.toString().toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  const filteredRequests = filterRequests(storeRequestData, searchTerm);

  const sortedData = [...filteredRequests].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <div className="">
        <div className="w-full flex justify-between items-center p-4">
          <div>
            <p className="text-xl font-semibold">Deliver Product</p>
          </div>
          <div className="flex items-center space-x-5">
            {/* <div className="hidden md:flex">
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
        <div className="overflow-x-auto mt-5">
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
                <th>Add deliver quantity</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((product, index) => (
                <DeliverProductRow
                  key={product._id}
                  product={product}
                  index={index}
                ></DeliverProductRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DeliverProduct;
