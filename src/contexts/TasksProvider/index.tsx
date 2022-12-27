import { createContext, useContext, useState } from "react";

type TaskType = {
  title: string;
  desc: string;
  label: string[];
  image: string[];
};

type ValueType = {
  tasks: TaskType[];
  addTask: (task: TaskType) => void;
  deleteTask: (index: number) => void;
  updateTask: (index: number, updatedTask: TaskType) => void;
};

const TasksContext = createContext<ValueType>({} as ValueType);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  function addTask(task: TaskType) {
    setTasks([...tasks, task]);
  }
  function deleteTask(index: number) {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  }

  function updateTask(index: number, updatedTask: TaskType) {
    setTasks((prev) =>
      prev.map((task, i) => (i === index ? updatedTask : task))
    );
  }

  const value: ValueType = {
    tasks,
    addTask,
    deleteTask,
    updateTask,
  };
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;

export const useTasks = () => useContext(TasksContext);
