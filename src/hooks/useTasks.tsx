import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../api";
import TaskType from "../types/task.type";

type AddTaskProps = {
  uid: string;
  newTask: TaskType;
  tasks: TaskType[];
};

const addTask = async ({ uid, newTask, tasks }: AddTaskProps) => {
  const payload = [newTask, ...tasks];
  return await api.post(`/tasks?uid=${uid}`, payload);
};

const useTasks = (uid: string) => {
  if (!uid) console.info("No uid");
  return useQuery({
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
};

const useDeleteTask = () => {};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTask, {
    onMutate: async ({ newTask, uid }: AddTaskProps) => {
      await queryClient.cancelQueries(["tasks"]);
      const prevTasks = queryClient.getQueryData(["tasks", uid]);
      queryClient.setQueryData<TaskType[]>(["tasks", uid], (oldTasks) => {
        console.info("oldTasks", oldTasks);
        return oldTasks ? [newTask, ...oldTasks] : [];
      });
      return { prevTasks };
    },
    onError: (_err, _data, context) => {
      console.info("data in err", _data);
      queryClient.setQueryData(["tasks"], context?.prevTasks);
    },
    onSettled: () => queryClient.invalidateQueries(["tasks"]),
  });
};

export default useTasks;
