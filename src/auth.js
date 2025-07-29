export const loginUser = (token, role = "user") => {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userRole", role); 
};

export const logoutUser = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userRole");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("userToken");
};

export const getUserRole = () => {
  return localStorage.getItem("userRole");
};
