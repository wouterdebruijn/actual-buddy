import { Button, Card, Group, Select, Stack, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTRPC } from "@/integrations/trpc/react";
import type { APIAccountEntity } from "@/types/actual";

export interface BudgetOnboardingProps {
	accounts: APIAccountEntity[];
}

export default function BudgetOnboarding({ accounts }: BudgetOnboardingProps) {
	const trpc = useTRPC();
	const [selectedBudgetId, setSelectedBudgetId] = useState<string>("");

	const { mutate: createBudget, isPending } = useMutation({
		...trpc.pocketbase.user.budget.create.mutationOptions(),
		onSuccess: () => {
			// Refetch the budget list to update the UI
			window.location.reload();
		},
	});

	const handleLinkBudget = () => {
		if (!selectedBudgetId) return;
		createBudget({ budgetId: selectedBudgetId });
	};

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Stack gap="md">
				<div>
					<Title order={3}>Welcome to ActualBuddy! 🎉</Title>
					<Text size="sm" c="dimmed" mt="xs">
						To get started, link your Actual Budget account to your profile.
					</Text>
				</div>

				<Select
					label="Select your Actual Budget account"
					placeholder="Choose an account"
					data={accounts.map((account) => ({
						label: account.name,
						value: account.id,
					}))}
					value={selectedBudgetId}
					onChange={(value) => setSelectedBudgetId(value || "")}
				/>

				<Group justify="flex-end">
					<Button
						onClick={handleLinkBudget}
						disabled={!selectedBudgetId || isPending}
						loading={isPending}
					>
						Link Account
					</Button>
				</Group>
			</Stack>
		</Card>
	);
}
