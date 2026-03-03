import { createFileRoute } from "@tanstack/react-router";
import z, { email } from "zod";
import Title from "@/components/basic/Title";
import { useAppForm } from "@/hooks/demo.form";
import { signUp } from "@/lib/auth-client";

export const Route = createFileRoute("/auth/_formLayout/sign-up")({
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
			const { data, error } = await signUp.email(
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
		<div>
			<Title color="text">Create an account</Title>

			<div className="mb-4">Please sign up to your account to continue.</div>
			<div className="mb-8">
				Already have an account?{" "}
				<a href="/auth/sign-in" className="text-blue-500">
					Sign in
				</a>
			</div>
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
		</div>
	);
}
