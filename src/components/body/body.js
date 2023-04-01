import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import React from "react";
import { ErrorPage } from '../error/error';

import './body.css';
import { MapView } from "../mapView/mapView";
import { ActivityList } from "../activityList/activityList";
import { MyEggs } from '../myEggs/myEggs';

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
    {
      path: "/my-eggs",
      element: <MyEggs/>,
    },
  ]);

export const BodyComponent = () => {

    return (
        <div className="body-box">
            <RouterProvider router={router}/>
        </div>
    )
}