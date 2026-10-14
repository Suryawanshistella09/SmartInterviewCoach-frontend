import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Remove old login data before attempting a new login
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
                {
                    email: email,
                    password: password
                }
            );

            // Backend returns the JWT directly
            const token = response.data;

            // Validate JWT
            if (
                typeof token !== "string" ||
                token.split(".").length !== 3
            ) {
                console.error(
                    "Login failed: the backend did not return a valid JWT."
                );

                alert("Login failed. Invalid token received.");
                return;
            }

            // Store JWT
            localStorage.setItem("token", token);

            // Store logged-in user's email
            localStorage.setItem("userEmail", email);

            // Decode JWT payload
            let payload;

            try {
                payload = JSON.parse(
                    atob(token.split(".")[1])
                );
            } catch (decodeError) {
                console.error("Unable to decode JWT:", decodeError);

                localStorage.removeItem("token");
                localStorage.removeItem("userEmail");

                alert("Login failed. Invalid token received.");
                return;
            }

            const role = payload.role;

            console.log("Login successful");
            console.log("User:", email);
            console.log("Role:", role);

            alert("Login successful!");

            // Redirect based on role
            if (role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            console.error("Login error:", error);

            // Remove login data if login fails
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");

            if (error.response) {
                const message =
                    typeof error.response.data === "string"
                        ? error.response.data
                        : error.response.data?.message ||
                          "Invalid email or password";

                alert(message);
            } else {
                alert(
                    "Unable to connect to the backend server."
                );
            }
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-shell">

                <div className="auth-visual">

                    <div className="auth-pill">
                        Welcome back
                    </div>

                    <h1>
                        Prepare smarter.
                        <span>
                            Practice better.
                        </span>
                    </h1>

                    <p>
                        Track your progress, sharpen your answers,
                        and build the confidence to ace your next interview.
                    </p>

                    <div className="auth-visual-card">

                        <div className="mini-header">

                            <div className="auth-mini-logo">

                                <div className="auth-mini-logo-badge">
                                    SC
                                </div>

                                Smart Interview Coach

                            </div>

                            <span className="status-tag">
                                Live
                            </span>

                        </div>

                        <ul className="visual-checklist">

                            <li>
                                AI-powered interview practice
                            </li>

                            <li>
                                Detailed feedback insights
                            </li>

                            <li>
                                Progress tracking every week
                            </li>

                        </ul>

                    </div>

                </div>


                <div className="auth-form-panel">

                    <div className="auth-card">

                        <div className="auth-brand">

                            <div className="auth-brand-badge">
                                SC
                            </div>

                            <span>
                                Smart Interview Coach
                            </span>

                        </div>


                        <h2 className="auth-title">
                            Login
                        </h2>

                        <p className="auth-subtitle">
                            Access your prep dashboard and continue improving.
                        </p>


                        <form
                            onSubmit={handleLogin}
                            className="auth-form"
                        >

                            <div className="auth-field">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>


                            <div className="auth-field">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                />

                            </div>


                            <button
                                type="submit"
                                className="auth-button"
                            >
                                Login
                            </button>

                        </form>


                        <div className="auth-switch">

                            Don't have an account?{" "}

                            <Link to="/register">
                                Create one
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;