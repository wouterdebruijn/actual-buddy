import { Checkbox, Table } from "@mantine/core";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";
import { useMemo } from "react";
import type {
	ActualTransaction,
	AnyAPICategoryEntity,
	APIPayeeEntity,
} from "@/types/actual";
import TransactionTableHeader from "./table.TransactionTableHeader";

declare module "@tanstack/react-table" {
	// biome-ignore lint/correctness/noUnusedVariables: dunno yet
	interface ColumnMeta<TData, TValue> {
		fixed?: boolean;
		textAlign?: "left" | "right" | "center";
	}
}

export interface TransactionTableProps {
	transactions: ActualTransaction[];
}

export default function TransactionTable({
	transactions,
}: TransactionTableProps) {
	const columns = useMemo<ColumnDef<ActualTransaction, unknown>[]>(
		() => [
			{
				header: "Select",
				size: 50,
				meta: { fixed: true },
				cell: () => {
					return <Checkbox type="checkbox" />;
				},
			},
			{
				accessorKey: "date",
				header: "Date",
				size: 110,
				meta: { fixed: true },
				cell: ({ getValue }) => {
					const date = getValue<string>();
					return new Date(date).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					});
				},
			},
			{
				accessorKey: "payee",
				header: "Payee",
				cell: ({ getValue }) => {
					const payee = getValue<APIPayeeEntity>();
					return payee ? payee.name : "No Payee";
				},
			},
			{
				accessorKey: "notes",
				header: "Notes",
			},
			{
				accessorKey: "category",
				header: "Category",
				cell: ({ getValue }) => {
					const category = getValue<AnyAPICategoryEntity>();
					return category ? category.name : "No Category";
				},
			},
			{
				accessorKey: "amount",
				header: "Amount",
				size: 120,
				meta: { fixed: true, textAlign: "right" },
				cell: ({ getValue }) => {
					const amount = getValue<number>() / 100;
					return new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "EUR",
					}).format(amount);
				},
			},
			{
				accessorKey: "cleared",
				header: "",
				size: 40,
				meta: { fixed: true },
				cell: ({ getValue }) => {
					const cleared = getValue<boolean>();
					return cleared ? (
						<CheckCircle2 className="w-5 h-5 text-green-600" />
					) : (
						<XCircle className="w-5 h-5 text-red-600" />
					);
				},
				filterFn: "equals",
			},
		],
		[],
	);

	const table = useReactTable({
		data: transactions,
		columns,
		filterFns: {
			fuzzy: () => false,
		},
		getCoreRowModel: getCoreRowModel(),
		enableFilters: false,
	});

	return (
		<Table
			striped
			highlightOnHover
			style={{ tableLayout: "fixed", width: "100%" }}
		>
			<TransactionTableHeader table={table} />

			<Table.Tbody>
				{table.getRowModel().rows.map((row) => {
					return (
						<Table.Tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return (
									<Table.Td
										key={cell.id}
										style={
											cell.column.columnDef.meta?.fixed
												? {
														width: cell.column.getSize(),
													}
												: { maxWidth: 0 }
										}
									>
										<div
											className="truncate"
											style={{
												textAlign: cell.column.columnDef.meta?.textAlign,
											}}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</div>
									</Table.Td>
								);
							})}
						</Table.Tr>
					);
				})}
			</Table.Tbody>
		</Table>
	);
}
