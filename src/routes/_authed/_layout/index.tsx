import { AppShell, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import SectionLine from "@/components/basic/SectionLine";
import Title from "@/components/basic/Title";
import ActualAccountSelection from "@/feature/ActualAccountSelection";
import ActualTransactionTable from "@/feature/ActualTransactionTable";

export const Route = createFileRoute("/_authed/_layout/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			context.trpc.pocketbase.user.budget.list.queryOptions(),
		);
		await context.queryClient.ensureQueryData(
			context.trpc.actual.accounts.list.queryOptions(),
		);
	},
	errorComponent: (e) => (
		<AppShell.Section className="flex gap-8 flex-col">
			<Stack align="center" justify="center" className="min-h-50">
				<Text c="red" size="lg">
					An error occurred while loading your dashboard. Please try again
					later.
				</Text>
				<Text c="dimmed">{e.error.message}</Text>
			</Stack>
		</AppShell.Section>
	),
});

function RouteComponent() {
	const { user, trpc } = Route.useRouteContext();

	const { data: pocketBaseBudgets } = useQuery(
		trpc.pocketbase.user.budget.list.queryOptions(),
	);

	const { data: actualBudgetAccounts } = useQuery(
		trpc.actual.accounts.list.queryOptions(),
	);

	const [accountId, setAccountId] = useState<string | undefined>(
		pocketBaseBudgets?.[0]?.budgetId,
	);

	// Filter actualBudgetAccounts based on pocketBaseBudgets' budgetId values
	const filteredAccounts = useMemo(() => {
		if (!pocketBaseBudgets || !actualBudgetAccounts) return [];

		const linkedBudgetIds = pocketBaseBudgets
			.map((budget) => budget.budgetId)
			.filter((id): id is string => !!id);

		return actualBudgetAccounts.filter((account) =>
			linkedBudgetIds.includes(account.id),
		);
	}, [pocketBaseBudgets, actualBudgetAccounts]);

	return (
		<AppShell.Section className="flex gap-8 flex-col">
			<Stack>
				<Title color="text">Dashboard</Title>
				<Text>
					Welcome to the ActualBuddy dashboard! Here you can view your financial
					data and split payments with friends. Use the navigation menu to
					explore different features and manage your accounts.{" "}
				</Text>
				{user && (
					<Text>
						Logged in as: {user.name} ({user.email})
					</Text>
				)}
			</Stack>

			<SectionLine />

			<ActualAccountSelection
				accounts={filteredAccounts}
				accountId={accountId}
				setAccountId={setAccountId}
			/>

			<ActualTransactionTable accountId={accountId} />
		</AppShell.Section>
	);
}
