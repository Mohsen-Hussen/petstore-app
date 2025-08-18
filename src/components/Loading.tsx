import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Loading({ label = "Loading..." }: { label?: string }) {
	return (
		<Stack direction="row" gap={2} alignItems="center" sx={{ p: 2 }}>
			<CircularProgress size={20} />
			<Typography variant="body2">{label}</Typography>
		</Stack>
	);
}
