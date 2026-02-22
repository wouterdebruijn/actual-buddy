import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useAppForm } from "@/hooks/demo.form";

export const Route = createFileRoute("/demo/form/simple")({
	component: SimpleForm,
});

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	gender: z.enum(["male", "female", "other"], {
		message: "Gender is required",
	}),
});

function SimpleForm() {
	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
			gender: "",
		},
		validators: {
			onBlur: schema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			// Show success message
			alert("Form submitted successfully!");
		},
	});

	return (
		<div className="flex items-center justify-center min-h-screen gap-8">
			<div className="w-lg">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
				>
					<form.AppField name="title">
						{(field) => <field.TextField label="Title" />}
					</form.AppField>

					<form.AppField name="description">
						{(field) => <field.TextArea label="Description" />}
					</form.AppField>

					<form.AppField name="gender">
						{(field) => (
							<field.Select
								label="Gender"
								values={[
									{ label: "Male", value: "male" },
									{ label: "Female", value: "female" },
									{ label: "Other", value: "other" },
								]}
							/>
						)}
					</form.AppField>

					<div className="flex justify-end">
						<form.AppForm>
							<form.SubscribeButton label="Submit" />
						</form.AppForm>
					</div>
				</form>
			</div>
		</div>
	);
}
