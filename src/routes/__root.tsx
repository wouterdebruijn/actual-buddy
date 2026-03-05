import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import MantineRootProvider from "@/integrations/mantine/root-provider";
import type { TRPCRouter } from "@/integrations/trpc/router";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
	trpc: TRPCOptionsProxy<TRPCRouter>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	notFoundComponent: () => (
		<AppShell.Section className="flex gap-8 flex-col">
			<div className="min-h-50 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">404 - Page Not Found</h1>
				<p className="text-gray-600 mt-2">
					The page you are looking for does not exist.
				</p>
			</div>
		</AppShell.Section>
	),
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<TanStackQueryProvider>
					<MantineRootProvider>
						<AppShell
							padding="md"
							header={{ height: 80 }}
							navbar={{
								width: 150,
								breakpoint: "sm",
								collapsed: { desktop: !opened, mobile: !opened },
							}}
						>
							<div>{children}</div>

							<TanStackDevtools
								config={{
									position: "bottom-right",
								}}
								plugins={[
									{
										name: "Tanstack Router",
										render: <TanStackRouterDevtoolsPanel />,
									},
									TanStackQueryDevtools,
								]}
							/>
						</AppShell>
					</MantineRootProvider>
				</TanStackQueryProvider>
				<Scripts />
			</body>
		</html>
	);
}
