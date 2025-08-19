import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

	const pageVariants = {
		initial: { opacity: 0, y: 50 },
		animate: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.6 }
		},
		exit: { opacity: 0, y: -50, transition: { duration: 0.4 } }
	};

	const paperVariants = {
		initial: { scale: 0.8, opacity: 0 },
		animate: { 
			scale: 1, 
			opacity: 1,
			transition: { delay: 0.2, duration: 0.5 }
		}
	};

	const formVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3
			}
		}
	};

	const fieldVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { 
			opacity: 1, 
			x: 0,
			transition: { duration: 0.4 }
		}
	};

	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<Container maxWidth="xs" sx={{ mt: 8 }}>
				<motion.div variants={paperVariants}>
					<Paper sx={{ p: 3 }}>
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.4 }}
						>
							<Typography variant="h5" mb={2}>
								Sign in
							</Typography>
						</motion.div>
						
						<motion.div
							variants={formVariants}
							initial="hidden"
							animate="visible"
						>
							<form onSubmit={onSubmit}>
							<motion.div variants={fieldVariants}>
								<TextField
									fullWidth
									label="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									margin="normal"
								/>
							</motion.div>
							
							<motion.div variants={fieldVariants}>
								<TextField
									fullWidth
									label="Password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									margin="normal"
								/>
							</motion.div>
							
							{error && (
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3 }}
								>
									<Typography color="error">{error}</Typography>
								</motion.div>
							)}
							
							<motion.div 
								variants={fieldVariants}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
									Login
								</Button>
							</motion.div>
							</form>
						</motion.div>
					</Paper>
				</motion.div>
			</Container>
		</motion.div>
	);
};

export default Login;
