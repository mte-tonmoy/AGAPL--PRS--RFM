import React, { useState, useEffect } from "react";
import useAddPrDone from "../../hooks/useAddPrDone";
import ProductUpdateRow from "./ProductUpdateRow";

const ProductUpdate = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const [addPrDone, refetch] = useAddPrDone(page, limit, searchTerm);

  useEffect(() => {
    refetch(); // Re-fetch data when the page, limit, or searchTerm changes
  }, [page, searchTerm, refetch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to the first page on new search
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

  // Sort the data by date (most recent first)
  const sortedData = (addPrDone.data || []).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <div className="">
        <div className="w-full flex justify-between items-center py-4">
          <div>
            <p className="text-xl font-semibold">All Requisition List</p>
          </div>
          {/* <div className="flex items-center space-x-5">
            <input
              type="text"
              placeholder="Search Products"
              className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div> */}
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="table border">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Request Date</th>
                <th>Product Name</th>
                <th>Current Stock</th>
                <th>Request Quantity</th>
                <th>Unit</th>
                <th>Unit Price</th>
                <th>Total Price</th>
                <th>Remarks</th>
                <th>PR No</th>
                <th>Status</th>
                <th>Delivered Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((product, index) => (
                <ProductUpdateRow
                  key={product._id}
                  product={product}
                  index={(page - 1) * limit + index} // Adjust index for pagination
                  refetch={refetch}
                />
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
              } px-3 py-1 rounded-md`}
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

export default ProductUpdate;
