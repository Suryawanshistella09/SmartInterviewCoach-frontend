import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./InterviewResult.css";

function InterviewResult() {

    const navigate = useNavigate();
    const location = useLocation();

    const {
        interviewType = "Technical",
        subject = "",
        difficulty = "Easy",
        questions = [],
        answers = [],
        attemptId = ""
    } = location.state || {};

    const hasSaved = useRef(false);

    // Total number of questions
    const totalQuestions = questions.length;

    // Count answers
    let correctAnswers = 0;
    let partialAnswers = 0;
    let wrongAnswers = 0;

    answers.forEach((answer) => {

        if (answer.result === "Correct") {
            correctAnswers++;
        }
        else if (answer.result === "Partially Correct") {
            partialAnswers++;
        }
        else {
            wrongAnswers++;
        }

    });

    // Scoring:
    // Correct = 2 marks
    // Partially Correct = 1 mark
    // Wrong = 0 marks
    const obtainedScore =
        (correctAnswers * 2) + partialAnswers;

    const maximumScore =
        totalQuestions * 2;

    const percentage =
        maximumScore > 0
            ? Math.round(
                (obtainedScore / maximumScore) * 100
            )
            : 0;


    // Save result in database only once
    useEffect(() => {

        if (hasSaved.current) {
            return;
        }

        /*
         * Check whether this interview attempt
         * has already been saved.
         */
        if (attemptId) {

            const alreadySaved =
                sessionStorage.getItem(
                    `interviewSaved_${attemptId}`
                );

            if (alreadySaved) {

                console.log(
                    "Interview already saved. Skipping duplicate save."
                );

                return;
            }
        }

        const userEmail =
            localStorage.getItem("userEmail");

        const token =
            localStorage.getItem("token");

        if (!userEmail) {
            console.log("User email not found.");
            return;
        }

        if (!token) {
            console.log("JWT token not found.");
            return;
        }

        hasSaved.current = true;

        const saveInterview = async () => {

            try {

                const resultResponse = await api.post(
    "/api/interview-results",
    {
        userEmail: userEmail,
        interviewType: interviewType,
        subject: subject,
        difficulty: difficulty,
        totalQuestions: totalQuestions,
        correctAnswers: correctAnswers,
        partialAnswers: partialAnswers,
        wrongAnswers: wrongAnswers,
        score: obtainedScore,
        percentage: percentage
    }
);

                console.log(
                    "Interview result saved successfully:",
                    resultResponse.data
                );

                /*
                 * Mark this particular interview attempt
                 * as successfully saved.
                 */
                if (attemptId) {

                    sessionStorage.setItem(
                        `interviewSaved_${attemptId}`,
                        "true"
                    );
                }

            }
            catch (error) {

                console.error(
                    "Failed to save interview result:",
                    error.response?.data || error.message
                );

                // Allow retry if saving failed
                hasSaved.current = false;
            }

        };

        saveInterview();

    }, [
        interviewType,
        subject,
        difficulty,
        totalQuestions,
        correctAnswers,
        partialAnswers,
        wrongAnswers,
        obtainedScore,
        percentage,
        attemptId
    ]);


    // Feedback based on percentage
    const getFeedback = () => {

        if (percentage >= 80) {

            return "Excellent performance! Keep practicing to maintain your strong understanding.";

        }

        if (percentage >= 50) {

            return "Good attempt. Review the topics you found difficult and practice more questions.";

        }

        return "Needs improvement. Revise the fundamentals and practice more questions from this subject.";
    };


    // Go to Dashboard
    const handleDashboard = () => {

        navigate("/dashboard");

    };


    // Practice the same interview again
    const handlePracticeAgain = () => {

        navigate("/practice-interview", {
            state: {
                interviewType,
                subject,
                difficulty
            }
        });

    };


    return (

        <div className="result-page">

            <div className="result-card">

                {/* Result Icon */}
                <div className="result-icon">
                    🎯
                </div>


                {/* Heading */}
                <p className="result-label">
                    INTERVIEW COMPLETED
                </p>

                <h1>
                    Interview Result
                </h1>

                <p className="result-description">
                    Here is a summary of your interview performance.
                    Review your score and keep practicing to improve
                    your skills.
                </p>


                {/* Interview Details */}
                <div className="result-details">

                    <div className="detail-box">

                        <span>
                            Interview Type
                        </span>

                        <strong>
                            {interviewType}
                        </strong>

                    </div>


                    <div className="detail-box">

                        <span>
                            Subject
                        </span>

                        <strong>
                            {subject || "Not specified"}
                        </strong>

                    </div>


                    <div className="detail-box">

                        <span>
                            Difficulty
                        </span>

                        <strong>
                            {difficulty}
                        </strong>

                    </div>


                    <div className="detail-box">

                        <span>
                            Total Questions
                        </span>

                        <strong>
                            {totalQuestions}
                        </strong>

                    </div>

                </div>


                {/* Score Section */}
                <div className="score-section">

                    <div className="score-circle">

                        <strong>
                            {percentage}%
                        </strong>

                        <span>
                            Overall Score
                        </span>

                    </div>


                    <div className="score-details">

                        <div className="score-item">

                            <span>
                                Marks
                            </span>

                            <strong>
                                {obtainedScore}/{maximumScore}
                            </strong>

                        </div>


                        <div className="score-item">

                            <span>
                                Correct
                            </span>

                            <strong>
                                {correctAnswers}
                            </strong>

                        </div>


                        <div className="score-item">

                            <span>
                                Partial
                            </span>

                            <strong>
                                {partialAnswers}
                            </strong>

                        </div>


                        <div className="score-item">

                            <span>
                                Wrong
                            </span>

                            <strong>
                                {wrongAnswers}
                            </strong>

                        </div>


                        <div className="score-item">

                            <span>
                                Questions
                            </span>

                            <strong>
                                {totalQuestions}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Feedback */}
                <div className="feedback-box">

                    <h2>
                        Performance Feedback
                    </h2>

                    <p>
                        {getFeedback()}
                    </p>

                </div>


                {/* Saving Message */}
                <p className="saving-message">
                    Your interview result has been saved successfully.
                </p>


                {/* Buttons */}
                <div className="result-actions">

                    <button
                        className="dashboard-btn"
                        onClick={handleDashboard}
                    >
                        Go to Dashboard
                    </button>


                    <button
                        className="practice-again-btn"
                        onClick={handlePracticeAgain}
                    >
                        Practice Again
                    </button>

                </div>

            </div>

        </div>

    );
}

export default InterviewResult;