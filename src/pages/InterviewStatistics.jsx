import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import "./InterviewStatistics.css";

function InterviewStatistics() {

    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchResults = async () => {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

           const response = await api.get("/api/interview-results");
            setResults(response.data);

        } catch (error) {

            console.error("Error loading interview statistics:", error);
            setError("Unable to load interview statistics.");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchResults();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    const totalInterviews = results.length;

    const averagePercentage =
        totalInterviews > 0
            ? Math.round(
                results.reduce(
                    (sum, result) => sum + Number(result.percentage || 0),
                    0
                ) / totalInterviews
            )
            : 0;

    const averageScore =
        totalInterviews > 0
            ? (
                results.reduce(
                    (sum, result) => sum + Number(result.score || 0),
                    0
                ) / totalInterviews
            ).toFixed(1)
            : 0;

    const technicalCount = results.filter(
        result => result.interviewType === "Technical"
    ).length;

    const codingCount = results.filter(
        result => result.interviewType === "Coding"
    ).length;

    const hrCount = results.filter(
        result => result.interviewType === "HR"
    ).length;

    return (
        <div className="statistics-page">

            {/* SIDEBAR */}
            <aside className="admin-sidebar">

                <div
                    className="admin-logo"
                    onClick={() => navigate("/admin-dashboard")}
                >
                    <div className="admin-logo-icon">SC</div>

                    <div>
                        <h2>Smart Interview</h2>
                        <span>Coach</span>
                    </div>
                </div>

                <nav className="admin-nav">

                    <button
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate("/user-management")}
                    >
                        <span>👥</span>
                        User Management
                    </button>

                    <button
                        onClick={() => navigate("/question-management")}
                    >
                        <span>📝</span>
                        Question Management
                    </button>

                    <button className="admin-nav-active">
                        <span>📊</span>
                        Interview Statistics
                    </button>

                </nav>

                <div className="admin-sidebar-bottom">
                    <button onClick={() => navigate("/admin-profile")}>
                        <span>◯</span>
                        Profile
                    </button>

                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="statistics-main">

                <header className="statistics-header">

                    <div>
                        <p>ADMIN PANEL</p>
                        <h1>Interview Statistics</h1>
                        <span>
                            View overall interview performance and statistics.
                        </span>
                    </div>

                    <div className="statistics-admin">
                        <div className="statistics-admin-avatar">
                            A
                        </div>

                        <div>
                            <strong>Administrator</strong>
                            <span>ADMIN</span>
                        </div>
                    </div>

                </header>

                {loading && (
                    <div className="statistics-message">
                        Loading statistics...
                    </div>
                )}

                {error && (
                    <div className="statistics-error">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>

                        {/* SUMMARY CARDS */}
                        <section className="statistics-cards">

                            <div className="statistics-card">
                                <div className="statistics-icon purple">
                                    📊
                                </div>

                                <div>
                                    <p>Total Interviews</p>
                                    <h2>{totalInterviews}</h2>
                                    <span>Completed interviews</span>
                                </div>
                            </div>

                            <div className="statistics-card">
                                <div className="statistics-icon blue">
                                    🎯
                                </div>

                                <div>
                                    <p>Average Score</p>
                                    <h2>{averageScore}</h2>
                                    <span>Across all interviews</span>
                                </div>
                            </div>

                            <div className="statistics-card">
                                <div className="statistics-icon green">
                                    📈
                                </div>

                                <div>
                                    <p>Average Percentage</p>
                                    <h2>{averagePercentage}%</h2>
                                    <span>Overall performance</span>
                                </div>
                            </div>

                            <div className="statistics-card">
                                <div className="statistics-icon orange">
                                    👨‍💻
                                </div>

                                <div>
                                    <p>Technical</p>
                                    <h2>{technicalCount}</h2>
                                    <span>Technical interviews</span>
                                </div>
                            </div>

                        </section>

                        {/* INTERVIEW TYPES */}
                        <section className="statistics-section">

                            <div className="statistics-section-header">
                                <div>
                                    <h2>Interview Types</h2>
                                    <p>Distribution of completed interviews</p>
                                </div>
                            </div>

                            <div className="type-grid">

                                <div className="type-card">
                                    <div className="type-icon">
                                        💻
                                    </div>

                                    <div>
                                        <h3>Technical</h3>
                                        <strong>{technicalCount}</strong>
                                        <p>Interviews</p>
                                    </div>
                                </div>

                                <div className="type-card">
                                    <div className="type-icon">
                                        💡
                                    </div>

                                    <div>
                                        <h3>Coding</h3>
                                        <strong>{codingCount}</strong>
                                        <p>Interviews</p>
                                    </div>
                                </div>

                                <div className="type-card">
                                    <div className="type-icon">
                                        🤝
                                    </div>

                                    <div>
                                        <h3>HR</h3>
                                        <strong>{hrCount}</strong>
                                        <p>Interviews</p>
                                    </div>
                                </div>

                            </div>

                        </section>

                        {/* ALL RESULTS */}
                        <section className="statistics-section">

                            <div className="statistics-section-header">

                                <div>
                                    <h2>Interview Results</h2>
                                    <p>Performance of completed interviews</p>
                                </div>

                                <button
                                    className="statistics-refresh"
                                    onClick={fetchResults}
                                >
                                    ↻ Refresh
                                </button>

                            </div>

                            {results.length === 0 ? (

                                <div className="statistics-empty">
                                    <div>📊</div>
                                    <h3>No interview results yet</h3>
                                    <p>
                                        Completed student interviews will appear here.
                                    </p>
                                </div>

                            ) : (

                                <div className="statistics-table-container">

                                    <table className="statistics-table">

                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>User</th>
                                                <th>Type</th>
                                                <th>Subject</th>
                                                <th>Difficulty</th>
                                                <th>Score</th>
                                                <th>Percentage</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {results.map((result) => (

                                                <tr key={result.id}>

                                                    <td>#{result.id}</td>

                                                    <td>
                                                        {result.userEmail}
                                                    </td>

                                                    <td>
                                                        <span className="type-badge">
                                                            {result.interviewType}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {result.subject}
                                                    </td>

                                                    <td>
                                                        {result.difficulty}
                                                    </td>

                                                    <td>
                                                        <strong>
                                                            {result.score}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        <span className="percentage-badge">
                                                            {result.percentage}%
                                                        </span>
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </section>

                        <button
                            className="statistics-back"
                            onClick={() => navigate("/admin-dashboard")}
                        >
                            ← Back to Admin Dashboard
                        </button>

                    </>
                )}

            </main>

        </div>
    );
}

export default InterviewStatistics;