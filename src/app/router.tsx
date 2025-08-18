import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";
import PetsList from "../pages/PetsList";
import PetDetails from "../pages/PetDetails";
import PetEdit from "../pages/PetEdit";

export const router = createBrowserRouter([
	{ path: "/login", element: <Login /> },
	{
		element: <ProtectedRoute />,
		children: [
			{ path: "/", element: <PetsList /> },
			{ path: "/pets/:id", element: <PetDetails /> },
			{ path: "/pets/:id/edit", element: <PetEdit /> },
		],
	},
]);
