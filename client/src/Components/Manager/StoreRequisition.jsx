import React, { useEffect, useState } from "react";
import StoreRequisitionRow from "./StoreRequisitionRow";

const StoreRequisition = () => {
  const [storeRequest, setStoreRequest] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://prs-server-vogi.onrender.com/storeRequestedProduct")
      .then((res) => res.json())
      .then((data) => setStoreRequest(data));
  }, [storeRequest]);

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
      ];

      return searchableFields.some((field) =>
        field?.toString().toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  const filteredProducts = filterRequests(storeRequest, searchTerm);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return a.userEmail.localeCompare(b.userEmail);
  });

  return (
    <>
      <div className=" ">
        <div className="w-full flex justify-between items-center py-4 ">
          <div>
            <p className="text-xl font-semibold">Store Requisition Request</p>
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
        <div className="overflow-x-auto">
          <table className="table border">
            <thead className="mt-10">
              <tr>
                <th>#</th>
                <th>
                  User <br /> Name
                </th>
                <th>
                  Request <br /> Date
                </th>
                <th>
                  Product <br /> Name
                </th>
                <th>
                  Request <br /> Time <br /> Stock
                </th>
                <th>
                  Request <br /> Quantity
                </th>
                <th>Unit</th>
                <th>
                  Unit <br /> Price
                </th>
                <th>
                  Total <br /> Price
                </th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product, index) => (
                <StoreRequisitionRow
                  key={product._id}
                  product={product}
                  index={index}
                ></StoreRequisitionRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StoreRequisition;
