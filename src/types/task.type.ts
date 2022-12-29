type TaskType = {
  isCompleted: boolean;
  title: string;
  details: string;
  labels: string[];
  comment: string;
  images: {
    fileName: string;
    title: string;
    url: string;
    delete_url: string;
  }[];
};

export default TaskType;
