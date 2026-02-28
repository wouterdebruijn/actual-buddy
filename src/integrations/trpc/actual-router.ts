import actualAppApi from "@actual-app/api";
import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { publicProcedure } from "./init";

const actualInstance = actualAppApi;

async function initActualInstance() {
	try {
		const accounts = await actualInstance.getAccounts();
		if (accounts && accounts.length > 0) {
			return actualInstance;
		}
	} catch {}

	const actualBudgetPassword = process.env.ACTUAL_BUDGET_PASSWORD;

	if (!actualBudgetPassword) {
		throw new Error("ACTUAL_BUDGET_PASSWORD environment variable is not set");
	}

	const actualBudgetURL = process.env.ACTUAL_BUDGET_URL;

	if (!actualBudgetURL) {
		throw new Error("ACTUAL_BUDGET_URL environment variable is not set");
	}

	console.log(`Using Actual API server URL: ${actualBudgetURL}`);

	try {
		await actualInstance.init({
			serverURL: actualBudgetURL,
			password: actualBudgetPassword,
			dataDir: "./actual-budget-data",
		});

		await actualInstance.downloadBudget("d901fce3-4bf1-4c17-9287-f86b70543978");

		return actualInstance;
	} catch (error) {
		console.error("Failed to initialize Actual API:", error);
		throw new Error("Failed to initialize Actual API");
	}
}

const actualRouter = {
	accounts: {
		list: publicProcedure.query(async () => {
			const instance = await initActualInstance();
			const accounts = await instance.getAccounts();
			return accounts;
		}),
	},
	transactions: {
		list: publicProcedure
			.input(
				z.object({
					accountId: z.string(),
					startDate: z.string(),
					endDate: z.string(),
				}),
			)
			.query(async ({ input }) => {
				const instance = await initActualInstance();
				const transactions = await instance.getTransactions(
					input.accountId,
					input.startDate,
					input.endDate,
				);
				return transactions;
			}),
		payees: {
			list: publicProcedure.query(async () => {
				const instance = await initActualInstance();
				const payees = await instance.getPayees();
				return payees;
			}),
		},
		categories: {
			list: publicProcedure.query(async () => {
				const instance = await initActualInstance();
				const categories = await instance.getCategories();
				return categories;
			}),
		},
	},
} satisfies TRPCRouterRecord;

export default actualRouter;
