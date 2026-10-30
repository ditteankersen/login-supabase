import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signUp(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/signup?error=true");
  }

  redirect("/profile");
}

export const metadata = {
  title: "Sign up",
};

export default function SignUpPage({ searchParams }) {
  const showError = searchParams?.error === "true";

  return (
    <main>
      <h1>Sign up</h1>

      <form action={signUp} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="At least 6 characters"
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button type="submit">Sign up</button>

        {showError && (
          <p className="form-error">Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}
