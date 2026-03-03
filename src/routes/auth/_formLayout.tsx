import { createFileRoute, Outlet } from "@tanstack/react-router";
import BrandTitle from "@/components/basic/BrandTitle";
import SectionLine from "@/components/basic/SectionLine";

export const Route = createFileRoute("/auth/_formLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="shadow border-gray-400 p-16 rounded-lg w-lg min-h-128 bg-white">
				<BrandTitle />

				<SectionLine className="py-4" />

				<div>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
