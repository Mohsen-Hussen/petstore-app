import { Alert, Button, Stack } from "@mui/material";
import type { ErrorFallbackProps } from "../types/pets";

const ErrorFallback = ({ error, reset }: ErrorFallbackProps) => {
	return (
		<Stack sx={{ m: 2 }} gap={1}>
			<Alert severity="error">{error.message}</Alert>
			<Button onClick={reset} variant="outlined">
				Try again
			</Button>
		</Stack>
	);
};

export default ErrorFallback;
