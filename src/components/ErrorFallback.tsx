import { Alert, Button, Stack } from "@mui/material";

const ErrorFallback = ({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) => {
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
