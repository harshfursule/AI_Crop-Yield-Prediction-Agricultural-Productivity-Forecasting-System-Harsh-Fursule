import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post(
    "/api/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post(
    "/api/auth/login",
    loginData
  );

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
