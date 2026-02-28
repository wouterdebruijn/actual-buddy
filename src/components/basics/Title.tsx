import {
	getThemeColor,
	Title as MantineTitle,
	useMantineTheme,
} from "@mantine/core";

interface TitleProps {
	color: "text" | "primary" | "secondary";
	children?: React.ReactNode;
}

export default function Title({ children, color }: TitleProps) {
	const theme = useMantineTheme();

	return (
		<MantineTitle
			className="title"
			style={{ color: getThemeColor(color, theme) }}
		>
			{children}
		</MantineTitle>
	);
}
