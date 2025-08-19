import { useEffect, useMemo, useState } from "react";
import { usePetsList } from "../hooks/usePets";
import { motion } from "framer-motion";
import PetCard from "../components/PetCard";
import {
	Container,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	CircularProgress,
	Button,
	Box,
	Pagination,
	Stack,
	MenuItem,
} from "@mui/material";

const PetsList = () => {
	const [status, setStatus] = useState<string[]>(["available"]);
	const [query, setQuery] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(12);

	const { data, isLoading, error, refetch } = usePetsList(status);

	const filtered = useMemo(() => {
		if (!Array.isArray(data)) return [];
		return data.filter((p) =>
			p.name?.toLowerCase().includes(query.toLowerCase())
		);
	}, [data, query]);

	useEffect(() => {
		setPage(1);
	}, [status, query]);

	const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
	const current = useMemo(() => {
		const start = (page - 1) * pageSize;
		return filtered.slice(start, start + pageSize);
	}, [filtered, page, pageSize]);

	const onStatusChange = (_: unknown, v: string[]) => {
		if (v?.length) setStatus(v);
	};

	const handleRefresh = () => refetch();

	const pageVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.4, staggerChildren: 0.1 }
		},
		exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
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
				<ToggleButtonGroup
					value={status}
					onChange={onStatusChange}
					color="secondary"
				>
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

			{error && <Box>Error loading pets</Box>}
			{!isLoading && !error && filtered.length === 0 && (
				<Box>No pets found.</Box>
			)}

			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
					gap: "16px",
					marginTop: "16px",
				}}
			>
				{current.map((p, i) => (
					<PetCard key={`${String(p.id)}-${i}`} pet={p} />
				))}
			</motion.div>

			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent="center"
				sx={{ mt: 3 }}
			>
				<Pagination
					count={pageCount}
					page={page}
					onChange={(_, v) => setPage(v)}
					color="primary"
					siblingCount={0}
				/>
				<TextField
					select
					size="small"
					label="Per page"
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
					sx={{ width: 110 }}
				>
					{[6, 12, 24, 48].map((n) => (
						<MenuItem key={n} value={n}>
							{n}
						</MenuItem>
					))}
				</TextField>
				<Box sx={{ fontSize: 14, color: "text.secondary" }}>
					{filtered.length} items • page {page} / {pageCount}
				</Box>
			</Stack>
		</Container>
		</motion.div>
	);
};

export default PetsList;
