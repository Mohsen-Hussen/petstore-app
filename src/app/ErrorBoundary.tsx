import { Component, type JSX, type ReactNode } from "react";

type Props = {
	children: ReactNode;
	Fallback: (props: { error: Error; reset: () => void }) => JSX.Element;
};
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false };
	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}
	reset = () => this.setState({ hasError: false, error: undefined });
	render() {
		if (this.state.hasError && this.state.error)
			return this.props.Fallback({
				error: this.state.error,
				reset: this.reset,
			});
		return this.props.children;
	}
}
