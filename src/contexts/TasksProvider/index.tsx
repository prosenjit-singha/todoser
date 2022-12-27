import { createContext, useContext, useState } from "react";

type TaskType = {
  title: string;
  desc: string;
  label: string[];
  image: string[];
};

type ValueType = {
  tasks: TaskType[];
};

const TasksContext = createContext<ValueType>({} as ValueType);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;

export const useTasks = () => useContext(TasksContext);
