// import React, { useEffect, useState } from "react";
// import PRAddedRow from "./PRAddedRow";
// import useAddPrDone from "../../hooks/useAddPrDone";

// const PRAdded = () => {
//   const [addPrDone, refetch] = useAddPrDone([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filterRequests = (requests, term) => {
//     if (!term) return requests;

//     return requests.filter((request) => {
//       const searchableFields = [
//         request.userName,
//         request.productName,
//         request.date,
//         request.currentStock,
//         request.requestQuantity,
//         request.unit,
//         request.unitPrice,
//         request.totalPrice,
//         request.remarks,
//         request.prNo,
//         request.deliveredQuantity,
//       ];

//       return searchableFields.some((field) =>
//         field?.toString().toLowerCase().includes(term.toLowerCase())
//       );
//     });
//   };

//   const filteredRequests = filterRequests(addPrDone, searchTerm);

//   const sortedData = [...filteredRequests].sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );

//   return (
//     <>
//       <div className="">
//         <div className="w-full flex justify-between items-center p-4">
//           <div>
//             <p className="text-xl font-semibold">Delivery Product Status</p>
//           </div>
//           <div className="flex items-center space-x-5">
//             <div className="hidden md:flex">
//               <input
//                 type="text"
//                 placeholder="Search Products"
//                 className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="overflow-x-auto mt-5">
//           <table className="table border">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>
//                   User <br /> Name
//                 </th>
//                 <th>
//                   Request <br /> Date
//                 </th>
//                 <th>
//                   Product <br /> Name
//                 </th>
//                 <th>
//                   Request <br /> Time <br /> Stock
//                 </th>
//                 <th>
//                   Request <br /> Quantity
//                 </th>
//                 <th>Unit</th>
//                 <th>
//                   Unit <br /> Price
//                 </th>
//                 <th>
//                   Total <br /> Price
//                 </th>
//                 <th>Remarks</th>
//                 <th>PR No</th>
//                 <th>
//                   Delivered <br /> Quantity
//                 </th>
//                 <th>Edit PR No</th>
//                 <th>Edit Deliver Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.map((product, index) => (
//                 <PRAddedRow
//                   key={product._id}
//                   product={product}
//                   index={index}
//                   refetch={refetch}
//                 ></PRAddedRow>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PRAdded;

import React, { useState } from "react";
import PRAddedRow from "./PRAddedRow";
import useAddPrDone from "../../hooks/useAddPrDone";

const PRAdded = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const [addPrDone, refetch] = useAddPrDone(page, limit, searchTerm);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(addPrDone.totalPages, page + 2);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <div className="">
        <div className="w-full flex justify-between items-center p-4">
          <div>
            <p className="text-xl font-semibold">Delivery Product Status</p>
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
                <th>PR No</th>
                <th>
                  Delivered <br /> Quantity
                </th>
                <th>Edit PR No</th>
                <th>Edit Deliver Quantity</th>
              </tr>
            </thead>
            <tbody>
              {addPrDone.data?.map((product, index) => (
                <PRAddedRow
                  key={product._id}
                  product={product}
                  index={(page - 1) * limit + index } // Adjusting the index for pagination
                  refetch={refetch}
                ></PRAddedRow>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-center items-center p-4 space-x-2">
          <button
            className={`${
              page === 1 ? "text-gray-400 cursor-not-allowed" : "text-indigo-600"
            }`}
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            &laquo;
          </button>
          {getVisiblePages().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`${
                pageNumber === page
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-indigo-600"
              } px-3 py-1 border rounded-md`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={`${
              page === addPrDone.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-indigo-600"
            }`}
            disabled={page === addPrDone.totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            &raquo;
          </button>
        </div>
      </div>
    </>
  );
};

export default PRAdded;
