import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import TaskType from "../types/task.type";

type UpdateDeleteTaskProps = {
  uid: string;
  newTask: TaskType;
  tasks: TaskType[];
  index: number;
};

type UpdateTasksProps = {
  uid: string;
  newTask: TaskType;
  tasks: TaskType[];
  index: number;
  operation: "update" | "add" | "delete";
};

const updateTasks = async ({
  uid,
  newTask,
  tasks,
  index,
  operation,
}: UpdateTasksProps) => {
  let payload: TaskType[] = [];
  if (operation === "add") payload = [newTask, ...tasks];
  if (operation === "delete") payload = tasks.filter((_task, i) => i !== index);
  if (operation === "update")
    payload = tasks.map((task, i) => (i === index ? newTask : task));
  return await api.post(`/tasks?uid=${uid}`, payload);
};

const useTasks = () => {
  // if (!uid) console.info("No uid");
  const { user } = useAuth();
  const uid = (user && user.uid) || "";
  return useQuery({
    queryKey: ["tasks", (user && user.uid) || ""],
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

export const useMutateTasks = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTasks, {
    onMutate: async ({ newTask, uid }: UpdateTasksProps) => {
      await queryClient.cancelQueries(["tasks"]);
      const prevTasks = queryClient.getQueryData(["tasks", uid]);
      queryClient.setQueryData<TaskType[]>(["tasks", uid], (oldTasks = []) => {
        return [newTask, ...oldTasks];
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
