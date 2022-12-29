import { createContext, useContext, useState } from "react";
import TaskType from "../../types/task.type";

type ValueType = {
  tasks: TaskType[];
  addTask: (task: TaskType) => void;
  deleteTask: (index: number) => void;
  updateTask: (index: number, updatedTask: TaskType) => void;
};

const TasksContext = createContext<ValueType>({} as ValueType);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      title: "Demo Task 2",
      labels: ["label-1", "label-2"],
      images: [],
      desc: "Demo 2 description",
      isCompleted: false,
      comment: "",
    },
    {
      title: "Demo Task 1",
      labels: ["label-1", "label-2"],
      images: [],
      desc: "Demo 1 description",
      isCompleted: false,
      comment: "",
    },
  ]);

  function addTask(task: TaskType) {
    setTasks([task, ...tasks]);
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
