export const validateEmail = (email) => {
  const regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm
  return regex.test(email)
}
