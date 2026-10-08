import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================= INTERVIEW RESULTS =================

    const [results, setResults] = useState([]);
    const [statsLoading, setStatsLoading] = useState(true);


    // =====================================================
    // LOAD LOGGED-IN USER + RESULTS
    // =====================================================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            // Decode JWT
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const email = payload.sub;
            const role = payload.role;

            console.log("Logged-in user:", email);
            console.log("User role:", role);


            // Set logged-in user
            setUser({
                email: email,
                role: role
            });


            // =================================================
            // CHECK PROTECTED API
            // =================================================

            axios.get(
                "http://localhost:8080/api/test/protected",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {

                console.log(
                    "Protected API response:",
                    response.data
                );

                setLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Protected API error:",
                    error
                );

                if (error.response?.status === 401) {

                    localStorage.removeItem("token");

                    navigate("/login");

                    return;
                }

                setLoading(false);

            });


            // =================================================
            // GET INTERVIEW RESULTS FOR LOGGED-IN USER
            // =================================================

            axios.get(
                `http://localhost:8080/api/interview-results/user/${encodeURIComponent(email)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then((response) => {

                console.log(
                    "User interview results:",
                    response.data
                );

                setResults(response.data);

                setStatsLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Error loading interview results:",
                    error
                );

                setStatsLoading(false);

            });

        }
        catch (error) {

            console.error(
                "Invalid JWT token:",
                error
            );

            localStorage.removeItem("token");

            navigate("/login");

        }

    }, [navigate]);


    // =====================================================
    // CALCULATE DASHBOARD STATISTICS
    // =====================================================

    const interviewsCompleted =
        results.length;


    const questionsAttempted =
        results.reduce(
            (total, result) =>
                total + Number(result.totalQuestions || 0),
            0
        );


    const averageScore =
        results.length > 0
            ? Math.round(
                results.reduce(
                    (total, result) =>
                        total + Number(result.percentage || 0),
                    0
                ) / results.length
            )
            : 0;


    // =====================================================
    // CURRENT STREAK
    // =====================================================

    const calculateStreak = () => {

        if (results.length === 0) {
            return 0;
        }

        const dates = results
            .map((result) => {

                if (!result.completedAt) {
                    return null;
                }

                return new Date(
                    result.completedAt
                ).toDateString();

            })
            .filter(Boolean);


        const uniqueDates = [
            ...new Set(dates)
        ];


        if (uniqueDates.length === 0) {
            return 0;
        }


        const dateObjects =
            uniqueDates
                .map((date) => new Date(date))
                .sort(
                    (a, b) => b - a
                );


        let streak = 1;


        for (
            let i = 0;
            i < dateObjects.length - 1;
            i++
        ) {

            const current =
                dateObjects[i];

            const previous =
                dateObjects[i + 1];


            const difference =
                Math.round(
                    (
                        current - previous
                    ) /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );


            if (difference === 1) {

                streak++;

            }
            else {

                break;

            }

        }


        return streak;

    };


    const currentStreak =
        calculateStreak();


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/login");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading Dashboard...
            </div>
        );

    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="dashboard">


            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">

                <div className="logo">

                    <div className="logo-icon">
                        SC
                    </div>

                    <div>

                        <h2>
                            Smart Interview
                        </h2>

                        <span>
                            Coach
                        </span>

                    </div>

                </div>


                <nav className="sidebar-nav">


                    {/* DASHBOARD */}

                    <button
                        className="nav-item active"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <span>⌂</span>

                        Dashboard

                    </button>


                    {/* PRACTICE */}

                    <button
                        className="nav-item"
                        onClick={() =>
                            navigate("/practice-interview")
                        }
                    >

                        <span>▣</span>

                        Practice Interview

                    </button>


                    {/* MY PROGRESS */}

                    <button
                        className="nav-item"
                        onClick={() =>
                            navigate("/my-progress")
                        }
                    >

                        <span>◔</span>

                        My Progress

                    </button>


                    {/* PROFILE */}

                    <button
                        className="nav-item"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >

                        <span>◯</span>

                        Profile

                    </button>


                </nav>


                <div className="sidebar-bottom">


                    {/* SETTINGS */}

                    <button
                        className="nav-item"
                        onClick={() =>
                            navigate("/settings")
                        }
                    >

                        <span>⚙</span>

                        Settings

                    </button>


                    {/* LOGOUT */}

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >

                        <span>↪</span>

                        Logout

                    </button>


                </div>


            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className="main-content">


                {/* ================= TOP BAR ================= */}

                <div className="topbar">


                    <div>

                        <p className="page-label">
                            STUDENT DASHBOARD
                        </p>

                        <h1>
                            Welcome back! 👋
                        </h1>

                    </div>


                    {/* PROFILE */}

                    <div className="profile">


                        <div className="notification">
                            🔔
                        </div>


                        <div className="avatar">

                            {user?.email
                                ? user.email.charAt(0).toUpperCase()
                                : "S"
                            }

                        </div>


                        <div className="profile-info">

                            <strong>
                                {user?.email || "Student"}
                            </strong>

                            <span>
                                {user?.role || "STUDENT"}
                            </span>

                        </div>


                    </div>

                </div>


                {/* ================= HERO ================= */}

                <section className="hero">


                    <div className="hero-content">


                        <span className="hero-badge">
                            READY TO IMPROVE?
                        </span>


                        <h2>

                            Become

                            <span>
                                {" "}interview-ready.
                            </span>

                        </h2>


                        <p>
                            Practice technical, coding and HR
                            interviews and improve your
                            interview performance.
                        </p>


                        <button
                            className="primary-btn"
                            onClick={() =>
                                navigate("/practice-interview")
                            }
                        >

                            Start Practicing

                            <span>→</span>

                        </button>


                    </div>


                    <div className="hero-illustration">


                        <div className="circle circle-one"></div>

                        <div className="circle circle-two"></div>


                        <div className="hero-card">


                            <div className="check">
                                ✓
                            </div>


                            <div>

                                <strong>
                                    Interview Completed
                                </strong>

                                <small>
                                    Great job! Keep practicing.
                                </small>

                            </div>

                        </div>


                        <div className="floating-card">


                            <span>
                                ⚡
                            </span>


                            <div>

                                <strong>
                                    Keep Improving
                                </strong>

                                <small>
                                    Practice makes progress
                                </small>

                            </div>

                        </div>


                    </div>


                </section>


                {/* ================= STATISTICS ================= */}

                <section className="stats">


                    {/* INTERVIEWS */}

                    <div className="stat-card">

                        <div className="stat-icon purple">
                            ✓
                        </div>

                        <div>

                            <span>
                                Interviews Completed
                            </span>

                            <h3>
                                {statsLoading
                                    ? "..."
                                    : interviewsCompleted}
                            </h3>

                        </div>

                    </div>


                    {/* QUESTIONS */}

                    <div className="stat-card">

                        <div className="stat-icon blue">
                            ◷
                        </div>

                        <div>

                            <span>
                                Questions Attempted
                            </span>

                            <h3>
                                {statsLoading
                                    ? "..."
                                    : questionsAttempted}
                            </h3>

                        </div>

                    </div>


                    {/* AVERAGE SCORE */}

                    <div className="stat-card">

                        <div className="stat-icon green">
                            ★
                        </div>

                        <div>

                            <span>
                                Average Score
                            </span>

                            <h3>
                                {statsLoading
                                    ? "..."
                                    : `${averageScore}%`}
                            </h3>

                        </div>

                    </div>


                    {/* CURRENT STREAK */}

                    <div className="stat-card">

                        <div className="stat-icon orange">
                            🔥
                        </div>

                        <div>

                            <span>
                                Current Streak
                            </span>

                            <h3>
                                {statsLoading
                                    ? "..."
                                    : `${currentStreak} days`}
                            </h3>

                        </div>

                    </div>


                </section>


                {/* ================= PRACTICE ================= */}

                <section className="section">


                    <div className="section-heading">

                        <div>

                            <p>
                                PRACTICE
                            </p>

                            <h2>
                                Choose your interview
                            </h2>

                        </div>


                        <span>
                            View all →
                        </span>

                    </div>


                    <div className="practice-grid">


                        {/* TECHNICAL */}

                        <div className="practice-card technical">

                            <div className="practice-icon">
                                💻
                            </div>


                            <div className="practice-text">

                                <h3>
                                    Technical Interview
                                </h3>

                                <p>
                                    Test your knowledge of
                                    programming, databases,
                                    operating systems and more.
                                </p>


                                <button
                                    onClick={() =>
                                        navigate(
                                            "/practice-interview",
                                            {
                                                state: {
                                                    interviewType:
                                                        "Technical"
                                                }
                                            }
                                        )
                                    }
                                >
                                    Practice now →
                                </button>

                            </div>

                        </div>


                        {/* CODING */}

                        <div className="practice-card coding">

                            <div className="practice-icon">
                                &lt;/&gt;
                            </div>


                            <div className="practice-text">

                                <h3>
                                    Coding Practice
                                </h3>

                                <p>
                                    Solve coding problems and
                                    improve your programming
                                    logic and problem-solving skills.
                                </p>


                                <button
                                    onClick={() =>
                                        navigate(
                                            "/practice-interview",
                                            {
                                                state: {
                                                    interviewType:
                                                        "Coding"
                                                }
                                            }
                                        )
                                    }
                                >
                                    Solve problems →
                                </button>

                            </div>

                        </div>


                        {/* HR */}

                        <div className="practice-card hr">

                            <div className="practice-icon">
                                💬
                            </div>


                            <div className="practice-text">

                                <h3>
                                    HR Interview
                                </h3>

                                <p>
                                    Practice common HR questions
                                    and build confidence for
                                    real interviews.
                                </p>


                                <button
                                    onClick={() =>
                                        navigate(
                                            "/practice-interview",
                                            {
                                                state: {
                                                    interviewType:
                                                        "HR"
                                                }
                                            }
                                        )
                                    }
                                >
                                    Practice now →
                                </button>

                            </div>

                        </div>


                    </div>

                </section>


                {/* ================= QUICK START ================= */}

                <section className="quick-section">


                    <div>

                        <span>
                            QUICK START
                        </span>

                        <h2>
                            Ready for a quick interview?
                        </h2>

                        <p>
                            Get random questions and test
                            your skills.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/practice-interview")
                        }
                    >
                        Start Quick Interview →
                    </button>


                </section>


                {/* ================= CONNECTION STATUS ================= */}

                <div className="connection-status">

                    ✓ JWT authentication successful!

                    You can access this protected API.

                </div>


            </main>

        </div>

    );

}

export default Dashboard;