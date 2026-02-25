import { Group, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export default function Header() {
	return (
		<Group className="bg-cyan-950 h-full">
			<h1 className="ml-4 text-xl font-semibold">
				<Link to="/">
					<img
						src="/tanstack-word-logo-white.svg"
						alt="TanStack Logo"
						className="h-10"
					/>
				</Link>
			</h1>
			<Title className="ml-4 text-white">ActualBuddy</Title>
		</Group>
	);
}
