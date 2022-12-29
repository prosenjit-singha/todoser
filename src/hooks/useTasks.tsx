import { useQuery } from "@tanstack/react-query";
import api from "../api";
import TaskType from "../types/task.type";

const useTasks = (uid: string) =>
  useQuery({
    queryKey: ["tasks", uid],
    queryFn: async (): Promise<TaskType[]> => {
      const { data } = await api.get(`/tasks?uid=${uid}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.info(data);
      return data ? data : [];
    },

    enabled: !!uid,
    refetchOnMount: false,
  });

export default useTasks;
