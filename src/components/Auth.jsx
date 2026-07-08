import { useState } from "react";

function Auth({ onDone }) {
    const [mode, setMode] = useState("signup");
    const [errors, setErrors] = useState({});

    function handleSubmit(e, mode) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        if (mode === "signup") {
            if (
                !data.name ||
                !data.username ||
                !data.password ||
                !data.confirmPassword
            ) {
                setMessage("Please fill in all fields");
                return;
            }

            if (data.username.length < 3 && data.password.length < 6) {
                setMessage("Username must be at least 3 characters long");
                return;
            }
            if (data.password.length < 6) {
                setMessage("Password must be at least 6 characters long");
                return;
            }

            if (data.password !== data.confirmPassword) {
                setMessage("Passwords do not match");
                return;
            }
            // Handle signup logic here
            console.log("Signing up with data:", data);
        }

        onDone();
    }

    return (
        <div>
            <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>
            <form
                className="auth-container"
                onSubmit={(e) => handleSubmit(e, mode)}
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
                        {message && <p className="form-error">{message}</p>}

                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                        {message && <p className="form-error">{message}</p>}

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            required
                        />
                        {message && <p className="form-error">{message}</p>}
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

                        {message && <p className="form-error">{message}</p>}

                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                        {message && <p className="form-error">{message}</p>}
                    </>
                )}

                <button type="submit">
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
