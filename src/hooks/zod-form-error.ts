import type { AnyFieldApi } from "@tanstack/react-form";

export function useZodFormError(
	field: AnyFieldApi,
	errors: Array<string | { message: string }>,
) {
	return field.state.meta.isTouched &&
		!field.state.meta.isValid &&
		errors.length > 0
		? errors
				.map((error) => (typeof error === "string" ? error : error.message))
				.join(", ")
		: undefined;
}
