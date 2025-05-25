import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../public/i18n.jsx";

import AdminRoutes from "./admin/AdminRoutes.jsx"
import UserRoutes from "./user/UserRoutes.jsx"

import "./layouts/App.css"

import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  ...AdminRoutes.routes,
  ...UserRoutes.routes,
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
  </StrictMode>
);
