import { Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import ActualTransactionTable from "@/feature/ActualTransactionTable";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div>
			<Title>Dashboard</Title>
			<Text>
				Welcome to the ActualBuddy dashboard! Here you can view your financial
				data and split payments with friends. Use the navigation menu to explore
				different features and manage your accounts.
			</Text>

			<ActualTransactionTable />
		</div>
	);
}
