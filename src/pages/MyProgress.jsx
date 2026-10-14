import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./MyProgress.css";
import useProgressSummary from "../hooks/useProgressSummary";

function formatLocalDateTime(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

function getDateSortValue(value) {
    const timestamp = value ? new Date(value).getTime() : 0;
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

function toNonNegativeNumber(value) {
    const number = Number(value ?? 0);
    return Number.isFinite(number) && number > 0 ? number : 0;
}

function normalizeInterviewType(value) {
    const type = String(value || "Interview");
    const normalized = type.toLowerCase();

    if (normalized.includes("coding")) {
        return "Coding";
    }

    if (normalized.includes("hr")) {
        return "HR";
    }

    if (normalized.includes("technical")) {
        return "Technical";
    }

    return type;
}

function MyProgress() {

    const navigate = useNavigate();
    const { summary, loading: statsLoading, error: statsError } = useProgressSummary();

    const [user, setUser] = useState(null);
    const [results, setResults] = useState([]);
    const [codingSubmissions, setCodingSubmissions] = useState([]);
    const [interviewHistoryError, setInterviewHistoryError] = useState("");
    const [codingHistoryError, setCodingHistoryError] = useState("");
    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD USER + INTERVIEW RESULTS
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


            setUser({
                email: email,
                role: role
            });


            const interviewRequest = api.get(
                `/api/interview-results/user/${encodeURIComponent(email)}`
            )
                .then((response) => {
                    setResults(Array.isArray(response.data) ? response.data : []);
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        throw error;
                    }

                    console.error("Error loading interview history:", error);
                    setInterviewHistoryError("Interview history could not be loaded.");
                });


            const codingRequest = api.get(
                "/api/coding/submissions/me"
            )
                .then((response) => {
                    setCodingSubmissions(Array.isArray(response.data) ? response.data : []);
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        throw error;
                    }

                    console.error("Error loading coding history:", error);
                    setCodingHistoryError("Coding submission history could not be loaded.");
                });


            Promise.all([interviewRequest, codingRequest])
                .catch((error) => {
                    if (error.response?.status === 401) {
                        localStorage.removeItem("token");
                        navigate("/login");
                        return;
                    }

                    console.error("Error loading progress:", error);
                })
                .finally(() => setLoading(false));

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
    // STATISTICS
    // =====================================================

    const codingActivities = codingSubmissions.map((submission, index) => ({
        key: `coding-${submission.submissionId ?? index}`,
        dedupeKey: submission.submissionId != null
            ? `Coding:${submission.submissionId}`
            : null,
        type: "Coding",
        problemId: submission.problemId ?? null,
        title: submission.problemTitle || `Problem #${submission.problemId}`,
        difficulty: submission.problemDifficulty || "—",
        questions: `${toNonNegativeNumber(submission.passedCases)}/${toNonNegativeNumber(submission.totalCases)} tests passed`,
        questionCount: 1,
        score: toNonNegativeNumber(submission.score),
        date: submission.submittedAt,
        sortDate: getDateSortValue(submission.submittedAt)
    }));

    const interviewActivities = results.map((result, index) => {
        const type = normalizeInterviewType(result.interviewType);

        return {
            key: `interview-${result.id ?? index}`,
            dedupeKey: result.id != null ? `${type}:${result.id}` : null,
            type,
            title: "",
            difficulty: result.difficulty || "—",
            questions: toNonNegativeNumber(result.totalQuestions),
            questionCount: toNonNegativeNumber(result.totalQuestions),
            score: toNonNegativeNumber(result.percentage),
            date: result.completedAt,
            sortDate: getDateSortValue(result.completedAt)
        };
    });

    const seenActivityIds = new Set();
    const historyActivities = [...codingActivities, ...interviewActivities]
        .filter((activity) => {
            if (!activity.dedupeKey) {
                return true;
            }

            if (seenActivityIds.has(activity.dedupeKey)) {
                return false;
            }

            seenActivityIds.add(activity.dedupeKey);
            return true;
        })
        .sort((first, second) => second.sortDate - first.sortDate);

    // =====================================================
    // WEAK AREAS & RECOMMENDATIONS
    // =====================================================

    const weakResults = results.filter(
        result =>
            Number(result.percentage || 0) < 70
    );


    const weakAreas = Object.values(
        weakResults.reduce(
            (groups, result) => {

                const type =
                    result.interviewType ||
                    "General Interview";

                const score =
                    Number(result.percentage || 0);


                if (!groups[type]) {

                    groups[type] = {
                        type: type,
                        totalScore: 0,
                        attempts: 0
                    };

                }


                groups[type].totalScore += score;

                groups[type].attempts += 1;


                return groups;

            },
            {}
        )
    ).map(area => ({

        ...area,

        averageScore:
            Math.round(
                area.totalScore /
                area.attempts
            )

    }));


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="progress-loading">

                Loading your progress...

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="progress-page">


            {/* =================================================
                SIDEBAR
            ================================================= */}

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
                        className="nav-item"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >

                        <span>⌂</span>

                        Dashboard

                    </button>


                    {/* PRACTICE INTERVIEW */}

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
                        className="nav-item active"
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


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="progress-content">


                {/* =================================================
                    TOP BAR
                ================================================= */}

                <div className="progress-topbar">


                    <div>

                        <p className="page-label">
                            MY PROGRESS
                        </p>


                        <h1>
                            Track your performance 📊
                        </h1>


                        <p className="progress-subtitle">
                            Review your interview performance
                            and see how you are improving.
                        </p>

                    </div>


                    {/* USER */}

                    <div className="progress-profile">


                        <div className="avatar">

                            {user?.email
                                ? user.email
                                    .charAt(0)
                                    .toUpperCase()
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


                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                {statsError && (
                    <div className="progress-summary-error" role="alert">
                        {statsError}
                    </div>
                )}

                <section className="progress-stats">


                    {/* INTERVIEWS */}

                    <div className="progress-stat-card">

                        <div className="progress-stat-icon purple">
                            ✓
                        </div>


                        <div>

                            <span>
                                Activities Completed
                            </span>


                            <h2>
                                {statsLoading
                                    ? "..."
                                    : summary
                                        ? summary.activitiesCompleted
                                        : "—"}
                            </h2>

                        </div>

                    </div>


                    {/* QUESTIONS */}

                    <div className="progress-stat-card">

                        <div className="progress-stat-icon blue">
                            ◷
                        </div>


                        <div>

                            <span>
                                Questions Attempted
                            </span>


                            <h2>
                                {statsLoading
                                    ? "..."
                                    : summary
                                        ? summary.questionsAttempted
                                        : "—"}
                            </h2>

                        </div>

                    </div>


                    {/* AVERAGE */}

                    <div className="progress-stat-card">

                        <div className="progress-stat-icon green">
                            ★
                        </div>


                        <div>

                            <span>
                                Average Score
                            </span>


                            <h2>
                                {statsLoading
                                    ? "..."
                                    : summary
                                        ? `${summary.averageScore}%`
                                        : "—"}
                            </h2>

                        </div>

                    </div>


                    {/* BEST */}

                    <div className="progress-stat-card">

                        <div className="progress-stat-icon orange">
                            🏆
                        </div>


                        <div>

                            <span>
                                Best Score
                            </span>


                            <h2>
                                {statsLoading
                                    ? "..."
                                    : summary
                                        ? `${Number(summary.bestScore).toLocaleString(undefined, { maximumFractionDigits: 1 })}%`
                                        : "—"}
                            </h2>

                        </div>

                    </div>


                </section>


                {/* =================================================
                    PERFORMANCE OVERVIEW
                ================================================= */}

                <section className="progress-section">


                    <div className="section-heading">

                        <div>

                            <p>
                                PERFORMANCE
                            </p>


                            <h2>
                                Your overall performance
                            </h2>

                        </div>

                    </div>


                    <div className="performance-card">


                        <div className="performance-score">

                            <div className="large-score">
                                {statsLoading
                                    ? "..."
                                    : summary
                                        ? `${summary.averageScore}%`
                                        : "—"}
                            </div>


                            <span>
                                Average Performance
                            </span>

                        </div>


                        <div className="performance-message">


                            {statsLoading ? (

                                <>

                                    <h3>
                                        Loading performance...
                                    </h3>


                                    <p>
                                        Your saved activity is being loaded.
                                    </p>

                                </>

                            ) : !summary ? (

                                <>

                                    <h3>
                                        Performance unavailable
                                    </h3>


                                    <p>
                                        {statsError || "Progress statistics could not be loaded."}
                                    </p>

                                </>

                            ) : summary.averageScore >= 80 ? (

                                <>

                                    <h3>
                                        Excellent work! 🎉
                                    </h3>


                                    <p>
                                        Your performance is strong.
                                        Keep practicing to maintain
                                        your level.
                                    </p>

                                </>

                            ) : summary.averageScore >= 50 ? (

                                <>

                                    <h3>
                                        Good progress! 👍
                                    </h3>


                                    <p>
                                        You are making progress.
                                        Focus on your weak areas
                                        and continue practicing.
                                    </p>

                                </>

                            ) : (

                                <>

                                    <h3>
                                        Keep practicing! 💪
                                    </h3>


                                    <p>
                                        Review the concepts and
                                        practice regularly to
                                        improve your score.
                                    </p>

                                </>

                            )}


                        </div>


                    </div>


                </section>


                {/* =================================================
                    INTERVIEW HISTORY
                ================================================= */}

                <section className="progress-section">


                    <div className="section-heading">

                        <div>

                            <p>
                                HISTORY
                            </p>


                            <h2>
                                Interview History
                            </h2>

                        </div>

                    </div>


                    {interviewHistoryError && (
                        <div className="history-load-error">
                            {interviewHistoryError}
                        </div>
                    )}

                    {codingHistoryError && (
                        <div className="history-load-error">
                            {codingHistoryError}
                        </div>
                    )}

                    {historyActivities.length === 0 ? (

                        <div className="empty-progress">

                            <div>
                                📋
                            </div>


                            <h3>
                                No activity yet
                            </h3>


                            <p>
                                Complete an interview or submit a coding solution
                                to start tracking your progress.
                            </p>


                            <button
                                onClick={() =>
                                    navigate(
                                        "/practice-interview"
                                    )
                                }
                            >
                                Start Interview →
                            </button>

                        </div>

                    ) : (

                        <div className="history-table">


                            <div className="history-header">

                                <span>
                                    Interview
                                </span>


                                <span>
                                    Difficulty
                                </span>


                                <span>
                                    Questions / Test Cases
                                </span>


                                <span>
                                    Score
                                </span>


                                <span>
                                    Date
                                </span>

                            </div>


                            {historyActivities.map((activity) => (

                                <div
                                    className="history-row"
                                    key={activity.key}
                                >


                                    <div className="history-activity-name">
                                        <strong>{activity.type}</strong>
                                        {activity.title && (
                                            <span>{activity.title}</span>
                                        )}
                                    </div>


                                    <span>{activity.difficulty}</span>


                                    <span>{activity.questions}</span>


                                    <strong
                                        className={
                                            activity.score >= 80
                                                ? "score-good"
                                                : activity.score >= 50
                                                    ? "score-average"
                                                    : "score-low"
                                        }
                                    >
                                        {activity.score.toLocaleString(undefined, {
                                            maximumFractionDigits: 1
                                        })}%
                                    </strong>


                                    <span>

                                        {formatLocalDateTime(activity.date)}

                                    </span>


                                </div>

                            ))}


                        </div>

                    )}


                </section>


                {/* =================================================
                    WEAK AREAS & RECOMMENDATIONS
                ================================================= */}

                <section className="progress-section">


                    <div className="section-heading">

                        <div>

                            <p>
                                IMPROVEMENT
                            </p>


                            <h2>
                                Weak Areas & Recommendations
                            </h2>

                        </div>

                    </div>


                    {weakAreas.length === 0 ? (

                        <div className="recommendation-success">

                            <div className="recommendation-icon">
                                🎉
                            </div>


                            <div>

                                <h3>
                                    No major weak areas!
                                </h3>


                                <p>
                                    Your performance is good
                                    across your completed
                                    interviews. Keep practicing
                                    to maintain your performance.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="weak-area-container">


                            {weakAreas.map(
                                (area, index) => (

                                    <div
                                        className="weak-area-card"
                                        key={index}
                                    >


                                        <div className="weak-area-top">


                                            <div>

                                                <span className="weak-area-label">
                                                    INTERVIEW TYPE
                                                </span>


                                                <h3>
                                                    {area.type}
                                                </h3>

                                            </div>


                                            <div
                                                className={
                                                    area.averageScore < 50
                                                        ? "weak-score score-low"
                                                        : "weak-score score-average"
                                                }
                                            >
                                                {area.averageScore}%
                                            </div>


                                        </div>


                                        {/* PROGRESS BAR */}

                                        <div className="weak-progress-bar">

                                            <div
                                                className="weak-progress-fill"
                                                style={{
                                                    width:
                                                        `${area.averageScore}%`
                                                }}
                                            >
                                            </div>

                                        </div>


                                        {/* STATUS */}

                                        <p className="weak-area-message">

                                            {area.averageScore < 50
                                                ? "Needs more practice"
                                                : "Needs improvement"
                                            }

                                        </p>


                                        {/* RECOMMENDATION */}

                                        <div className="recommendation-box">

                                            <strong>
                                                💡 Recommended Practice
                                            </strong>


                                            <p>

                                                {area.type === "Technical"

                                                    ? "Practice core programming concepts, Java fundamentals, OOP and problem-solving questions."

                                                    : area.type === "Coding"

                                                        ? "Practice coding problems regularly and focus on improving problem-solving speed and accuracy."

                                                        : "Practice more questions from this interview category and review the concepts where you made mistakes."

                                                }

                                            </p>

                                        </div>


                                        {/* PRACTICE BUTTON */}

                                        <button
                                            className="recommendation-btn"
                                            onClick={() =>
                                                navigate(
                                                    "/practice-interview"
                                                )
                                            }
                                        >
                                            Practice Again →
                                        </button>


                                    </div>

                                )
                            )}


                        </div>

                    )}


                </section>


            </main>


        </div>

    );

}

export default MyProgress;