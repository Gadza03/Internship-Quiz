import { API_BASE_URL } from "./api";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `/auth/login`,
    REGISTER: `/auth/register`,
  },
  QUIZ: {
    ALL_QUIZZES: `${API_BASE_URL}/quiz`,
    SEARCH: `/quiz/search`,
    SINGLE: (id: string) => `/quiz/${id}`,
    CREATE: `/quiz`,
  },
  USER: {
    RANKING: `/user/ranking`,
  },
  CATEGORY: {
    ALL_CATEGORIES: `/category`,
    CREATE: `/category`,
  },
  QUIZ_RESULTS: {
    CREATE: `/quiz-result`,
  },
};
