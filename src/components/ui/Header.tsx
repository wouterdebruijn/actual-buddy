import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import BrandTitle from "../basic/BrandTitle";
import HeaderAuthButtons from "./Header.AuthButtons";

interface HeaderProps {
	showAuthButtons?: boolean;
}

export default function Header({ showAuthButtons = true }: HeaderProps) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<Group className="h-full">
			<Burger opened={opened} onClick={toggle} size="sm" className="mx-4" />
			<Group>
				<Link to="/">
					<BrandTitle />
				</Link>
			</Group>
			{showAuthButtons && <HeaderAuthButtons />}
		</Group>
	);
}
