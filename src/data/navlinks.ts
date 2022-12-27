import {
  MdAdd as AddIcon,
  MdOutlineTaskAlt as CompletedIcon,
} from "react-icons/md";
import { FaTasks as TasksIcon } from "react-icons/fa";
import { IconType } from "react-icons";

type NavLinkType = {
  name: string;
  path: string;
  Icon: IconType;
};

const navlinks: NavLinkType[] = [
  {
    name: "Add Task",
    path: "/",
    Icon: AddIcon,
  },
  {
    name: "My Tasks",
    path: "/my-tasks",
    Icon: TasksIcon,
  },
  {
    name: "Completed Tasks",
    path: "/completed-tasks",
    Icon: CompletedIcon,
  },
];

export default navlinks;
