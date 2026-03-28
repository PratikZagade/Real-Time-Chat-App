import API from "./axiosConfig";

// ✅ REGISTER API
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res;
};

// ✅ LOGIN API (FIXED 🔥)
export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);

  // ✅ SAVE TOKEN
  localStorage.setItem("token", res.data.token);

  // ✅ SAVE USER
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res;
};

// ✅ LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};