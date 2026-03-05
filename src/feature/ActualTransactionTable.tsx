import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Title from "@/components/basic/Title";
import TransactionTable from "@/components/budget/transactions/TransactionTable";
import { useTRPC } from "@/integrations/trpc/react";

interface ActualTransactionTableProps {
	accountId?: string;
	startDate?: string;
	endDate?: string;
}

export default function ActualTransactionTable({
	accountId,
	startDate,
	endDate,
}: ActualTransactionTableProps) {
	const trpcClient = useTRPC();

	const currentDate = new Date();
	const oneMonthAgo = new Date();
	oneMonthAgo.setMonth(currentDate.getMonth() - 1);

	const defaultStartDate = new Date(oneMonthAgo).toLocaleDateString("en-CA");
	const defaultEndDate = new Date(currentDate).toLocaleDateString("en-CA");

	const { data: transactions } = useQuery({
		...trpcClient.actual.transactions.list.queryOptions({
			accountId: accountId ?? "",
			startDate: startDate ?? defaultStartDate,
			endDate: endDate ?? defaultEndDate,
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

			<TransactionTable transactions={richTransactions}></TransactionTable>
		</Stack>
	);
}
