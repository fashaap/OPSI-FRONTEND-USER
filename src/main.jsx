import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TicketPage from "./pages/page/ticket/TicketPage.jsx";
import PageLayout from "./pages/layouts/PageLayout.jsx";
import CreateTicketPage from "./pages/page/ticket/CreateTicketPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./pages/auth/ProtectedRoute.jsx";
import TicketPrinterPage from "./pages/page/ticket/TicketPrinterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: (
      <ProtectedRoute>
        <PageLayout>
          <TicketPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-ticket/:id",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <CreateTicketPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/ticket/print/:idTicket",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <TicketPrinterPage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PageLayout>
        <LoginPage />
      </PageLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
