import {
	getThemeColor,
	Title as MantineTitle,
	type TitleProps as MantineTitleProps,
	useMantineTheme,
} from "@mantine/core";

interface TitleProps {
	color: "text" | "primary" | "secondary";
	children?: React.ReactNode;
}

export default function Title({
	children,
	color,
	...props
}: MantineTitleProps & TitleProps) {
	const theme = useMantineTheme();

	return (
		<MantineTitle
			{...props}
			className="title"
			style={{ color: getThemeColor(color, theme) }}
		>
			{children}
		</MantineTitle>
	);
}
