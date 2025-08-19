import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate, useLocation, useMatch } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const detailsMatch = useMatch("/pets/:id");
	const editMatch = useMatch("/pets/:id/edit");
	const petId = detailsMatch?.params.id || editMatch?.params.id;

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const isActive = (path: string) => location.pathname === path;

	return (
		<AppBar position="static" sx={{ mb: 2 }}>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Pet Store
				</Typography>

				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<Button
						color="inherit"
						component={Link}
						to="/"
						sx={{
							backgroundColor: isActive("/")
								? "rgba(255,255,255,0.1)"
								: "transparent",
							"&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
						}}
					>
						Pets List
					</Button>

					{detailsMatch && petId && (
						<Button
							color="inherit"
							component={Link}
							to={`/pets/${petId}/edit`}
							sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
						>
							Edit Pet
						</Button>
					)}

					{editMatch && petId && (
						<Button
							color="inherit"
							component={Link}
							to={`/pets/${petId}`}
							sx={{ "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
						>
							View Pet
						</Button>
					)}

					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
