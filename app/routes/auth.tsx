import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "ResuAi | Auth" },
  { name: "Authentication page", content: "Log into your account" },
];
const auth: React.FC = () => {
    const { isLoading,auth } = usePuterStore();
    const navigate = useNavigate();
    const location = useLocation();
    const next = location.search.split("next=")[1];

    useEffect(() => {
      if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next]);
    return (
      <main className="main-bg min-h-screen flex items-center justify-center">
        <div className="gradient-border shadow-lg">
          <section className="auth-section">
            <div className="auth-heading">
              <h1>Welcome</h1>
              <h2>Log in to continue your job hunt</h2>
            </div>
            <div>
              {isLoading ? (
                <button className="auth-button animate-pulse">
                  <p>Signing you in...</p>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button className="auth-button" onClick={auth.signOut}>
                      <p>Log Out</p>
                    </button>
                  ) : (
                    <button className="auth-button" onClick={auth.signIn}>
                      <p>Log In</p>
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    );
};

export default auth;
