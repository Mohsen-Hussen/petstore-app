import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./queryClient";
import { AuthProvider } from "../auth/AuthProvider";
import { ErrorBoundary } from "./ErrorBoundary";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ErrorBoundary>{children}</ErrorBoundary>
				{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
			</QueryClientProvider>
		</AuthProvider>
	);
}
