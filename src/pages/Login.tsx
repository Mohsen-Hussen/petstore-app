import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button, Container, TextField, Typography, Paper } from "@mui/material";

function errorToMessage(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	try {
		return JSON.stringify(err);
	} catch {
		return "Login failed";
	}
}

const Login = () => {
	const { login } = useAuth();
	const [username, setUsername] = useState<string>("demo");
	const [password, setPassword] = useState<string>("demo");
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(username, password);
			navigate("/");
		} catch (err: unknown) {
			setError(errorToMessage(err));
		}
	};

	return (
		<Container maxWidth="xs" sx={{ mt: 8 }}>
			<Paper sx={{ p: 3 }}>
				<Typography variant="h5" mb={2}>
					Sign in
				</Typography>
				<form onSubmit={onSubmit}>
					<TextField
						fullWidth
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						margin="normal"
					/>
					<TextField
						fullWidth
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="normal"
					/>
					{error && <Typography color="error">{error}</Typography>}
					<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
						Login
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Login;
