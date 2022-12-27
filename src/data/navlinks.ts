type NavLinkType = {
  name: string;
  path: string;
};

const navlinks: NavLinkType[] = [
  {
    name: "Add Task",
    path: "/add-task",
  },
  {
    name: "My Tasks",
    path: "/my-tasks",
  },
  {
    name: "Completed Tasks",
    path: "/completed-tasks",
  },
];

export default navlinks;
