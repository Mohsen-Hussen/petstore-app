export type Pet = {
	id: number;
	name: string;
	status?: "available" | "pending" | "sold";
	photoUrls?: string[];
	category?: { id?: number; name?: string };
	tags?: { id?: number; name?: string }[];
};
