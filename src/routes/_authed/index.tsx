import { AppShell, Stack, Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import SectionLine from "@/components/basics/SectionLine";
import Title from "@/components/basics/Title";
import ActualTransactionTable from "@/feature/ActualTransactionTable";

export const Route = createFileRoute("/_authed/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<AppShell.Section className="flex gap-8 flex-col">
			<Stack>
				<Title color="text">Dashboard</Title>
				<Text>
					Welcome to the ActualBuddy dashboard! Here you can view your financial
					data and split payments with friends. Use the navigation menu to
					explore different features and manage your accounts.
				</Text>
				{user && (
					<Text>
						Logged in as: {user.name} ({user.email})
					</Text>
				)}
			</Stack>

			<SectionLine />

			<ActualTransactionTable />
		</AppShell.Section>
	);
}
