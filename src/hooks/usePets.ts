import { useQuery, useMutation } from "@tanstack/react-query";
import { findByStatus, getById, updatePet } from "../api/pets";
import type { Pet } from "../types/pets";

export const usePetsList = (status: string[]) =>
	useQuery({ queryKey: ["pets", status], queryFn: () => findByStatus(status) });

export const usePet = (id: number) =>
	useQuery({ queryKey: ["pet", id], queryFn: () => getById(id) });

export const useUpdatePet = () =>
	useMutation({ mutationFn: (pet: Pet) => updatePet(pet) });
