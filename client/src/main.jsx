import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Signin from "./Components/Signin.jsx";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp.jsx";
import PurchaseRequest from "./Components/User/PurchaseRequest.jsx";
import AuthProvider from "./AuthContext/AuthProvider.jsx";
import NavBar from "./Components/NavBar.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import StoreManRoute from "./Routes/StoreManRoute.jsx";
import EmployeeRoute from "./Routes/EmployeeRoute.jsx";
import ManagerRoute from "./Routes/ManagerRoute";
import Home from "./Components/Home.jsx";
import AddPr from "./Components/Storeman/AddPr.jsx";
import MyRequest from "./Components/User/MyRequest.jsx";
import PRAdded from "./Components/Storeman/PRAdded.jsx";
import AddProduct from "./Components/Storeman/AddProduct.jsx";
import StoreRequest from "./Components/User/StoreRequest.jsx";
import PurchaseRequisition from "./Components/Manager/PurchaseRequisition.jsx";
import StoreRequisition from "./Components/Manager/StoreRequisition.jsx";
import DeliverProduct from "./Components/Storeman/DeliverProduct.jsx";
import ProductUpdate from "./Components/Manager/ProductUpdate.jsx";
import Test from "./Components/Storeman/Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/addProduct",
        element: (
          <StoreManRoute>
            <AddProduct />
          </StoreManRoute>
        ),
      },
      // This is test purpose API
      {
        path: "/test",
        element: (
          <StoreManRoute>
            <Test />
          </StoreManRoute>
        ),
      },
      {
        path: "/addPr",
        element: (
          <StoreManRoute>
            <AddPr></AddPr>
          </StoreManRoute>
        ),
      },
      {
        path: "/deliverProduct",
        element: (
          <StoreManRoute>
            <DeliverProduct></DeliverProduct>
          </StoreManRoute>
        ),
      },
      {
        path: "/prAdded",
        element: (
          <StoreManRoute>
            <PRAdded></PRAdded>
          </StoreManRoute>
        ),
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "/home",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: "/myRequest",
        element: (
          <EmployeeRoute>
            <MyRequest></MyRequest>
          </EmployeeRoute>
        ),
      },
      {
        path: "/storeRequest",
        element: (
          <EmployeeRoute>
            <StoreRequest></StoreRequest>
          </EmployeeRoute>
        ),
      },
      {
        path: "/purchaseRequest",
        element: (
          <EmployeeRoute>
            <PurchaseRequest></PurchaseRequest>
          </EmployeeRoute>
        ),
      },
      {
        path: "/navbar",
        element: <NavBar />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <Admin></Admin>
          </AdminRoute>
        ),
      },
      {
        path: "/purchaseRequisition",
        element: (
          <ManagerRoute>
            <PurchaseRequisition></PurchaseRequisition>
          </ManagerRoute>
        ),
      },
      {
        path: "/storeRequisition",
        element: (
          <ManagerRoute>
            <StoreRequisition></StoreRequisition>
          </ManagerRoute>
        ),
      },
      {
        path: "/productUpdate",
        element: (
          <ManagerRoute>
            <ProductUpdate></ProductUpdate>
          </ManagerRoute>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
