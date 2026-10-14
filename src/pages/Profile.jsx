import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Edit profile states
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // ============================
    // LOAD PROFILE
    // ============================

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const email = payload.sub;

            api.get(
                `/api/profile/${encodeURIComponent(email)}`
            )
                .then((response) => {
                    console.log(
                        "Profile data:",
                        response.data
                    );

                    setUser(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(
                        "Error loading profile:",
                        error
                    );

                    setLoading(false);
                });
        } catch (error) {
            console.error(
                "Invalid token:",
                error
            );

            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);

    // ============================
    // LOGOUT
    // ============================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/login");
    };

    // ============================
    // START EDITING
    // ============================

    const handleEditProfile = () => {
        setEditName(user.name);
        setEditEmail(user.email);

        setMessage("");
        setErrorMessage("");

        setEditing(true);
    };

    // ============================
    // CANCEL EDIT
    // ============================

    const handleCancelEdit = () => {
        setEditName(user.name);
        setEditEmail(user.email);

        setMessage("");
        setErrorMessage("");

        setEditing(false);
    };

    // ============================
    // SAVE PROFILE
    // ============================

    const handleSaveProfile = async () => {
        // Validate name
        if (!editName.trim()) {
            setErrorMessage(
                "Name cannot be empty."
            );

            return;
        }

        // Validate email
        if (!editEmail.trim()) {
            setErrorMessage(
                "Email cannot be empty."
            );

            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setSaving(true);

            setMessage("");
            setErrorMessage("");

            // Get current email from JWT
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            const currentEmail = payload.sub;

            // Send updated profile to backend
            const response = await api.put(
                `/api/profile/${encodeURIComponent(currentEmail)}`,
                {
                    name: editName.trim(),
                    email: editEmail.trim()
                }
            );

            console.log(
                "Updated profile:",
                response.data
            );

            // Update profile on screen
            setUser(response.data);

            // Keep stored email in sync
            localStorage.setItem(
                "userEmail",
                response.data.email
            );

            setMessage(
                "Profile updated successfully!"
            );

            setEditing(false);
        } catch (error) {
            console.error(
                "Error updating profile:",
                error
            );

            if (
                error.response &&
                error.response.data
            ) {
                setErrorMessage(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : error.response.data?.message ||
                          "Failed to update profile."
                );
            } else {
                setErrorMessage(
                    "Unable to update profile. Please try again."
                );
            }
        } finally {
            setSaving(false);
        }
    };

    // ============================
    // LOADING
    // ============================

    if (loading) {
        return (
            <div className="profile-loading">
                Loading Profile...
            </div>
        );
    }

    // ============================
    // NO USER
    // ============================

    if (!user) {
        return (
            <div className="profile-loading">
                Unable to load profile.
            </div>
        );
    }

    // ============================
    // PROFILE
    // ============================

    return (
        <div className="profile-layout">

            {/* =====================================
                SIDEBAR
            ===================================== */}

            <aside className="profile-sidebar">

                {/* LOGO */}

                <div className="profile-logo">

                    <div className="profile-logo-icon">
                        SC
                    </div>

                    <div className="profile-logo-text">
                        <span>Smart</span>
                        <span>Interview</span>
                        <span>Coach</span>
                    </div>

                </div>

                {/* NAVIGATION */}

                <nav className="profile-nav">

                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate("/practice-interview")
                        }
                    >
                        <span>▣</span>
                        Practice Interview
                    </button>

                    <button
                        onClick={() =>
                            navigate("/my-progress")
                        }
                    >
                        <span>◔</span>
                        My Progress
                    </button>

                    <button className="profile-nav-active">
                        <span>◯</span>
                        Profile
                    </button>

                </nav>

                {/* BOTTOM */}

                <div className="profile-sidebar-bottom">

                    <button
                        onClick={() =>
                            navigate("/settings")
                        }
                    >
                        <span>⚙</span>
                        Settings
                    </button>

                    <button
                        className="profile-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>

            {/* =====================================
                MAIN CONTENT
            ===================================== */}

            <main className="profile-main">

                {/* TOP BAR */}

                <div className="profile-topbar">

                    <div></div>

                    <div className="profile-user-mini">

                        <button
                            className="profile-notification"
                            onClick={() =>
                                navigate("/settings")
                            }
                            title="Settings"
                        >
                            🔔
                        </button>

                        <div className="profile-mini-avatar">

                            {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "S"
                            }

                        </div>

                        <div>

                            <strong>
                                {user.email}
                            </strong>

                            <span>
                                {user.role}
                            </span>

                        </div>

                    </div>

                </div>

                {/* =====================================
                    PAGE HEADER
                ===================================== */}

                <div className="profile-page-header">

                    <p>
                        MY PROFILE
                    </p>

                    <h1>
                        Your Profile 👤
                    </h1>

                    <span>
                        Manage and view your account information.
                    </span>

                </div>

                {/* =====================================
                    SUCCESS / ERROR MESSAGE
                ===================================== */}

                {message && (
                    <div className="profile-success-message">
                        ✓ {message}
                    </div>
                )}

                {errorMessage && (
                    <div className="profile-error-message">
                        ⚠ {errorMessage}
                    </div>
                )}

                {/* =====================================
                    EDIT PROFILE FORM
                ===================================== */}

                {editing && (
                    <section className="edit-profile-card">

                        <div className="edit-profile-header">

                            <div>

                                <p>
                                    EDIT PROFILE
                                </p>

                                <h2>
                                    Update Your Information
                                </h2>

                            </div>

                        </div>

                        {/* NAME */}

                        <div className="edit-profile-field">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={editName}
                                onChange={(e) =>
                                    setEditName(e.target.value)
                                }
                                placeholder="Enter your full name"
                            />

                        </div>

                        {/* EMAIL */}

                        <div className="edit-profile-field">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={editEmail}
                                onChange={(e) =>
                                    setEditEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                            />

                        </div>

                        {/* ROLE */}

                        <div className="edit-profile-field">

                            <label>
                                Account Role
                            </label>

                            <input
                                type="text"
                                value={user.role}
                                disabled
                            />

                            <small>
                                Your account role cannot be changed.
                            </small>

                        </div>

                        {/* BUTTONS */}

                        <div className="edit-profile-actions">

                            <button
                                className="cancel-edit-btn"
                                onClick={handleCancelEdit}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                className="save-profile-btn"
                                onClick={handleSaveProfile}
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "✓ Save Changes"
                                }
                            </button>

                        </div>

                    </section>
                )}

                {/* =====================================
                    PROFILE HERO CARD
                ===================================== */}

                <section className="profile-hero-card">

                    <div className="profile-hero-content">

                        {/* AVATAR */}

                        <div className="profile-big-avatar">

                            {user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "S"
                            }

                        </div>

                        {/* NAME */}

                        <div className="profile-hero-info">

                            <h2>
                                {user.name}
                            </h2>

                            <p>
                                {user.role}
                            </p>

                        </div>

                        {/* ROLE */}

                        <div className="student-badge">
                            🎓 {user.role}
                        </div>

                    </div>

                </section>

                {/* =====================================
                    ACCOUNT INFORMATION
                ===================================== */}

                <section className="account-card">

                    <div className="account-card-header">

                        <div>

                            <p>
                                ACCOUNT INFORMATION
                            </p>

                            <h2>
                                Personal Details
                            </h2>

                        </div>

                    </div>

                    <div className="account-grid">

                        {/* NAME */}

                        <div className="account-item">

                            <div className="account-icon">
                                👤
                            </div>

                            <div>

                                <span>
                                    Full Name
                                </span>

                                <strong>
                                    {user.name}
                                </strong>

                            </div>

                        </div>

                        {/* EMAIL */}

                        <div className="account-item">

                            <div className="account-icon">
                                ✉
                            </div>

                            <div>

                                <span>
                                    Email Address
                                </span>

                                <strong>
                                    {user.email}
                                </strong>

                            </div>

                        </div>

                        {/* ROLE */}

                        <div className="account-item">

                            <div className="account-icon">
                                💼
                            </div>

                            <div>

                                <span>
                                    Account Role
                                </span>

                                <strong>
                                    {user.role}
                                </strong>

                            </div>

                        </div>

                        {/* STATUS */}

                        <div className="account-item">

                            <div className="account-icon">
                                🛡
                            </div>

                            <div>

                                <span>
                                    Account Status
                                </span>

                                <strong className="active-status">
                                    <span></span>
                                    Active
                                </strong>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================
                    INTERVIEW COACH CARD
                ===================================== */}

                <section className="coach-card">

                    <p>
                        INTERVIEW COACH
                    </p>

                    <h2>
                        Your Account
                    </h2>

                    <span>
                        Your interview results, progress and
                        performance are linked to this account.
                        Keep going — you're doing great! 🎯
                    </span>

                </section>

                {/* =====================================
                    ACTIONS
                ===================================== */}

                <div className="profile-actions">

                    <button
                        className="back-dashboard-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                    <button
                        className="edit-profile-btn"
                        onClick={handleEditProfile}
                    >
                        ✎ Edit Profile
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Profile;