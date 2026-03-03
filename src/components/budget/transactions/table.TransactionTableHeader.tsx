import { Table as MantineTable } from "@mantine/core";
import { type Column, flexRender, type Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import DebouncedInput from "@/components/input/DebounceInput";

export interface TableHeaderProps {
	table: Table<unknown>;
}

function Filter({ column }: { column: Column<any, unknown> }) {
	const columnFilterValue = column.getFilterValue();

	return (
		<DebouncedInput
			type="text"
			value={(columnFilterValue ?? "") as string}
			onChange={(value) => column.setFilterValue(value)}
			placeholder={`Search...`}
		/>
	);
}

export default function TransactionTableHeader({ table }: TableHeaderProps) {
	return (
		<MantineTable.Thead>
			{table.getHeaderGroups().map((headerGroup) => (
				<MantineTable.Tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => {
						return (
							<MantineTable.Th
								key={header.id}
								colSpan={header.colSpan}
								style={
									header.column.columnDef.meta?.fixed
										? {
												width: header.column.getSize(),
											}
										: { maxWidth: 0 }
								}
							>
								{header.isPlaceholder ? null : (
									<>
										<div
											{...{
												className: header.column.getCanSort()
													? "cursor-pointer select-none hover:text-blue-400 transition-colors"
													: "",
												onClick: header.column.getToggleSortingHandler(),
											}}
											style={{
												textAlign:
													header.column.columnDef.meta?.textAlign ?? "left",
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{{
												asc: <ArrowUp className="inline ml-1" size={12} />,
												desc: <ArrowDown className="inline ml-1" size={12} />,
											}[header.column.getIsSorted() as string] ?? null}
										</div>
										{header.column.getCanFilter() ? (
											<div>
												<Filter column={header.column} />
											</div>
										) : null}
									</>
								)}
							</MantineTable.Th>
						);
					})}
				</MantineTable.Tr>
			))}
		</MantineTable.Thead>
	);
}
