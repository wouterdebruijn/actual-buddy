import type ActualAppApi from "@actual-app/api";

export type ActualApp = typeof ActualAppApi;

export type TransactionEntity = Awaited<
	ReturnType<ActualApp["getTransactions"]>
>[number];

export type APIPayeeEntity = Awaited<
	ReturnType<ActualApp["getPayees"]>
>[number];

export type AnyAPICategoryEntity = Awaited<
	ReturnType<ActualApp["getCategories"]>
>[number];

export type APIAccountEntity = Awaited<
	ReturnType<ActualApp["getAccounts"]>
>[number];

export type ActualTransaction = Omit<
	TransactionEntity,
	"payee" | "category"
> & {
	payee: APIPayeeEntity | null;
	category: AnyAPICategoryEntity | null;
};
