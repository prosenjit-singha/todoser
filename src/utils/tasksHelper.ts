import TaskType from "../types/task.type";

export const afterUpdatingTask = (
  index: number,
  updatedTask: TaskType,
  tasks: TaskType[]
) => tasks.filter((task, i) => (i === index ? updatedTask : task));

export const afterDeletingTask = (index: number, tasks: TaskType[]) =>
  tasks.filter((task, i) => i !== index);
