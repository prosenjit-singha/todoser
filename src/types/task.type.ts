type TaskType = {
  isCompleted: boolean;
  title: string;
  desc: string;
  labels: string[];
  images: {
    fileName: string;
    title: string;
    url: string;
    delete_url: string;
  }[];
};

export default TaskType;
