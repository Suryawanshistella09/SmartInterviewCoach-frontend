import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!name || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );

            console.log("Register Response:", response.data);

            setMessage(response.data);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error("Register Error:", error);

            if (error.response) {
                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : "Registration failed"
                );
            } else {
                setError("Unable to connect to backend");
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-shell">
                <div className="auth-visual">
                    <div className="auth-pill">Create account</div>

                    <h1>
                        Build your edge.
                        <span>Interview with confidence.</span>
                    </h1>

                    <p>
                        Join the platform that helps you practice strategically, improve faster, and stand out in every interview round.
                    </p>

                    <div className="auth-visual-card">
                        <div className="mini-header">
                            <div className="auth-mini-logo">
                                <div className="auth-mini-logo-badge">SC</div>
                                Smart Interview Coach
                            </div>
                            <span className="status-tag">New</span>
                        </div>

                        <ul className="visual-checklist">
                            <li>Customized mock interview sessions</li>
                            <li>Actionable improvement tips</li>
                            <li>Track every practice milestone</li>
                        </ul>
                    </div>
                </div>

                <div className="auth-form-panel">
                    <div className="auth-card">
                        <div className="auth-brand">
                            <div className="auth-brand-badge">SC</div>
                            <span>Smart Interview Coach</span>
                        </div>

                        <h2 className="auth-title">Create account</h2>
                        <p className="auth-subtitle">Start your preparation journey today.</p>

                        <form onSubmit={handleRegister} className="auth-form">
                            <div className="auth-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="auth-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="auth-field">
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {message && (
                                <div className="auth-alert success">{message}</div>
                            )}

                            {error && (
                                <div className="auth-alert error">{error}</div>
                            )}

                            <button type="submit" className="auth-button">
                                Register
                            </button>
                        </form>

                        <div className="auth-switch">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;