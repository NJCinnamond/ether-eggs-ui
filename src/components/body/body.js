import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import React from "react";
import { ErrorPage } from '../error/error';

import './body.css';
import { MapView } from "../mapView/mapView";
import { ActivityList } from "../activityList/activityList";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MapView/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/callback",
      element: <ActivityList/>,
    },
  ]);

export const BodyComponent = () => {

    return (
        <div className="body-box">
            <RouterProvider router={router}/>
        </div>
    )
}