type TaskType = {
  isCompleted: boolean;
  title: string;
  desc: string;
  label: string[];
  image: {
    url: string;
    name: string;
  }[];
};

export default TaskType;
