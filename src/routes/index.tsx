import { createBrowserRouter, redirect } from "react-router-dom";
import Root from "../layouts/Root";
import AddTask from "../pages/AddTask";
import CompletedTasks from "../pages/CompletedTasks";
import MyTasks from "../pages/MyTasks";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <AddTask />,
      },
      {
        path: "/add-task",
        loader: () => redirect("/"),
      },
      {
        path: "my-tasks",
        element: <MyTasks />,
      },
      {
        path: "completed-tasks",
        element: <CompletedTasks />,
      },
    ],
  },
]);
