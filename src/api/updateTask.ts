import api from ".";
import TaskType from "../types/task.type";

type PropsType = {
  uid: string;
  email: string;
  tasks: TaskType[];
};
const updateTaskToServer = async (payload: PropsType) => {
  console.info(payload);
  return await api.post(`/tasks?uid=${payload.uid}`, payload, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
};

export default updateTaskToServer;
