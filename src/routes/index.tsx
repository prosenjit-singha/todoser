import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../layouts/Root";
import AddTask from "../pages/AddTask";
import CompletedTasks from "../pages/CompletedTasks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyTasks from "../pages/MyTasks";
import PageNotFound from "../pages/PageNotFound";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <MyTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "completed-tasks",
        element: (
          <PrivateRoute>
            <CompletedTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
