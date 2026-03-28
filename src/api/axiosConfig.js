import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Add token only for protected APIs
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // ❗ Skip token for login & register
  if (
    token &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/register")
  ) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;