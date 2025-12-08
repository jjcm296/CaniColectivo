import LoginForm from "@/features/auth/components/login/LoginForm";

export default function LoginPage({ searchParams }) {
    const email =
        typeof searchParams?.email === "string" ? searchParams.email : "";

    return (
        <main className="page-container">
            <LoginForm initialEmail={email} />
        </main>
    );
}
