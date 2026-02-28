import { createFileRoute } from "@tanstack/react-router";
import z, { email } from "zod";
import { useAppForm } from "@/hooks/demo.form";

import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/auth/sign-up")({
	component: RouteComponent,
});

const signupForm = z
	.object({
		email: email(),
		password: z.string().min(8, "Password must be at least 8 characters long"),
		confirmPassword: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters long"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validators: {
			onChange: signupForm,
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await authClient.signUp.email(
				{
					email: value.email,
					password: value.password,
					callbackURL: "/dashboard",
					name: value.email,
				},
				{
					onRequest: (ctx) => {
						//show loading
					},
					onSuccess: (ctx) => {
						//redirect to the dashboard or sign in page
					},
					onError: (ctx) => {
						// display the error message
						alert(ctx.error.message);
					},
				},
			);

			console.log("Sign up response:", { data, error });
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<form.AppField name="email">
				{(field) => (
					<field.TextField
						label="Email"
						placeholder="Enter your email"
						autoComplete="email"
						autoFocus
					/>
				)}
			</form.AppField>

			<form.AppField name="password">
				{(field) => (
					<field.TextField
						label="Password"
						autoComplete="new-password"
						type="password"
					/>
				)}
			</form.AppField>

			<form.AppField name="confirmPassword">
				{(field) => (
					<field.TextField
						label="Confirm Password"
						autoComplete="new-password"
						type="password"
					/>
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubscribeButton label="Sign Up" />
			</form.AppForm>
		</form>
	);
}
