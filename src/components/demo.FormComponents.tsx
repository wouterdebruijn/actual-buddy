import {
	Alert,
	Button,
	Select as MantineSelect,
	Textarea,
	TextInput,
} from "@mantine/core";
import { useStore } from "@tanstack/react-form";
import { useFieldContext, useFormContext } from "@/hooks/demo.form-context";
import { useZodFormError } from "@/hooks/zod-form-error";

export function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting}>
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}

function ErrorMessages({
	errors,
}: {
	errors: Array<string | { message: string }>;
}) {
	return (
		<Alert variant="light" color="red">
			{errors.map((error) => (
				<div
					key={typeof error === "string" ? error : error.message}
					className="text-red-500 mt-1 font-bold"
				>
					{typeof error === "string" ? error : error.message}
				</div>
			))}
		</Alert>
	);
}

export function TextField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<TextInput
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
}: {
	label: string;
	values: Array<{ label: string; value: string }>;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<MantineSelect
			label={label}
			data={values}
			value={field.state.value}
			onBlur={field.handleBlur}
			onChange={(value) => field.handleChange(value || "")}
			error={useZodFormError(field, errors)}
		/>
	);
}
