import { AppShell, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import SectionLine from "@/components/basic/SectionLine";
import Title from "@/components/basic/Title";
import ActualTransactionTable from "@/feature/ActualTransactionTable";
import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/_authed/_layout/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			context.trpc.actual.accounts.list.queryOptions(),
		);
	},
});

function RouteComponent() {
	const trpc = useTRPC();
	const { user } = Route.useRouteContext();

	const { data: actualBudgetAccounts } = useQuery(
		trpc.actual.accounts.list.queryOptions(),
	);

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

			<ActualTransactionTable accounts={actualBudgetAccounts ?? []} />
		</AppShell.Section>
	);
}
