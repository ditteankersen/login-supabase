import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/login?error=true");
  }

  redirect("/profile");
}

export const metadata = {
  title: "Login",
};

export default function LoginPage({ searchParams }) {
  const showError = searchParams?.error === "true";

  return (
    <main>
      <h1>Login</h1>

      <form action={signIn} className="auth-form">
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
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>

        {showError && <p className="form-error">Wrong e-mail or password</p>}
      </form>
    </main>
  );
}
