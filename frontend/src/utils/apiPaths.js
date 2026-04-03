export const BASE_URL = 'http://localhost:3000/api/v1'
export const API_PATHS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`
  },
  DASHBOARD: {
    GET_DATA: `${BASE_URL}/dashboard/getDashboardData`
  },
  INCOME: {
    ADD_INCOME: `${BASE_URL}/income/add`,
    GET_ALL_INCOME: `${BASE_URL}/income/get`,
    DOWNLOAD_INCOME: `${BASE_URL}/income/downloadIncomeExcel`,
    DELETE_INCOME: (incomeId) => `${BASE_URL}/income/${incomeId}`
  },
  EXPENSE: {
    ADD_EXPENSE: `${BASE_URL}/expense/add`,
    GET_ALL_EXPENSE: `${BASE_URL}/expense/get`,
    DOWNLOAD_EXPENSE: `${BASE_URL}/expense/downloadExpenseExcel`,
    DELETE_EXPENSE: (expenseId) => `${BASE_URL}/expense/${expenseId}`
  },
  UPLOAD_IMAGE: `${BASE_URL}/auth/upload-image`
}
