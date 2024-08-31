// import React, { useEffect, useState } from "react";
// import PurchaseRequestRow from "./PurchaseRequestRow";

// const PurchaseRequest = () => {
//   const [allProduct, setAllProduct] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const productsPerPage = 70;

//   const fetchProducts = (page = 1, search = "") => {
//     fetch(
//       `https://prs-server-vogi.onrender.com/allProduct?page=${page}&limit=${productsPerPage}&search=${search}`
//     )
//       .then((res) => res.json())
//       .then(({ total, products }) => {
//         setTotalProducts(total);
//         setAllProduct(products);
//       });
//   };

//   useEffect(() => {
//     fetchProducts(currentPage, searchQuery);
//   }, [currentPage, searchQuery]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // Reset to the first page when search changes
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(totalProducts / productsPerPage);

//   return (

//     <div className="flex flex-col items-center">
//                 <div className="w-full flex justify-between items-center p-4 ">
//             <div>
//               {/* <h1 className="text-xs">P</h1> */}
//               <p className="text-xl font-semibold">Product List</p>
//             </div>
//             <div className="flex items-center space-x-5">
//               <div className="hidden md:flex ">
//                 <input
//                   type="text"
//                   placeholder="Search Products"
//                   className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//       {/* <div className="flex justify-end overflow-x-auto  md:w-2/6  ml-auto mr-10 my-5">

//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search products..."
//           className="p-2 border rounded w-full"
//         />
//       </div> */}
//       <div className="w-11/12 ">
//         <div className="overflow-x-auto">
//           <table className="table border">
//             <thead>
//               <tr>
//                 <th className="w-1/12">SN</th>
//                 <th className="w-2/12">Item Name</th>
//                 <th className="w-2/12">Item Quantity</th>
//                 <th className="w-2/12">Unit</th>
//                 <th className="w-4/12 text-justify">Description</th>
//                 <th className="w-1/12"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {allProduct.map((product, index) => (
//                 <PurchaseRequestRow
//                   key={product._id}
//                   product={product}
//                   index={index  + (currentPage - 1) * productsPerPage} // Adjust SN according to page
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="pagination mt-4 flex justify-center space-x-1">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1 border rounded ${
//                 currentPage === i + 1 ? "bg-gray-800 text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PurchaseRequest;

import React, { useEffect, useState } from "react";
import PurchaseRequestRow from "./PurchaseRequestRow";

const PurchaseRequest = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 70;

  const fetchProducts = (page = 1, search = "") => {
    fetch(
      `https://prs-server-vogi.onrender.com/allProduct?page=${page}&limit=${productsPerPage}&search=${search}`
    )
      .then((res) => res.json())
      .then(({ total, products }) => {
        setTotalProducts(total);
        setAllProduct(products);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Calculate the range of pages to show
  const [currentRange, setCurrentRange] = useState(0);
  const pagesPerRange = 10;

  const getPaginationItems = () => {
    const startPage = currentRange * pagesPerRange + 1;
    const endPage = Math.min(startPage + pagesPerRange - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handleNextRange = () => {
    if ((currentRange + 1) * pagesPerRange < totalPages) {
      setCurrentRange(currentRange + 1);
    }
  };

  const handlePreviousRange = () => {
    if (currentRange > 0) {
      setCurrentRange(currentRange - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center p-4">
        <div>
          <p className="text-xl font-semibold">Product List</p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="hidden md:flex">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="w-11/12">
        <div className="overflow-x-auto">
          <table className="table border">
            <thead>
              <tr>
                <th className="w-1/12">SN</th>
                <th className="w-2/12">Item Name</th>
                <th className="w-2/12">Item Quantity</th>
                <th className="w-2/12">Unit</th>
                <th className="w-4/12 text-justify">Description</th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {allProduct.map((product, index) => (
                <PurchaseRequestRow
                  key={product._id}
                  product={product}
                  index={index + (currentPage - 1) * productsPerPage} // Adjust SN according to page
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination mt-4 flex justify-center items-center space-x-2">
          {/* Previous Range button */}
          <button
            onClick={handlePreviousRange}
            className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-100"
            disabled={currentRange === 0}
          >
            &laquo;
          </button>

          {getPaginationItems().map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Range button */}
          <button
            onClick={handleNextRange}
            className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-100"
            disabled={(currentRange + 1) * pagesPerRange >= totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRequest;
