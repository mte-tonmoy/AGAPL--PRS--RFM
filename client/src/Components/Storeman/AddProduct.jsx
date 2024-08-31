import React, { useEffect, useState } from "react";
import AllProductRow from "./AllProductRow";
import Swal from "sweetalert2";

const AddProduct = () => {
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

  const handleAddProductData = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productName.value;
    const quantity = form.quantity.value;
    const unit = form.unit.value;
    const description = form.description.value;
    event.target.reset();

    const productData = {
      productName,
      quantity,
      unit,
      description,
    };

    fetch("https://prs-server-vogi.onrender.com/addProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Product Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchProducts(currentPage, searchQuery); // Refresh product list
        }
      });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex flex-col md:flex-row py-5 ">
        <div className="shadow-lg p-8 rounded-lg md:w-2/6 h-fit">
          <form onSubmit={handleAddProductData}>
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
                required
                className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
                // className="input input-bordered  w-full rounded-md border border-[#e0e0e0] py-3 px-6 text-sm font-small text-[#6B7280] outline-none focus:border-green-500 focus:shadow-md bg-gray-50"
              />
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
                placeholder="Current Stock"
                className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
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
                defaultValue=""
                required
                placeholder="Unit"
                className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
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
                className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600"
                placeholder="Write the product description"
              ></textarea>
            </div>

            <div className="form-control mt-8 mb-16">
              <input
                className="btn bg-gray-800 text-white btn-block"
                type="submit"
                value="Add "
              />
            </div>
          </form>
        </div>

        <div className="overflow-x-auto ml-5 md:w-4/6">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <input
            type="text"
            placeholder="Search products"
            className="border rounded-md p-2 mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
          <table className="table border ">
            <thead>
              <tr>
                <th className="w-1/12">SN</th>
                <th className="w-2/12">Product Name</th>
                <th className="w-2/12">Current Stock</th>
                <th className="w-1/12">Unit</th>
                <th className="w-5/12">Description</th>
                <th className="w-2/12 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProduct.map((product, index) => (
                <AllProductRow
                  key={product._id}
                  product={product}
                  // index={index}
                  index={index + (currentPage - 1) * productsPerPage}
                  currentPage={currentPage}
                  productsPerPage={productsPerPage}
                  fetchProducts={fetchProducts}
                />
              ))}
            </tbody>
          </table>
          <div className="pagination mt-4 flex justify-center space-x-1">
            {Array.from(
              { length: Math.ceil(totalProducts / productsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
