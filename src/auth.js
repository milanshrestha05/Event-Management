// src/utils/auth.js

// Save token & role to localStorage
export const loginUser = (token, role = "user") => {
  localStorage.setItem("userToken", token);
  localStorage.setItem("userRole", role); // e.g., "user" or "admin"
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
