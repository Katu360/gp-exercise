import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from "@mantine/notifications";

import "reflect-metadata";

import App from "./app/App";
import { ErrorPage, HomePage, RentPage } from "./app/pages";

import './index.css';

const router = createBrowserRouter([
  { path: "*", element: <App />, errorElement: <ErrorPage /> },
  { element: <App />, children: [
      { path: "/", element: <HomePage /> },
      { path: "/rent/:cycleId", element: <RentPage /> },
    ] }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
