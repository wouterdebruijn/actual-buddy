import { Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import z from "zod";
import TransactionTable from "@/components/transactions/TransactionTable";
import { useAppForm } from "@/hooks/demo.form";
import { useTRPC } from "@/integrations/trpc/react";

const schema = z.object({
	accountId: z.string().nonempty("Account is required"),
});

export interface ActualAccountSelectionProps {
	setAccountId: (accountId: string) => void;
}

export default function ActualAccountSelection({
	setAccountId,
}: ActualAccountSelectionProps) {
	const trpcClient = useTRPC();

	const { data: availableAccounts } = useQuery({
		...trpcClient.actual.accounts.list.queryOptions(),
		initialData: [],
	});

	const form = useAppForm({
		defaultValues: {
			accountId: "",
		},
		validators: {
			onBlur: schema,
		},
		onSubmit: ({ value }) => {
			setAccountId(value.accountId);
		},
	});

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-6"
			>
				<form.AppField name="accountId">
					{(field) => (
						<field.Select
							label="Account"
							values={availableAccounts.map((account) => ({
								label: account.name,
								value: account.id,
							}))}
						/>
					)}
				</form.AppField>

				<div className="flex justify-end">
					<form.AppForm>
						<form.SubscribeButton label="Submit" />
					</form.AppForm>
				</div>
			</form>
		</div>
	);
}
