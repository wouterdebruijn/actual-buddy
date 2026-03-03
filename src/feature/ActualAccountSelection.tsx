import z from "zod";
import { useAppForm } from "@/hooks/demo.form";
import type { APIAccountEntity } from "@/types/actual";

const schema = z.object({
	accountId: z.string().nonempty("Account is required"),
});

export interface ActualAccountSelectionProps {
	accounts: APIAccountEntity[];
	setAccountId: (accountId: string) => void;
}

export default function ActualAccountSelection({
	accounts,
	setAccountId,
}: ActualAccountSelectionProps) {
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
						values={accounts.map((account) => ({
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
