import { useQuery } from "@tanstack/react-query";
import z from "zod";
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
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex items-end gap-4 justify-items-start"
		>
			<form.AppField name="accountId">
				{(field) => (
					<field.Select
						className="w-full"
						label="Account"
						values={availableAccounts.map((account) => ({
							label: account.name,
							value: account.id,
						}))}
					/>
				)}
			</form.AppField>

			<div className="self-start mt-6">
				<form.AppForm>
					<form.SubscribeButton label="Submit" />
				</form.AppForm>
			</div>
		</form>
	);
}
