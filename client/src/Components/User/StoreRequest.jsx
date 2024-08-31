import React, { useEffect, useState } from "react";
import MovingText from "react-moving-text";
import StoreRequestRow from "./StoreRequestRow";
import useMyPurchaseRequest from "../../hooks/useMyPurchaseRequest";

const StoreRequest = () => {
  const [myRequest, refetch] = useMyPurchaseRequest([]);
  console.log(myRequest);
  const sortedData = [...myRequest].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          {/* <h1 className="text-xs">P</h1> */}
          <p className="text-xl font-semibold">Product List</p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="hidden md:flex ">
            <input
              type="text"
              placeholder="Search products"
              className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 mx-10">
        <table className="table border">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>
                Product <br></br> Name
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
              <th>PR No</th>
              <th>Request To Store</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((product, index) => (
              <StoreRequestRow
                key={product._id}
                product={product}
                index={index}
                refetch={refetch}
              ></StoreRequestRow>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StoreRequest;
