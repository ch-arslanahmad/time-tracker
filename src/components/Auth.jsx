import { useState } from "react";

class User {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }
}

function addUser(user) {
    users.push(user);
    localStorage.setItem("tm_session", user.username);
    localStorage.setItem("users", JSON.stringify(users)); // update the localStorage with the new users array
}

let users = [
    new User("John Doe", "johndoe", "password123"),
    new User("Jane Smith", "janesmith", "securepass"),
];

function Auth({ onDone }) {
    localStorage.setItem("users", JSON.stringify(users)); // store in localStorage when the component is mounted

    const [mode, setMode] = useState("signup");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(() => localStorage.getItem("tm_session"));

    if (!user) {
        return (
            <Auth
                onDone={(username) => {
                    localStorage.setItem("tm_session", username);
                    setUser(username);
                }}
            />
        );
    }
    return (
        <Calendar
            onLogout={() => {
                localStorage.removeItem("tm_session");
                setUser(null);
            }}
        />
    );

    function validate(data) {
        let e = {};

        if (!data.username) e.username = "Username is required";
        if (!data.password) e.password = "Password is required";

        if (mode === "signup") {
            if (users.find((user) => user.username === data.username)) {
                e.name = "Username is already taken";
            }

            if (!data.name) e.name = "Name is required";
            if ((data.username?.length ?? 0) < 3)
                e.username = "Username must be at least 3 characters";
            if ((data.password?.length ?? 0) < 6)
                e.password = "Password must be at least 6 characters";
            if (mode === "signup" && data.password !== data.confirmPassword)
                e.confirmPassword = "Passwords don't match";
        }

        if (mode == "login") {
            const user = users.find((user) => user.username === data.username);

            if (!user) {
                e.username = "User not found";
            } else if (user.password !== data.password) {
                e.password = "Incorrect password";
            }
        }

        return e;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const validationErrors = validate(data);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return; // Stop submission if there are validation errors

        if (mode == "signup") {
            addUser(
                new User(
                    data.name.trim(),
                    data.username.trim(),
                    data.password.trim(),
                ),
            );
        } else if (mode == "login") {
            const user = users.find((user) => user.username === data.username);
            if (user && user.password === data.password) {
                console.log("Login successful");
                localStorage.setItem("tm_session", user.username);
            }
        }
        onDone(data.username);
    }

    return (
        <div>
            <h1>{mode === "signup" ? "Sign Up" : "Log In"}</h1>
            <form className="auth-container" onSubmit={handleSubmit}>
                {mode === "signup" && (
                    <>
                        <input name="name" placeholder="Name" required />
                        {errors.name && (
                            <p className="field-error">{errors.name}</p>
                        )}

                        <input
                            name="username"
                            placeholder="Username"
                            required
                        />
                        {errors.username && (
                            <p className="field-error">{errors.username}</p>
                        )}

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        {errors.password && (
                            <p className="field-error">{errors.password}</p>
                        )}

                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="field-error">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </>
                )}

                {mode === "login" && (
                    <>
                        <input
                            name="username"
                            placeholder="Username"
                            required
                        />
                        {errors.username && (
                            <p className="field-error">{errors.username}</p>
                        )}

                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        {errors.password && (
                            <p className="field-error">{errors.password}</p>
                        )}
                    </>
                )}

                <button type="submit">
                    {mode === "signup" ? "Sign Up" : "Log In"}
                </button>
            </form>

            <button
                onClick={() => {
                    setMode(mode === "signup" ? "login" : "signup");
                    setErrors({});
                }}
            >
                {mode === "signup"
                    ? "Already have an account? Log In"
                    : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}

export default Auth;
