import PocketBase from "pocketbase";
import type { TypedPocketBase } from "@/types/pocketbase-types";

const pb = new PocketBase(
	process.env.POCKETBASE_URL || "http://localhost:8090",
) as TypedPocketBase;
await pb
	.collection("_superusers")
	.authWithPassword(
		process.env.POCKETBASE_ADMIN_EMAIL!,
		process.env.POCKETBASE_ADMIN_PASSWORD!,
	);

function getPocketBaseInstance() {
	return pb;
}

export default getPocketBaseInstance;
