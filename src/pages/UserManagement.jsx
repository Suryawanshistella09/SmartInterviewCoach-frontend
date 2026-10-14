import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserManagement.css";

function UserManagement() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get all users
    const fetchUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data);

        } catch (error) {

            console.error("Error fetching users:", error);

            setError(
                error.response?.data ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }
    };


    // Load users when page opens
    useEffect(() => {
        fetchUsers();
    }, []);


    // Delete user
    const handleDelete = async (id, role) => {

        // Prevent deleting admin
        if (role === "ADMIN") {
            alert("Admin account cannot be deleted.");
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:8080/api/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("User deleted successfully.");

            // Refresh users
            fetchUsers();

        } catch (error) {

            console.error("Delete error:", error);

            alert(
                error.response?.data ||
                "Unable to delete user."
            );

        }
    };


    // Logout
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");

        navigate("/login");

    };


    return (
        <div className="user-management-page">

            {/* Sidebar */}
            <aside className="user-management-sidebar">

                <div className="user-management-logo">

                    <div className="user-management-logo-icon">
                        SC
                    </div>

                    <div>
                        <h2>Smart Interview</h2>
                        <span>Coach</span>
                    </div>

                </div>


                <nav className="user-management-nav">

                    <button
                        onClick={() =>
                            navigate("/admin-dashboard")
                        }
                    >
                        <span>⌂</span>
                        Dashboard
                    </button>


                    <button className="user-management-active">
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


                <div className="user-management-sidebar-bottom">

                    <button
                        onClick={() =>
                            navigate("/admin-profile")
                        }
                    >
                        <span>◯</span>
                        Profile
                    </button>


                    <button
                        className="user-management-logout"
                        onClick={handleLogout}
                    >
                        <span>↪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}
            <main className="user-management-main">

                {/* Header */}
                <header className="user-management-header">

                    <div>

                        <p>ADMIN PANEL</p>

                        <h1>
                            User Management
                        </h1>

                        <span>
                            View and manage registered users.
                        </span>

                    </div>


                    <div className="user-management-admin">

                        <div className="user-management-avatar">
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


                {/* User Statistics */}
                <section className="user-management-stats">

                    <div className="user-management-stat-card">

                        <div className="user-management-stat-icon">
                            👥
                        </div>

                        <div>

                            <span>
                                Total Users
                            </span>

                            <h3>
                                {users.length}
                            </h3>

                            <small>
                                Registered accounts
                            </small>

                        </div>

                    </div>


                    <div className="user-management-stat-card">

                        <div className="user-management-stat-icon">
                            🎓
                        </div>

                        <div>

                            <span>
                                Students
                            </span>

                            <h3>
                                {
                                    users.filter(
                                        (user) =>
                                            user.role === "STUDENT"
                                    ).length
                                }
                            </h3>

                            <small>
                                Student accounts
                            </small>

                        </div>

                    </div>


                    <div className="user-management-stat-card">

                        <div className="user-management-stat-icon">
                            🛡️
                        </div>

                        <div>

                            <span>
                                Administrators
                            </span>

                            <h3>
                                {
                                    users.filter(
                                        (user) =>
                                            user.role === "ADMIN"
                                    ).length
                                }
                            </h3>

                            <small>
                                Admin accounts
                            </small>

                        </div>

                    </div>

                </section>


                {/* Users Table */}
                <section className="user-management-section">

                    <div className="user-management-section-header">

                        <div>

                            <p>
                                USERS
                            </p>

                            <h2>
                                Registered Users
                            </h2>

                        </div>


                        <button
                            className="refresh-users-button"
                            onClick={fetchUsers}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    {loading && (
                        <div className="user-management-message">
                            Loading users...
                        </div>
                    )}


                    {!loading && error && (
                        <div className="user-management-error">
                            {error}
                        </div>
                    )}


                    {!loading &&
                        !error &&
                        users.length === 0 && (
                            <div className="user-management-message">
                                No users found.
                            </div>
                        )
                    }


                    {!loading &&
                        !error &&
                        users.length > 0 && (

                            <div className="user-table-wrapper">

                                <table className="user-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                ID
                                            </th>

                                            <th>
                                                Name
                                            </th>

                                            <th>
                                                Email
                                            </th>

                                            <th>
                                                Role
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {users.map((user) => (

                                            <tr key={user.id}>

                                                <td>
                                                    #{user.id}
                                                </td>

                                                <td>
                                                    <div className="user-name-cell">

                                                        <div className="user-small-avatar">
                                                            {user.name
                                                                ? user.name.charAt(0).toUpperCase()
                                                                : "U"}
                                                        </div>

                                                        <strong>
                                                            {user.name}
                                                        </strong>

                                                    </div>
                                                </td>

                                                <td>
                                                    {user.email}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            user.role === "ADMIN"
                                                                ? "user-role admin-role"
                                                                : "user-role student-role"
                                                        }
                                                    >
                                                        {user.role}
                                                    </span>

                                                </td>

                                                <td>

                                                    {user.role === "ADMIN" ? (

                                                        <span className="protected-user">
                                                            Protected
                                                        </span>

                                                    ) : (

                                                        <button
                                                            className="delete-user-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id,
                                                                    user.role
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )
                    }

                </section>


                {/* Back Button */}
                <button
                    className="back-admin-button"
                    onClick={() =>
                        navigate("/admin-dashboard")
                    }
                >
                    ← Back to Admin Dashboard
                </button>

            </main>

        </div>
    );
}

export default UserManagement;