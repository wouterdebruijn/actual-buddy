import { createAuthClient } from "better-auth/react";

const { getSession, useSession, signIn, signUp, signOut } = createAuthClient({
	plugins: [],
});

export { getSession, useSession, signIn, signUp, signOut };
