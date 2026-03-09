import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import type { AuthenticatedUser } from "@/types/auth";
import BrandTitle from "../basic/BrandTitle";
import HeaderProfileMenu from "./Header.ProfileMenu";

interface HeaderProps {
	user: AuthenticatedUser | null;
}

export default function Header({ user }: HeaderProps) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<Group className="h-full">
			<Burger opened={opened} onClick={toggle} size="sm" className="mx-4" />
			<Group>
				<Link to="/">
					<BrandTitle />
				</Link>
			</Group>

			<Group className="ml-auto pr-6">
				<HeaderProfileMenu user={user} />
			</Group>
		</Group>
	);
}
