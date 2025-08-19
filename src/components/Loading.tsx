import { CircularProgress, Stack, Typography } from "@mui/material";
import type { LoadingProps } from "../types/pets";

const Loading = ({ label = "Loading..." }: LoadingProps) => {
	return (
		<Stack direction="row" gap={2} alignItems="center" sx={{ p: 2 }}>
			<CircularProgress size={20} />
			<Typography variant="body2">{label}</Typography>
		</Stack>
	);
};

export default Loading;
