import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

function AdminProfile() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    return (
        <div className="admin-profile-page">

            <aside className="admin-profile-sidebar">

                <div className="admin-profile-logo">
                    <div className="admin-profile-logo-icon">
                        SC
                    </div>

                    <div>
                        <h2>Smart Interview</h2>
                        <span>Coach</span>
                    </div>
                </div>

                <nav className="admin-profile-nav">

                    <button onClick={() => navigate("/admin-dashboard")}>
                        <span>⌂</span>
                        Dashboard
                    </button>

                    <button>
                        <span>👥</span>
                        User Management
                    </button>

                    <button onClick={() => navigate("/question-management")}>
                        <span>📝</span>
                        Question Management
                    </button>

                    <button>
                        <span>📊</span>
                        Interview Statistics
                    </button>

                </nav>

                <div className="admin-profile-bottom">

                    <button className="admin-profile-active">
                        <span>◯</span>
                        Profile
                    </button>

                    <button
                        className="admin-profile-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            <main className="admin-profile-main">

                <div className="admin-profile-header">

                    <p>ADMIN PANEL</p>

                    <h1>Admin Profile</h1>

                    <span>
                        Manage your administrator account information.
                    </span>

                </div>


                <section className="admin-profile-card">

                    <div className="admin-profile-avatar">
                        A
                    </div>

                    <div className="admin-profile-info">

                        <h2>Administrator</h2>

                        <p>
                            {localStorage.getItem("userEmail")}
                        </p>

                        <span className="admin-role-badge">
                            ADMIN
                        </span>

                    </div>

                </section>


                <section className="admin-profile-details">

                    <h2>Account Information</h2>

                    <div className="admin-detail-row">

                        <div>
                            <span>Name</span>
                            <strong>Administrator</strong>
                        </div>

                    </div>

                    <div className="admin-detail-row">

                        <div>
                            <span>Email</span>
                            <strong>
                                {localStorage.getItem("userEmail")}
                            </strong>
                        </div>

                    </div>

                    <div className="admin-detail-row">

                        <div>
                            <span>Role</span>
                            <strong>Administrator</strong>
                        </div>

                    </div>

                </section>


                <button
                    className="admin-profile-back"
                    onClick={() => navigate("/admin-dashboard")}
                >
                    ← Back to Admin Dashboard
                </button>

            </main>

        </div>
    );
}

export default AdminProfile;