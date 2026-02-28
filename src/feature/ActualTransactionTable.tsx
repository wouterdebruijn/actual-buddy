import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Title from "@/components/basics/Title";
import TransactionTable from "@/components/transactions/TransactionTable";
import { useTRPC } from "@/integrations/trpc/react";
import ActualAccountSelection from "./ActualAccountSelection";

export default function ActualTransactionTable() {
	const trpcClient = useTRPC();

	const [accountId, setAccountId] = useState<string | null>(null);

	const currentDate = new Date();
	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(currentDate.getMonth() - 1);

	const [startDate, setStartDate] = useState<string>(
		new Date(oneMonthAgo).toLocaleDateString("en-CA"),
	);
	const [endDate, setEndDate] = useState<string>(
		new Date(currentDate).toLocaleDateString("en-CA"),
	);

	const { data: transactions } = useQuery({
		...trpcClient.actual.transactions.list.queryOptions({
			accountId: accountId ?? "",
			startDate,
			endDate,
		}),
		initialData: [],
		enabled: !!accountId,
	});

	const { data: payees } = useQuery({
		...trpcClient.actual.transactions.payees.list.queryOptions(),
		initialData: [],
		enabled: !!accountId,
	});

	const { data: categories } = useQuery({
		...trpcClient.actual.transactions.categories.list.queryOptions(),
		initialData: [],
		enabled: !!accountId,
	});

	const richTransactions = useMemo(() => {
		if (!transactions || !payees || !categories) return [];

		return transactions.map((transaction) => {
			const payee = payees.find((p) => p.id === transaction.payee) ?? null;
			const category =
				categories.find((c) => c.id === transaction.category) ?? null;

			return {
				...transaction,
				payee,
				category,
			};
		});
	}, [transactions, payees, categories]);

	return (
		<Stack>
			<Title color="text">Actual Transactions</Title>
			<ActualAccountSelection setAccountId={setAccountId} />

			<TransactionTable transactions={richTransactions}></TransactionTable>
		</Stack>
	);
}
