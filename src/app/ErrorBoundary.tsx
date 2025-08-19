import { type ReactNode } from "react";
import {
	ErrorBoundary as ReactErrorBoundary,
	type FallbackProps,
} from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

type Props = { children: ReactNode };

export function ErrorBoundary({ children }: Props) {
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
