import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import TaskType from "../types/task.type";

type DefaultProps = {
  tasks: TaskType[];
  operation: "update" | "add" | "delete";
};

type AddProps = DefaultProps & {
  newTask: TaskType;
  index?: never;
};

type DeleteProps = DefaultProps & {
  index: number;
  newTask?: never;
};

type UpdateProps = DefaultProps & {
  index: number;
  newTask: TaskType;
};

type UpdateTasksProps = {
  tasks: TaskType[];
  operation: "update" | "add" | "delete";
  uid: string;
  newTask: TaskType | undefined;
  index: number | undefined;
};

type MutateProps = AddProps | DeleteProps | UpdateProps;

const updateTasks = async ({
  uid,
  newTask,
  index,
  operation,
  tasks,
}: UpdateTasksProps) => {
  let payload: TaskType[] = [];
  if (operation === "add" && newTask) payload = [newTask, ...tasks];
  if (operation === "delete") payload = tasks.filter((_task, i) => i !== index);
  if (operation === "update" && newTask)
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
      return data ? data : [];
    },

    enabled: !!uid,
    refetchOnMount: false,
  });
};

export const useMutateTasks = () => {
  const { user } = useAuth();
  const uid = (user && user.uid) || "";
  const queryClient = useQueryClient();

  return useMutation(
    (props: MutateProps) =>
      updateTasks({
        uid,
        index: props.index,
        newTask: props.newTask,
        operation: props.operation,
        tasks: props.tasks,
      }),
    {
      onMutate: async ({ newTask, operation, index }: MutateProps) => {
        await queryClient.cancelQueries(["tasks"]);
        const prevTasks = queryClient.getQueryData<TaskType[]>(["tasks", uid]);
        queryClient.setQueryData<TaskType[]>(
          ["tasks", uid],
          (oldTasks = []) => {
            if (operation === "add" && newTask) return [newTask, ...oldTasks];
            if (operation === "delete")
              return oldTasks.filter((_task, i) => i !== index);
            if (operation === "update" && newTask)
              return oldTasks.map((task, i) => (i === index ? newTask : task));
          }
        );
        return { prevTasks };
      },
      onError: (_err, _data, context) => {
        console.info("data in err", _data);
        queryClient.setQueryData(["tasks"], context?.prevTasks);
      },
      onSettled: () => queryClient.invalidateQueries(["tasks"]),
    }
  );
};

export default useTasks;
