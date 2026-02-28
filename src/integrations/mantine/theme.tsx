import { createTheme, virtualColor } from "@mantine/core";

const theme = createTheme({
	defaultRadius: "md",
	fontFamily: "Outfit, sans-serif",
	primaryColor: "violet",
	colors: {
		primary: virtualColor({
			name: "primary",
			dark: "violet",
			light: "violet",
		}),
	},
	autoContrast: true,
	black: "#444",
	white: "#fff",
});

export default theme;
