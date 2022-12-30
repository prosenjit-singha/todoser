export type Image = {
  fileName: string;
  title: string;
  url: string;
  delete_url: string;
};

type TaskType = {
  isCompleted: boolean;
  title: string;
  details: string;
  labels: string[];
  comment: string;
  images: Image[];
};

export default TaskType;
