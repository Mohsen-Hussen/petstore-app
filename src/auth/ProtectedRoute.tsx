import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProtectedRoute() {
	const { isAuthed } = useAuth();

	if (!isAuthed) {
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
