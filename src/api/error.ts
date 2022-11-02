type Error = {
  response?: {
    data?: {
      message: string;
    };
  };
  message?: string;
};

export const setError = (error: Error) => {
  return (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
};
