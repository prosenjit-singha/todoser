import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../layouts/Root";
import AddTask from "../pages/AddTask";
import CompletedTasks from "../pages/CompletedTasks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyTasks from "../pages/MyTasks";
import Register from "../pages/Register";
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
        element: <AddTask />,
      },
      {
        path: "my-tasks",
        element: <MyTasks />,
      },
      {
        path: "completed-tasks",
        element: <CompletedTasks />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
