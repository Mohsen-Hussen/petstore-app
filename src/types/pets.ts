import type { ReactNode } from "react";

export type Pet = {
	id: number;
	name: string;
	status?: "available" | "pending" | "sold";
	photoUrls?: string[];
	category?: { id?: number; name?: string };
	tags?: { id?: number; name?: string }[];
};

export type PetstoreLoginResp = { code: number; type: string; message: string };

export type ErrorBoundaryProps = { children: ReactNode };

export type AuthCtx = {
	isAuthed: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
};

export type ErrorFallbackProps = {
	error: Error;
	reset: () => void;
};

export type LoadingProps = {
	label?: string;
};