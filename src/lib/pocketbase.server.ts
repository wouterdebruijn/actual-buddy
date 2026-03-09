import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/types/pocketbase-types";

const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
	throw new Error(
		"POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD environment variables must be set",
	);
}

const pb = new PocketBase(
	process.env.POCKETBASE_URL || "http://localhost:8090",
) as TypedPocketBase;
await pb
	.collection("_superusers")
	.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

function getPocketBaseInstance() {
	return pb;
}

export default getPocketBaseInstance;
