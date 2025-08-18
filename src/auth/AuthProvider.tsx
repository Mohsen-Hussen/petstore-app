import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthed, setIsAuthed] = useState<boolean>(
		() => !!localStorage.getItem("token")
	);

	const login = async (username: string, password: string) => {
		try {
			const res = await fetch(
				`${
					import.meta.env.VITE_API_BASE_URL
				}/user/login?username=${encodeURIComponent(
					username
				)}&password=${encodeURIComponent(password)}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!res.ok) {
				throw new Error("Invalid credentials");
			}
			const contentType = res.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new Error("Server returned non-JSON response");
			}

			const data = await res.json();
			const token = data?.message ?? "petstore-demo-token";
			localStorage.setItem("token", token);
			setIsAuthed(true);
		} catch {
			if (username === "demo" && password === "demo") {
				const token = "petstore-demo-token";
				localStorage.setItem("token", token);
				setIsAuthed(true);
			} else {
				throw new Error("Invalid credentials. Use demo/demo for mock login.");
			}
		}
	};

	function logout() {
		localStorage.removeItem("token");
		setIsAuthed(false);
	}

	return (
		<AuthContext.Provider value={{ isAuthed, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
