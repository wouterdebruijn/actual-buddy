import { AppShell, Container } from "@mantine/core";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/ui/Header";

export const Route = createFileRoute("/_authed/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();

	return (
		<div>
			<AppShell.Header>
				<Header user={user} />
			</AppShell.Header>

			<AppShell.Navbar>
				<div className="p-4">Navbar content</div>
			</AppShell.Navbar>

			<AppShell.Main>
				<Container size={"xl"} className="pt-8">
					<Outlet />
				</Container>
			</AppShell.Main>
		</div>
	);
}
