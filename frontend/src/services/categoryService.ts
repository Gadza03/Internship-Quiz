import api from "@/constants/api";
import { API_ENDPOINTS } from "@/constants/constants";
import { Category } from "@/types/Category";

export const fetchAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.CATEGORY.ALL_CATEGORIES);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const response = await api.post(API_ENDPOINTS.CATEGORY.CREATE, {
      name: name,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating new category:", error);
    throw error;
  }
};
