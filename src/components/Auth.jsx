import { useState } from "react";

function Auth({ onDone }) {
    const [mode, setMode] = useState("signup");

    return (
        <div>
            <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>
            <form
                className="auth-container"
                onSubmit={(e) => e.preventDefault()}
            >
                {mode === "signup" && (
                    <>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                        />
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            name="username"
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                        />
                    </>
                )}

                {mode === "login" && (
                    <>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            name="username"
                            required
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                    </>
                )}

                <button type="submit" onClick={onDone}>
                    {mode === "signup" ? "Sign Up" : "Log In"}
                </button>
            </form>

            <button
                onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            >
                {mode === "signup"
                    ? "Already have an account? Log In"
                    : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}

export default Auth;
