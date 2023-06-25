import React from 'react';
import ReactDOM from 'react-dom/client';
import {MantineProvider} from "@mantine/core";

import "reflect-metadata";

import App from "./app/App";
import {ErrorPage, HomePage, RentPage} from "./app/pages";

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "*", element: <App />, errorElement: <ErrorPage /> },
  { element: <App />, children: [
      { path: "/", element: <HomePage /> },
      { path: "/rent/:cycleId", element: <RentPage /> },
    ]}
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
);
