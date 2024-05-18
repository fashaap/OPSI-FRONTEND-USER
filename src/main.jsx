import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TicketPage from "./pages/page/ticket/TicketPage.jsx";
import PageLayout from "./pages/layouts/PageLayout.jsx";
import CreateTicketPage from "./pages/page/ticket/CreateTicketPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: (
      <PageLayout>
        <TicketPage />
      </PageLayout>
    ),
  },
  {
    path: "/create-ticket/:id",
    element: (
      <PageLayout>
        <CreateTicketPage/>
      </PageLayout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
