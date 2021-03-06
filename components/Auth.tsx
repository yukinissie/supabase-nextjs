import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { definitions } from "../types/supabase";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  }

  async function signInWithGithub() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  }

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Next.js</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "SignIn with Google"}</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithGithub();
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? "Loading" : "SignIn with GitHub"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
