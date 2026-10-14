import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    // =========================
    // STATS STATE
    // =========================

    const [stats, setStats] = useState({
        totalUsers:      null,
        totalQuestions:  null,
        totalInterviews: null,
        averageScore:    null,
        technicalCount:  null,
        codingCount:     null,
        hrCount:         null,
    });

    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError,   setStatsError]   = useState(false);


    // =========================
    // FETCH STATS ON MOUNT
    // =========================

    useEffect(() => {

        const fetchStats = async () => {

            try {

                setStatsLoading(true);
                setStatsError(false);

                const response = await api.get("/api/admin/stats");

                setStats(response.data);

            } catch (error) {

                console.error("Failed to fetch admin stats:", error);
                setStatsError(true);

            } finally {

                setStatsLoading(false);
            }
        };

        fetchStats();

    }, []);


    // =========================
    // DISPLAY HELPERS
    // =========================

    const displayValue = (value) => {

        if (statsLoading) return "…";
        if (statsError)   return "—";
        return value ?? "—";
    };

    const displayPercent = (value) => {

        if (statsLoading) return "…";
        if (statsError)   return "—";
        return value != null ? `${value}%` : "—";
    };


    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    // =========================
    // USER MANAGEMENT
    // =========================

    const handleUserManagement = () => {
        navigate("/user-management");
    };

    // =========================
    // QUESTION MANAGEMENT
    // =========================

    const handleQuestionManagement = () => {
        navigate("/question-management");
    };

    // =========================
    // INTERVIEW STATISTICS
    // =========================

    const handleInterviewStatistics = () => {
        navigate("/interview-statistics");
    };

    return (

        <div className="admin-page">

            {/* ================= SIDEBAR ================= */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <div className="admin-logo-icon">
                        SC
                    </div>

                    <div>
                        <h2>Smart Interview</h2>
                        <span>Coach</span>
                    </div>

                </div>


                <nav className="admin-nav">

                    {/* Dashboard */}

                    <button
                        className="admin-nav-active"
                        onClick={() =>
                            navigate("/admin-dashboard")
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>


                    {/* User Management */}

                    <button
                        onClick={handleUserManagement}
                    >
                        <span>👥</span>
                        User Management
                    </button>


                    {/* Question Management */}

                    <button
                        onClick={handleQuestionManagement}
                    >
                        <span>📝</span>
                        Question Management
                    </button>


                    {/* Interview Statistics */}

                    <button
                        onClick={handleInterviewStatistics}
                    >
                        <span>📊</span>
                        Interview Statistics
                    </button>

                </nav>


                {/* SIDEBAR BOTTOM */}

                <div className="admin-sidebar-bottom">

                    {/* Profile */}

                    <button
                        onClick={() =>
                            navigate("/admin-profile")
                        }
                    >
                        <span>◯</span>
                        Profile
                    </button>


                    {/* Logout */}

                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className="admin-main">


                {/* ================= TOP BAR ================= */}

                <header className="admin-topbar">

                    <div>

                        <p>ADMIN PANEL</p>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <span>
                            Manage users, questions and interview performance.
                        </span>

                    </div>


                    <div className="admin-user">

                        <div className="admin-avatar">
                            A
                        </div>

                        <div>

                            <strong>
                                Administrator
                            </strong>

                            <span>
                                ADMIN
                            </span>

                        </div>

                    </div>

                </header>


                {/* ================= WELCOME SECTION ================= */}

                <section className="admin-welcome">

                    <div>

                        <span className="admin-welcome-label">
                            ADMINISTRATION
                        </span>

                        <h2>
                            Manage your interview platform.
                        </h2>

                        <p>
                            Monitor users, manage interview questions
                            and track overall platform performance.
                        </p>

                    </div>

                </section>


                {/* ================= STATISTICS CARDS ================= */}

                <section className="admin-stats">


                    {/* Total Users */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            👥
                        </div>

                        <div>

                            <span>
                                Total Users
                            </span>

                            <h3>
                                {displayValue(stats.totalUsers)}
                            </h3>

                            <small>
                                Registered students
                            </small>

                        </div>

                    </div>


                    {/* Total Questions */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📝
                        </div>

                        <div>

                            <span>
                                Total Questions
                            </span>

                            <h3>
                                {displayValue(stats.totalQuestions)}
                            </h3>

                            <small>
                                Available questions
                            </small>

                        </div>

                    </div>


                    {/* Total Interviews */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            🎯
                        </div>

                        <div>

                            <span>
                                Total Interviews
                            </span>

                            <h3>
                                {displayValue(stats.totalInterviews)}
                            </h3>

                            <small>
                                Completed interviews
                            </small>

                        </div>

                    </div>


                    {/* Average Score */}

                    <div className="admin-stat-card">

                        <div className="admin-stat-icon">
                            📈
                        </div>

                        <div>

                            <span>
                                Average Score
                            </span>

                            <h3>
                                {displayPercent(stats.averageScore)}
                            </h3>

                            <small>
                                Overall performance
                            </small>

                        </div>

                    </div>

                </section>


                {/* ================= MANAGEMENT CARDS ================= */}

                <section className="admin-management">


                    <div className="admin-section-header">

                        <div>

                            <p>
                                MANAGEMENT
                            </p>

                            <h2>
                                Quick Actions
                            </h2>

                        </div>

                    </div>


                    <div className="admin-action-grid">


                        {/* ================= USER MANAGEMENT ================= */}

                        <div className="admin-action-card">

                            <div className="admin-action-icon">
                                👥
                            </div>

                            <div>

                                <h3>
                                    User Management
                                </h3>

                                <p>
                                    View and manage registered students
                                    and their account information.
                                </p>

                                <button
                                    onClick={handleUserManagement}
                                >
                                    Manage Users →
                                </button>

                            </div>

                        </div>


                        {/* ================= QUESTION MANAGEMENT ================= */}

                        <div className="admin-action-card">

                            <div className="admin-action-icon">
                                📝
                            </div>

                            <div>

                                <h3>
                                    Question Management
                                </h3>

                                <p>
                                    Add, edit, delete and organize
                                    interview questions.
                                </p>

                                <button
                                    onClick={handleQuestionManagement}
                                >
                                    Manage Questions →
                                </button>

                            </div>

                        </div>


                        {/* ================= INTERVIEW STATISTICS ================= */}

                        <div className="admin-action-card">

                            <div className="admin-action-icon">
                                📊
                            </div>

                            <div>

                                <h3>
                                    Interview Statistics
                                </h3>

                                <p>
                                    View interview activity and overall
                                    student performance.
                                </p>

                                <button
                                    onClick={handleInterviewStatistics}
                                >
                                    View Statistics →
                                </button>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= INTERVIEW OVERVIEW ================= */}

                <section className="admin-overview">


                    <div className="admin-section-header">

                        <div>

                            <p>
                                OVERVIEW
                            </p>

                            <h2>
                                Interview Activity
                            </h2>

                        </div>

                    </div>


                    <div className="admin-interview-grid">


                        {/* Technical */}

                        <div className="admin-interview-card">

                            <span>
                                Technical
                            </span>

                            <strong>
                                {displayValue(stats.technicalCount)}
                            </strong>

                            <small>
                                Interviews
                            </small>

                        </div>


                        {/* Coding */}

                        <div className="admin-interview-card">

                            <span>
                                Coding
                            </span>

                            <strong>
                                {displayValue(stats.codingCount)}
                            </strong>

                            <small>
                                Interviews
                            </small>

                        </div>


                        {/* HR */}

                        <div className="admin-interview-card">

                            <span>
                                HR
                            </span>

                            <strong>
                                {displayValue(stats.hrCount)}
                            </strong>

                            <small>
                                Interviews
                            </small>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;