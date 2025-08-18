import { useMemo, useState } from "react";
import { usePetsList } from "../hooks/usePets";
import {
	Container,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	CircularProgress,
	Button,
	Box,
} from "@mui/material";
import PetCard from "../components/PetCard";

const PetsList = () => {
	const [status, setStatus] = useState<string[]>(["available"]);
	const [query, setQuery] = useState<string>("");
	const { data, isLoading, error, refetch } = usePetsList(status);

	const filtered = useMemo(() => {
		if (!Array.isArray(data)) return [];
		return data.filter((p) =>
			p.name?.toLowerCase().includes(query.toLowerCase())
		);
	}, [data, query]);

	const onStatusChange = (_: unknown, v: string[]) => {
		if (v?.length) setStatus(v);
	};

	const handleRefresh = () => {
		refetch();
	};

	return (
		<Container sx={{ py: 3 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
					flexWrap: "wrap",
					mb: 3,
				}}
			>
				<ToggleButtonGroup value={status} onChange={onStatusChange} color="secondary">
					{["available", "pending", "sold"].map((s) => (
						<ToggleButton key={s} value={s}>
							{s}
						</ToggleButton>
					))}
				</ToggleButtonGroup>

				<TextField
					sx={{ width: 320 }}
					placeholder="Search by name..."
					value={query}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setQuery(e.target.value)
					}
				/>

				<Button
					variant="contained"
					onClick={handleRefresh}
					disabled={isLoading}
				>
					Refresh Pets
				</Button>

				{isLoading && <CircularProgress />}
			</Box>

			{error && <div>Error loading pets</div>}

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
					gap: "16px",
					marginTop: "16px",
				}}
			>
				{filtered.map((p, i) => (
					<PetCard key={`${String(p.id)}-${i}`} pet={p} />
				))}
			</div>
		</Container>
	);
};

export default PetsList;
