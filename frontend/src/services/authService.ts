import api from "@/constants/api";
import { API_ENDPOINTS } from "@/constants/constants";

export const loginService = async (prompt: string, password: string) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      prompt: prompt,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
      username: username,
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
