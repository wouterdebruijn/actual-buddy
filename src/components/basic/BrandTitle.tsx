import { useMantineTheme } from "@mantine/core";
import { PiggyBank } from "lucide-react";
import Title from "./Title";

export default function BrandTitle() {
	const theme = useMantineTheme();
	const colorShade =
		typeof theme.primaryShade === "object"
			? theme.primaryShade.light
			: theme.primaryShade;

	return (
		<div className="flex gap-2 items-center">
			<PiggyBank
				size={48}
				color={`${theme.colors[theme.primaryColor][colorShade]}`}
			/>

			<Title color="primary">Actual Buddy</Title>
		</div>
	);
}
