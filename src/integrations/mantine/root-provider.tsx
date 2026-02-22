import { MantineProvider } from "@mantine/core";
import theme from "./theme";

import "@mantine/core/styles.css";

export default function MantineRootProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
