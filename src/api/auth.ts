import api from "./axios";

type PetstoreLoginResp = { code: number; type: string; message: string };

export async function petstoreLogin(username: string, password: string) {
	if (username !== "demo" || password !== "demo") {
		throw new Error("Invalid credentials. Only demo/demo are allowed.");
	}

	const { data } = await api.get<PetstoreLoginResp>("/user/login", {
		params: { username, password },
	});

	return data?.message ?? "petstore-demo-token";
}

export async function petstoreLogout() {
	await api.get("/user/logout");
}
