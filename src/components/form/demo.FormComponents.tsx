import {
	Button,
	type ButtonProps,
	Select as MantineSelect,
	type SelectProps,
	Textarea,
	TextInput,
	type TextInputProps,
} from "@mantine/core";
import { useStore } from "@tanstack/react-form";
import { useFieldContext, useFormContext } from "@/hooks/form-context";
import { useZodFormError } from "@/hooks/zod-form-error";

export function SubscribeButton({
	label,
	...props
}: ButtonProps & { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button {...props} type="submit" disabled={isSubmitting}>
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}

export function TextField({
	label,
	placeholder,
	...props
}: TextInputProps & {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<TextInput
			{...props}
			label={label}
			placeholder={placeholder}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={(e) => field.handleChange(e.target.value)}
			error={useZodFormError(field, errors)}
		/>
	);
}

export function TextArea({
	label,
	rows = 3,
}: {
	label: string;
	rows?: number;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Textarea
			label={label}
			rows={rows}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={(e) => field.handleChange(e.target.value)}
			error={useZodFormError(field, errors)}
			minRows={rows}
			autosize
		/>
	);
}

export function Select({
	label,
	values,
	...props
}: SelectProps & {
	label: string;
	values: Array<{ label: string; value: string }>;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<MantineSelect
			{...props}
			label={label}
			data={values}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={(value) => field.handleChange(value || "")}
			error={useZodFormError(field, errors)}
		/>
	);
}
