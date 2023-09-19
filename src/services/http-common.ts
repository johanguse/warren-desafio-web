import axios from "axios";

const api = axios.create({
  baseURL: "https://api-go-lang-transations.fly.dev/api/",
});

export default api;
