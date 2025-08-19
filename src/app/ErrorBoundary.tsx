import {
	ErrorBoundary as ReactErrorBoundary,
	type FallbackProps,
} from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";
import type { ErrorBoundaryProps } from "../types/pets";


export function ErrorBoundary({ children }: ErrorBoundaryProps) {
	return (
		<ReactErrorBoundary
			FallbackComponent={({ error, resetErrorBoundary }: FallbackProps) => (
				<ErrorFallback error={error} reset={resetErrorBoundary} />
			)}
		>
			{children}
		</ReactErrorBoundary>
	);
}
