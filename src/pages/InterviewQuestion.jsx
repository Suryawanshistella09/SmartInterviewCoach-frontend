import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./InterviewQuestion.css";

function InterviewQuestion() {

    const navigate = useNavigate();
    const location = useLocation();

    // Unique ID for this interview attempt
    const attemptIdRef = useRef(crypto.randomUUID());

    // =====================================================
    // INTERVIEW DETAILS
    // =====================================================

    const interviewType =
        location.state?.interviewType || "Technical";

    const subject =
        location.state?.subject || "Java";

    const difficulty =
        location.state?.difficulty || "Easy";


    // =====================================================
    // STATE
    // =====================================================

    const [questionList, setQuestionList] =
        useState([]);

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [answers, setAnswers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =====================================================
    // FETCH QUESTIONS FROM DATABASE
    // =====================================================

    useEffect(() => {

        const fetchQuestions = async () => {

            try {

                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token");


                // Check login token
                if (!token) {

                    setError(
                        "You are not logged in. Please login again."
                    );

                    setLoading(false);

                    return;
                }


                // Get all questions from backend
                const response = await axios.get(
                    "http://localhost:8080/api/questions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                const allQuestions =
                    response.data;


                // =================================================
                // FILTER QUESTIONS
                // =================================================

                const filteredQuestions =
                    allQuestions

                        .filter((question) =>

                            question.interviewType ===
                                interviewType &&

                            question.subject ===
                                subject &&

                            question.difficulty ===
                                difficulty

                        )

                        .map((question) => ({

                            id:
                                question.id,

                            question:
                                question.question,

                            topic:
                                question.topic,

                            // Database stores keywords like:
                            // "class, object, blueprint, instance"
                            //
                            // Convert them into:
                            // ["class", "object", "blueprint", "instance"]

                            keywords:
                                question.keywords
                                    ? question.keywords
                                        .split(",")
                                        .map((keyword) =>
                                            keyword
                                                .trim()
                                                .toLowerCase()
                                        )
                                        .filter(Boolean)
                                    : []

                        }));


                setQuestionList(
                    filteredQuestions
                );

                // Start from first question
                setCurrentQuestion(0);

                setAnswer("");

                setAnswers([]);


            } catch (err) {

                console.error(
                    "Error fetching interview questions:",
                    err
                );


                // JWT expired / invalid
                if (
                    err.response &&
                    err.response.status === 401
                ) {

                    setError(
                        "Your session has expired. Please login again."
                    );

                } else {

                    setError(
                        "Unable to load interview questions."
                    );

                }

            } finally {

                setLoading(false);

            }

        };


        fetchQuestions();

    }, [
        interviewType,
        subject,
        difficulty
    ]);


    // =====================================================
    // ANSWER EVALUATION
    // =====================================================

    const evaluateAnswer = (
        userAnswer,
        expectedKeywords
    ) => {

        const normalizedAnswer =
            userAnswer
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();


        let matchedKeywords = 0;


        // =================================================
        // SYNONYMS
        // =================================================

        const synonymGroups = {

            array: [
                "array",
                "arr",
                "int[]",
                "string[]",
                "[]"
            ],

            largest: [
                "largest",
                "maximum",
                "max"
            ],

            maximum: [
                "maximum",
                "largest",
                "max"
            ],

            smallest: [
                "smallest",
                "minimum",
                "min"
            ],

            loop: [
                "loop",
                "for",
                "while",
                "do while"
            ],

            compare: [
                "compare",
                "comparison",
                ">",
                "<",
                ">=",
                "<="
            ],

            string: [
                "string",
                "stringbuilder",
                "stringbuffer"
            ],

            reverse: [
                "reverse",
                "reversed",
                "stringbuilder.reverse",
                "stringbuilder"
            ],

            character: [
                "character",
                "char",
                "charat"
            ],

            char: [
                "char",
                "character",
                "charat"
            ],

            prime: [
                "prime",
                "isprime"
            ],

            number: [
                "number",
                "int",
                "integer"
            ],

            divisible: [
                "divisible",
                "%",
                "remainder",
                "mod"
            ],

            remainder: [
                "remainder",
                "%",
                "mod"
            ],

            mod: [
                "mod",
                "%",
                "remainder"
            ],

            second: [
                "second",
                "secondlargest",
                "second largest"
            ],

            hashmap: [
                "hashmap",
                "hash map",
                "map",
                "hash"
            ],

            pair: [
                "pair",
                "two elements",
                "two numbers"
            ],

            sum: [
                "sum",
                "+",
                "addition"
            ],

            target: [
                "target",
                "targetsum"
            ],

            twosum: [
                "twosum",
                "two sum",
                "two-sum"
            ],

            frequency: [
                "frequency",
                "count",
                "occurrence",
                "occurrences"
            ],

            count: [
                "count",
                "frequency",
                "occurrence",
                "occurrences"
            ],

            set: [
                "set",
                "hashset"
            ],

            unique: [
                "unique",
                "distinct",
                "non repeating",
                "non-repeating"
            ],

            substring: [
                "substring",
                "sub string"
            ],

            "o(n)": [
                "o(n)",
                "linear time",
                "linear",
                "on"
            ]

        };


        // =================================================
        // CHECK KEYWORDS
        // =================================================

        expectedKeywords.forEach(
            (keyword) => {

                const key =
                    keyword.toLowerCase();


                // Direct match
                if (
                    normalizedAnswer.includes(
                        key
                    )
                ) {

                    matchedKeywords++;

                    return;
                }


                // Synonym match
                const alternatives =
                    synonymGroups[key] || [];


                const matched =
                    alternatives.some(
                        (alternative) =>
                            normalizedAnswer.includes(
                                alternative.toLowerCase()
                            )
                    );


                if (matched) {

                    matchedKeywords++;

                }

            }
        );


        // =================================================
        // CALCULATE PERCENTAGE
        // =================================================

        const percentage =
            expectedKeywords.length === 0
                ? 0
                : (
                    matchedKeywords /
                    expectedKeywords.length
                ) * 100;


        // =================================================
        // RESULT
        // =================================================

        if (percentage >= 60) {

            return {
                score: 2,
                result: "Correct"
            };

        }


        if (percentage >= 30) {

            return {
                score: 1,
                result: "Partially Correct"
            };

        }


        return {
            score: 0,
            result: "Incorrect"
        };

    };


    // =====================================================
    // SUBMIT ANSWER
    // =====================================================

    const handleSubmit = () => {

        // Don't allow empty answer
        if (!answer.trim()) {

            alert(
                "Please enter your answer before submitting."
            );

            return;
        }


        // Get current database question
        const currentQuestionData =
            questionList[currentQuestion];


        // Safety check
        if (!currentQuestionData) {

            alert(
                "Question not found."
            );

            return;
        }


        // Evaluate answer
        const evaluation =
            evaluateAnswer(
                answer,
                currentQuestionData.keywords
            );


        // Create answer object
        const answerData = {

            question:
                currentQuestionData.question,

            subject:
                subject,

            topic:
                currentQuestionData.topic,

            answer:
                answer,

            score:
                evaluation.score,

            result:
                evaluation.result

        };


        // Add current answer
        const updatedAnswers = [

            ...answers,

            answerData

        ];


        setAnswers(
            updatedAnswers
        );


        // =================================================
        // LAST QUESTION
        // =================================================

        if (
            currentQuestion ===
            questionList.length - 1
        ) {

            navigate(
                "/interview-result",
                {
                    state: {

                        interviewType:

                            interviewType,

                        subject:

                            subject,

                        difficulty:

                            difficulty,

                        questions:

                            questionList,

                        answers:

                            updatedAnswers,

                        // Unique interview attempt ID
                        attemptId:

                            attemptIdRef.current

                    }

                }
            );

            return;
        }


        // =================================================
        // NEXT QUESTION
        // =================================================

        setCurrentQuestion(
            currentQuestion + 1
        );

        setAnswer("");

    };


    // =====================================================
    // EXIT INTERVIEW
    // =====================================================

    const handleExit = () => {

        navigate(
            "/practice-interview"
        );

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="question-page">

                <div className="question-container">

                    <div className="question-card">

                        <h1>
                            Loading Questions...
                        </h1>

                        <p>
                            Please wait while we prepare your interview.
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="question-page">

                <div className="question-container">

                    <div className="question-card">

                        <h1>
                            Unable to Load Questions
                        </h1>

                        <p>
                            {error}
                        </p>

                        <button
                            className="submit-btn"
                            onClick={handleExit}
                        >
                            ← Back to Practice
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // NO QUESTIONS FOUND
    // =====================================================

    if (questionList.length === 0) {

        return (

            <div className="question-page">

                <div className="question-container">

                    <div className="question-card">

                        <h1>
                            Questions Not Available
                        </h1>

                        <p>

                            Questions for{" "}

                            <strong>
                                {subject}
                            </strong>

                            {" "}at{" "}

                            <strong>
                                {difficulty}
                            </strong>

                            {" "}level are not available yet.

                        </p>


                        <button
                            className="submit-btn"
                            onClick={handleExit}
                        >
                            ← Back to Practice
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN INTERVIEW UI
    // =====================================================

    return (

        <div className="question-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="question-header">

                <button
                    className="back-btn"
                    onClick={handleExit}
                >
                    ← Back
                </button>


                <div className="question-info">

                    <span>
                        {interviewType} Interview
                    </span>

                    <span>
                        {subject}
                    </span>

                    <span>
                        {difficulty}
                    </span>

                </div>

            </div>


            {/* =================================================
                QUESTION CONTAINER
            ================================================= */}

            <div className="question-container">

                <div className="question-card">


                    {/* QUESTION NUMBER */}

                    <div className="question-number">

                        Question{" "}

                        {currentQuestion + 1}

                        {" "}of{" "}

                        {questionList.length}

                    </div>


                    {/* QUESTION */}

                    <h1>

                        {
                            questionList[
                                currentQuestion
                            ].question
                        }

                    </h1>


                    {/* =================================================
                        ANSWER
                    ================================================= */}

                    <div className="answer-section">

                        <label>
                            Your Answer
                        </label>


                        <textarea

                            value={
                                answer
                            }

                            onChange={
                                (e) =>
                                    setAnswer(
                                        e.target.value
                                    )
                            }

                            placeholder=
                                "Type your answer here..."

                            rows="8"

                        />

                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="question-actions">


                        {/* EXIT */}

                        <button

                            className="exit-btn"

                            onClick={
                                handleExit
                            }

                        >

                            Exit Interview

                        </button>


                        {/* SUBMIT / NEXT */}

                        <button

                            className="submit-btn"

                            onClick={
                                handleSubmit
                            }

                        >

                            {
                                currentQuestion ===
                                questionList.length - 1

                                    ? "Finish Interview →"

                                    : "Submit Answer →"
                            }

                        </button>


                    </div>

                </div>

            </div>

        </div>

    );

}

export default InterviewQuestion;