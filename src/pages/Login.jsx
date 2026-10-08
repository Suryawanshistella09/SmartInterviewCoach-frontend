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

        // Remove old token and email before attempting login
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        try {

            const response = await axios.post(
                "http://localhost:8080/api/users/login",
                {
                    email: email,
                    password: password
                }
            );

            console.log("Login response:", response.data);

            // Backend returns JWT directly
            const token = response.data;

            // Make sure the response is actually a JWT
            if (
                typeof token !== "string" ||
                token.split(".").length !== 3
            ) {
                console.error(
                    "Invalid JWT received:",
                    token
                );

                alert("Login failed. Invalid token received.");
                return;
            }

            // Store JWT
            localStorage.setItem("token", token);

            // Store logged-in user's email
            localStorage.setItem("userEmail", email);

            console.log(
                "JWT stored:",
                localStorage.getItem("token")
            );

            console.log(
                "User email stored:",
                localStorage.getItem("userEmail")
            );

            alert("Login successful!");

            navigate("/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            // Remove login data if login fails
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");

            if (error.response) {

                alert(
                    error.response.data ||
                    "Invalid email or password"
                );

            } else {

                alert(
                    "Backend server is not running"
                );

            }
        }
    };


    return (
        <div className="auth-page">
            <div className="auth-shell">
                <div className="auth-visual">
                    <div className="auth-pill">Welcome back</div>

                    <h1>
                        Prepare smarter.
                        <span>Practice better.</span>
                    </h1>

                    <p>
                        Track your progress, sharpen your answers, and build the confidence to ace your next interview.
                    </p>

                    <div className="auth-visual-card">
                        <div className="mini-header">
                            <div className="auth-mini-logo">
                                <div className="auth-mini-logo-badge">SC</div>
                                Smart Interview Coach
                            </div>
                            <span className="status-tag">Live</span>
                        </div>

                        <ul className="visual-checklist">
                            <li>AI-powered interview practice</li>
                            <li>Detailed feedback insights</li>
                            <li>Progress tracking every week</li>
                        </ul>
                    </div>
                </div>

                <div className="auth-form-panel">
                    <div className="auth-card">
                        <div className="auth-brand">
                            <div className="auth-brand-badge">SC</div>
                            <span>Smart Interview Coach</span>
                        </div>

                        <h2 className="auth-title">Login</h2>
                        <p className="auth-subtitle">Access your prep dashboard and continue improving.</p>

                        <form onSubmit={handleLogin} className="auth-form">
                            <div className="auth-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="auth-field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button type="submit" className="auth-button">
                                Login
                            </button>
                        </form>

                        <div className="auth-switch">
                            Don&apos;t have an account? <Link to="/register">Create one</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;