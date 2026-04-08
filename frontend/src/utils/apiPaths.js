export const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3000/api/v1'
    : 'https://expensetracker-4hy2.onrender.com/api/v1'
export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    GET_USER: `${BASE_URL}/auth/getUser`
  },
  DASHBOARD: {
    GET_DATA: `${BASE_URL}/dashboard`
  },
  INCOME: {
    ADD_INCOME: `${BASE_URL}/income/add`,
    GET_ALL_INCOME: `${BASE_URL}/income/getIncomes`,
    DOWNLOAD_INCOME: `${BASE_URL}/income/downloadexcel`,
    DELETE_INCOME: (incomeId) => `${BASE_URL}/income/${incomeId}`
  },
  EXPENSE: {
    ADD_EXPENSE: `${BASE_URL}/expense/add`,
    GET_ALL_EXPENSE: `${BASE_URL}/expense/getExpenses`,
    DOWNLOAD_EXPENSE: `${BASE_URL}/expense/downloadexcel`,
    DELETE_EXPENSE: (expenseId) => `${BASE_URL}/expense/${expenseId}`
  },
  UPLOAD_IMAGE: `${BASE_URL}/auth/upload-image`
}
