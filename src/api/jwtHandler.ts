import api from ".";

type GetAccessTokenProps = {
  payload: {
    uid: string;
    email: string;
  };
  onSuccess?: () => void;
  onError?: () => void;
};

export const getAccessToken = async ({
  payload,
  onSuccess = () => {},
  onError = () => {},
}: GetAccessTokenProps) => {
  try {
    const { data } = await api.post("/get-access-token", payload);
    localStorage.setItem("access-token", data.token);
    onSuccess();
  } catch (err) {
    console.error(err);
    onError();
  }
};
