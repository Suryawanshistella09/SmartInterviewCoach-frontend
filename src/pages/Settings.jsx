import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(
        () => localStorage.getItem("notificationsEnabled") !== "false"
    );
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("darkModeEnabled") === "true"
    );

    const handleNotificationsChange = (event) => {
        const enabled = event.target.checked;
        setNotifications(enabled);
        localStorage.setItem("notificationsEnabled", String(enabled));
    };

    const handleDarkModeChange = (event) => {
        const enabled = event.target.checked;
        setDarkMode(enabled);
        localStorage.setItem("darkModeEnabled", String(enabled));
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/login");
    };


    return (
        <div className={`settings-page${darkMode ? " settings-dark" : ""}`}>

            {/* SIDEBAR */}

            <aside className="settings-sidebar">

                <div className="settings-logo">

                    <div className="settings-logo-icon">
                        SC
                    </div>

                    <div>
                        <h2>Smart Interview</h2>
                        <span>Coach</span>
                    </div>

                </div>


                <nav className="settings-nav">

                    <button
                        onClick={() => navigate("/dashboard")}
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


                    <button
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        <span>◯</span>
                        Profile
                    </button>


                    <button className="settings-active">
                        <span>⚙</span>
                        Settings
                    </button>

                </nav>


                <div className="settings-sidebar-bottom">

                    <button
                        className="settings-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}

            <main className="settings-main">

                <div className="settings-topbar">

                    <div>

                        <p>SETTINGS</p>

                        <h1>Settings</h1>

                        <span>
                            Manage your application preferences.
                        </span>

                    </div>

                </div>


                {/* GENERAL SETTINGS */}

                <section className="settings-section">

                    <div className="settings-section-title">

                        <span>⚙</span>

                        <div>
                            <h2>General</h2>
                            <p>
                                Customize your Smart Interview Coach experience.
                            </p>
                        </div>

                    </div>


                    {/* NOTIFICATIONS */}

                    <div className="setting-row">

                        <div className="setting-info">

                            <h3>Notifications</h3>

                            <p>
                                Receive notifications about your interview
                                practice and progress.
                            </p>

                        </div>


                        <label className="toggle">

                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={handleNotificationsChange}
                                aria-label="Enable notifications"
                            />

                            <span className="slider"></span>

                        </label>

                    </div>


                    {/* DARK MODE */}

                    <div className="setting-row">

                        <div className="setting-info">

                            <h3>Dark Mode</h3>

                            <p>
                                Change the appearance of the application.
                            </p>

                        </div>


                        <label className="toggle">

                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={handleDarkModeChange}
                                aria-label="Enable dark mode"
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                </section>


                {/* ACCOUNT */}

                <section className="settings-section">

                    <div className="settings-section-title">

                        <span>👤</span>

                        <div>
                            <h2>Account</h2>
                            <p>
                                Manage your account information.
                            </p>
                        </div>

                    </div>


                    <div className="account-setting-row">

                        <div>

                            <h3>Profile</h3>

                            <p>
                                Update your name and account information.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            Manage Profile →
                        </button>

                    </div>


                    <div className="account-setting-row">

                        <div>

                            <h3>Password</h3>

                            <p>
                                Change your account password.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                alert(
                                    "Password change will be connected to the backend next."
                                )
                            }
                        >
                            Change Password
                        </button>

                    </div>

                </section>


                {/* DANGER ZONE */}

                <section className="settings-section danger-section">

                    <div className="settings-section-title">

                        <span>⚠</span>

                        <div>
                            <h2>Account Actions</h2>
                            <p>
                                Actions related to your current session.
                            </p>
                        </div>

                    </div>


                    <div className="account-setting-row">

                        <div>

                            <h3>Logout</h3>

                            <p>
                                Sign out of your Smart Interview Coach account.
                            </p>

                        </div>

                        <button
                            className="danger-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </section>


                <button
                    className="back-dashboard"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Back to Dashboard
                </button>

            </main>

        </div>
    );
}

export default Settings;