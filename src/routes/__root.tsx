import { AppShell, Burger, Button, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import Title from "@/components/basics/Title";
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
							<AppShell.Header>
								<Group className="h-full">
									<Burger
										opened={opened}
										onClick={toggle}
										size="sm"
										className="mx-4"
									/>
									<Group>
										<h1 className="text-xl font-semibold text-primary">
											<Link to="/">
												<Title color="primary">ActualBuddy</Title>
											</Link>
										</h1>
									</Group>
									<Group className="ml-auto pr-6">
										<Link to="/auth/sign-up">
											<Button variant="outline">Sign Up</Button>
										</Link>
										<Link to="/auth/sign-in">
											<Button variant="filled">Sign In</Button>
										</Link>
									</Group>
								</Group>
							</AppShell.Header>

							<AppShell.Navbar>
								<div className="p-4">Navbar content</div>
							</AppShell.Navbar>

							<AppShell.Main>
								<Container size={"xl"} className="pt-8">
									{children}
								</Container>
							</AppShell.Main>

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
