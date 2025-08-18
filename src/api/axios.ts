import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use((config) => {
	config.headers = config.headers ?? {};
	config.headers["api_key"] = import.meta.env.VITE_PETSTORE_API_KEY;
	const token = localStorage.getItem("token");
	if (token) config.headers["Authorization"] = `Bearer ${token}`;
	return config;
});

export default api;
