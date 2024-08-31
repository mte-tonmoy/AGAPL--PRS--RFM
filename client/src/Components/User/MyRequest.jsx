// import React, { useEffect, useState } from "react";
// import MovingText from "react-moving-text";

// import MyPurchaseRequestRow from "./MyRequestRow";
// import useMyRequest from "../../hooks/useMyRequest";
// import MyRequestRow from "./MyRequestRow";

// const MyRequest = () => {
//   const [myRequest, refetch] = useMyRequest([]);
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
//         request.status,
//         request.prNo,
//         request.deliveredQuantity
//       ];

//       return searchableFields.some((field) =>
//         field?.toString().toLowerCase().includes(term.toLowerCase())
//       );
//     });
//   };

//   const filteredRequests = filterRequests(myRequest, searchTerm);
  
//   const sortedData = [...filteredRequests].sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );

//   return (
//     <>
//       <div className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-xl font-semibold">My Request List</p>
//         </div>
//         <div className="flex items-center space-x-5">
//           <div className="hidden md:flex ">
//             <input
//               type="text"
//               placeholder="Search products"
//               className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto mt-5 mx-10">
//         <table className="table border">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>
//                 User <br></br> Name
//               </th>
//               <th>Date</th>
//               <th>
//                 Product <br></br> Name
//               </th>
//               <th>
//                 Request <br /> Time <br /> Stock
//               </th>
//               <th>
//                 Request <br></br> Quantity
//               </th>
//               <th>Unit</th>
//               <th>
//                 Unit <br></br> Price
//               </th>
//               <th>
//                 Total <br></br> Price
//               </th>
//               <th>Remarks</th>
//               <th>Status</th>
//               <th>Pr no</th>
//               <th>
//                 Delivered <br></br> Quantity
//               </th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedData.map((product, index) => (
//               <MyRequestRow
//                 key={product._id}
//                 product={product}
//                 index={index}
//                 refetch={refetch}
//               ></MyRequestRow>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default MyRequest;



// import React, { useEffect, useState } from "react";
// import MyRequestRow from "./MyRequestRow";
// import useMyRequest from "../../hooks/useMyRequest";

// const MyRequest = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // Set a default limit
//   const [myRequest, total, refetch] = useMyRequest(page, limit, searchTerm);

//   useEffect(() => {
//     refetch(); // Fetch data when page, searchTerm, or limit changes
//   }, [page, searchTerm, refetch]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(1); // Reset to the first page when searching
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <>
//       <div className="flex justify-between items-center p-4">
//         <div>
//           <p className="text-xl font-semibold">My Request List</p>
//         </div>
//         <div className="flex items-center space-x-5">
//           <div className="hidden md:flex">
//             <input
//               type="text"
//               placeholder="Search products"
//               className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto mt-5 mx-10">
//         <table className="table border">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>User Name</th>
//               <th>Date</th>
//               <th>Product Name</th>
//               <th>Request Time Stock</th>
//               <th>Request Quantity</th>
//               <th>Unit</th>
//               <th>Unit Price</th>
//               <th>Total Price</th>
//               <th>Remarks</th>
//               <th>Status</th>
//               <th>Pr no</th>
//               <th>Delivered Quantity</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {myRequest.map((request, index) => (
//               <MyRequestRow
//                 key={request._id}
//                 product={request}
//                 index={index}
//                 refetch={refetch}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center p-4">
//         <button
//           disabled={page === 1}
//           onClick={() => handlePageChange(page - 1)}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => handlePageChange(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default MyRequest;


import React, { useEffect, useState } from "react";
import MyRequestRow from "./MyRequestRow";
import useMyRequest from "../../hooks/useMyRequest";

const MyRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Set a default limit
  const [myRequest, total, refetch] = useMyRequest(page, limit, searchTerm);

  useEffect(() => {
    refetch(); // Fetch data when page, searchTerm, or limit changes
  }, [page, searchTerm, refetch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / limit);
  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // Sort the data by date in descending order (latest first)
  const sortedRequests = [...myRequest].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <p className="text-xl font-semibold">My Request List</p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="hidden md:flex">
            <input
              type="text"
              placeholder="Search products"
              className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-5 mx-10">
        <table className="table border">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Request Time Stock</th>
              <th>Request Quantity</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Pr no</th>
              <th>Delivered Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request, index) => (
              <MyRequestRow
                key={request._id}
                product={request}
                index={(page - 1) * limit + index } // Adjusting the index for pagination
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>

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
            } px-3 py-1 border rounded-md `}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={`${
            page === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-600"
          }`}
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          &raquo;
        </button>
      </div>
    </>
  );
};

export default MyRequest;

