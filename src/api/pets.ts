import api from "./axios";
import type { Pet } from "../types/pets";

export async function findByStatus(status: string[]) {
	const params = new URLSearchParams();
	(Array.isArray(status) ? status : [status]).forEach((s) =>
		params.append("status", s)
	);
	const { data } = await api.get<Pet[]>("/pet/findByStatus", { params });
	return data;
}

export async function getById(id: number) {
	const { data } = await api.get<Pet>(`/pet/${id}`);
	return data;
}

export async function updatePet(pet: Pet) {
	const { data } = await api.put<Pet>("/pet", pet);
	return data;
}
