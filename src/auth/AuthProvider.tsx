import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { petstoreLogin, petstoreLogout } from "../api/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthed, setIsAuthed] = useState<boolean>(
		() => !!localStorage.getItem("token")
	);

	const login = async (username: string, password: string) => {
		const token = await petstoreLogin(username, password);
		localStorage.setItem("token", token);
		setIsAuthed(true);
	};

	const logout = async () => {
		try {
			await petstoreLogout();
		} finally {
			localStorage.removeItem("token");
			setIsAuthed(false);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthed, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
