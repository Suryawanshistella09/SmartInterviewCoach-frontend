import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PracticeInterview.css";

function PracticeInterview() {

    const navigate = useNavigate();
    const location = useLocation();

    const selectedType =
        location.state?.interviewType || "Technical";

    const selectedRole =
        location.state?.targetRole || "";

    const [targetRole, setTargetRole] =
        useState(selectedRole);

    const [interviewType, setInterviewType] =
        useState(selectedType);

    const [subject, setSubject] =
        useState("");

    const [difficulty, setDifficulty] =
        useState("Easy");


    // =====================================================
    // TARGET JOB ROLES
    // =====================================================

    const targetRoles = [
        "Java Developer",
        "Full Stack Developer",
        "Software Developer",
        "Frontend Developer",
        "Backend Developer",
        "Python Developer",
        "Data Analyst",
        "Cloud Engineer",
        "IoT Engineer"
    ];


    // =====================================================
    // SUBJECTS
    // =====================================================

    const subjects = {
        Technical: [
            "Java",
            "C / C++",
            "Python",
            "DBMS",
            "Operating Systems",
            "Computer Networks",
            "Data Structures",
            "Algorithms",
            "Software Engineering",
            "Cloud Computing",
            "Cyber Security",
            "IoT"
        ],
        Coding: [
            "Arrays",
            "Strings",
            "Linked List",
            "Stack & Queue",
            "Searching & Sorting",
            "Trees",
            "Graphs",
            "Dynamic Programming"
        ],
        HR: [
            "Introduction",
            "Career",
            "Teamwork",
            "Communication",
            "Leadership",
            "Problem Solving"
        ]
    };

    // Current subjects based on interview type
    const currentSubjects = subjects[interviewType] || [];


    // =====================================================
    // CHANGE INTERVIEW TYPE
    // =====================================================

    const handleInterviewTypeChange = (type) => {

        setInterviewType(type);

        // Reset subject when interview type changes
        setSubject("");
    };


    // =====================================================
    // START INTERVIEW
    // =====================================================

    const handleStartInterview = () => {

        if (!targetRole) {

            alert("Please select your target job role.");

            return;
        }

        if (!subject) {

            alert("Please select a subject before starting the interview.");

            return;
        }


        navigate(
            interviewType === "Coding"
                ? "/coding-practice"
                : "/interview-question",
            {
                state: {
                    targetRole,
                    interviewType,
                    subject,
                    difficulty
                }
            }
        );
    };


    return (

        <div className="practice-page">

            {/* =====================================================
                BACK TO DASHBOARD
            ===================================================== */}

            <button
                className="practice-back-btn"
                onClick={() => navigate("/dashboard")}
            >
                ← Back to Dashboard
            </button>


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="practice-header">

                <div>

                    <p className="page-label">
                        PRACTICE INTERVIEW
                    </p>

                    <h1>
                        Start Your Interview
                    </h1>

                    <p>
                        Choose your target job role, interview type,
                        subject and difficulty level to begin practicing.
                    </p>

                </div>

            </div>


            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div className="practice-container">

                <div className="selection-card">


                    {/* =================================================
                        TARGET JOB ROLE
                    ================================================= */}

                    <h2>
                        Select Target Job Role
                    </h2>

                    <p className="selection-description">
                        Choose the job role you are preparing for.
                    </p>


                    <div className="role-grid">

                        {targetRoles.map((role) => (

                            <button
                                key={role}
                                className={
                                    targetRole === role
                                        ? "role-card active"
                                        : "role-card"
                                }
                                onClick={() =>
                                    setTargetRole(role)
                                }
                            >

                                <span className="role-icon">
                                    💼
                                </span>

                                <strong>
                                    {role}
                                </strong>

                            </button>

                        ))}

                    </div>


                    {/* =================================================
                        INTERVIEW TYPE
                    ================================================= */}

                    <h2>
                        Choose Interview Type
                    </h2>


                    <div className="type-grid">


                        {/* TECHNICAL */}

                        <button
                            className={
                                interviewType === "Technical"
                                    ? "type-card active"
                                    : "type-card"
                            }
                            onClick={() =>
                                handleInterviewTypeChange("Technical")
                            }
                        >

                            <span className="type-icon">
                                💻
                            </span>

                            <strong>
                                Technical Interview
                            </strong>

                            <small>
                                Programming, DBMS, OS, Java and more
                            </small>

                        </button>


                        {/* CODING */}

                        <button
                            className={
                                interviewType === "Coding"
                                    ? "type-card active"
                                    : "type-card"
                            }
                            onClick={() =>
                                handleInterviewTypeChange("Coding")
                            }
                        >

                            <span className="type-icon">
                                &lt;/&gt;
                            </span>

                            <strong>
                                Coding Practice
                            </strong>

                            <small>
                                Solve coding problems and improve logic
                            </small>

                        </button>


                        {/* HR */}

                        <button
                            className={
                                interviewType === "HR"
                                    ? "type-card active"
                                    : "type-card"
                            }
                            onClick={() =>
                                handleInterviewTypeChange("HR")
                            }
                        >

                            <span className="type-icon">
                                💬
                            </span>

                            <strong>
                                HR Interview
                            </strong>

                            <small>
                                Practice common HR questions
                            </small>

                        </button>

                    </div>


                    {/* =================================================
                        SUBJECT
                    ================================================= */}

                    <h2 className="subject-title">
                        Select Subject
                    </h2>


                    <div className="subject-grid">

                        {currentSubjects.map((item) => (

                            <button
                                key={item}
                                className={
                                    subject === item
                                        ? "subject-card active"
                                        : "subject-card"
                                }
                                onClick={() =>
                                    setSubject(item)
                                }
                            >

                                {item}

                            </button>

                        ))}

                    </div>


                    {/* =================================================
                        DIFFICULTY
                    ================================================= */}

                    <h2 className="difficulty-title">
                        Select Difficulty
                    </h2>


                    <div className="difficulty-buttons">

                        {["Easy", "Medium", "Hard"].map(
                            (level) => (

                                <button
                                    key={level}
                                    className={
                                        difficulty === level
                                            ? "difficulty active"
                                            : "difficulty"
                                    }
                                    onClick={() =>
                                        setDifficulty(level)
                                    }
                                >
                                    {level}
                                </button>

                            )
                        )}

                    </div>


                    {/* =================================================
                        SELECTED INFORMATION
                    ================================================= */}

                    <div className="selected-info">

                        <p>
                            <strong>
                                Target Role:
                            </strong>{" "}

                            {targetRole || "Not selected"}
                        </p>


                        <p>
                            <strong>
                                Interview:
                            </strong>{" "}

                            {interviewType}
                        </p>


                        <p>
                            <strong>
                                Subject:
                            </strong>{" "}

                            {subject || "Not selected"}
                        </p>


                        <p>
                            <strong>
                                Difficulty:
                            </strong>{" "}

                            {difficulty}
                        </p>

                    </div>


                    {/* =================================================
                        START INTERVIEW
                    ================================================= */}

                    <button
                        className="start-interview-btn"
                        onClick={handleStartInterview}
                    >
                        Start Interview →
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PracticeInterview;