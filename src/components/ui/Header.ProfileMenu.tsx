import { Avatar, Button, Group, Menu, Text } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { AtSign, LogOut, Settings, User } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import type { AuthenticatedUser } from "@/types/auth";

interface ProfileMenuProps {
	user: AuthenticatedUser | null;
}

export default function HeaderProfileMenu({ user }: ProfileMenuProps) {
	const navigate = useNavigate();

	async function signOutHandler() {
		await signOut();
		navigate({ to: "/auth/sign-in" });
	}

	return (
		<Menu shadow="md" width={400}>
			<Menu.Target>
				<Button variant="outline">
					<User size={20} className="mr-2" />
					{user?.name}
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Group wrap="nowrap" gap={10} className="m-2">
					<Avatar size={64} radius="md" color="primary" />
					<div>
						<Text fz="lg" fw={500}>
							{user?.name}
						</Text>

						<Group wrap="nowrap" gap={10} mt={3}>
							<AtSign size={16} />
							<Text fz="xs" c="dimmed">
								{user?.email}
							</Text>
						</Group>
					</div>
				</Group>

				<Menu.Label>Application</Menu.Label>
				<Menu.Item leftSection={<Settings size={14} />}>Settings</Menu.Item>

				<Menu.Label>Session</Menu.Label>
				<Menu.Item leftSection={<LogOut size={14} />} onClick={signOutHandler}>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
