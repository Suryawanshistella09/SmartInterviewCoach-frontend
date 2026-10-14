import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./CodingPractice.css";

const starterCode = {
    Java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // Read input and print your answer
    }
}`,
    Python: `import sys

def main():
    data = sys.stdin.read().strip().split()
    # Read input and print your answer

if __name__ == "__main__":
    main()`,
    C: `#include <stdio.h>

int main(void) {
    /* Read input and print your answer */
    return 0;
}`,
    "C++": `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Read input and print your answer
    return 0;
}`
};

function CodingPractice() {
    const navigate = useNavigate();
    const location = useLocation();
    const subject = location.state?.subject;
    const difficulty = location.state?.difficulty;
    const [problems, setProblems] = useState([]);
    const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [language, setLanguage] = useState("Java");
    const [codeByLanguage, setCodeByLanguage] = useState(starterCode);
    const [execution, setExecution] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [executionError, setExecutionError] = useState("");
    const [activeAction, setActiveAction] = useState("");

    useEffect(() => {
        let active = true;
        const fetchCodingProblems = async () => {
            if (!subject || !difficulty) {
                setError("Select a coding subject and difficulty to load problems.");
                setLoading(false);
                return;
            }
            if (!localStorage.getItem("token")) {
                setError("You are not logged in. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                const response = await api.get("/api/coding-problems");
                if (!Array.isArray(response.data)) {
                    throw new Error("The coding problems endpoint returned an unexpected response.");
                }
                const filteredProblems = response.data.filter((problem) =>
                    problem.subject === subject && problem.difficulty === difficulty
                );
                if (active) {
                    setProblems(filteredProblems);
                    setSelectedProblemIndex(0);
                }
            } catch (requestError) {
                console.error("Error fetching coding problems:", requestError);
                if (active) {
                    setError(requestError.response?.status === 401
                        ? "Your session has expired. Please log in again."
                        : requestError.response?.data?.detail ||
                            requestError.message ||
                            "Unable to load coding problems.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchCodingProblems();
        return () => {
            active = false;
        };
    }, [subject, difficulty]);

    const selectedProblem = problems[selectedProblemIndex];
    const sampleTestCases = Array.isArray(selectedProblem?.testCases)
        ? selectedProblem.testCases.filter((testCase) =>
            testCase.testCaseType === "Sample" && testCase.hidden !== true
        )
        : [];

    const handleCodeChange = (event) => {
        setExecution(null);
        setSubmission(null);
        setExecutionError("");
        setCodeByLanguage((currentCode) => ({
            ...currentCode,
            [language]: event.target.value
        }));
    };

    const executeCode = async (action) => {
        if (!selectedProblem?.id || activeAction) {
            return;
        }
        setActiveAction(action);
        setExecutionError("");
        setExecution(null);
        setSubmission(null);
        try {
            const storedToken = localStorage.getItem("token")?.trim();
            const token = storedToken?.replace(/^Bearer\s+/i, "");
            if (!token) {
                throw new Error("Your session has expired. Please log in again.");
            }
            const response = await api.post(`/api/coding/${action}`, {
                problemId: selectedProblem.id,
                language,
                code: codeByLanguage[language]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (action === "run") {
                setExecution(response.data);
            } else {
                setSubmission(response.data);
            }
        } catch (requestError) {
            setExecutionError(
                requestError.response?.status === 401
                    ? "Your session is no longer valid. Log in again, then retry."
                    : requestError.response?.status === 403
                    ? "This account is not authorized for student coding execution."
                    :
                requestError.response?.data?.detail ||
                requestError.response?.data?.message ||
                requestError.message ||
                "Code execution failed. Please try again."
            );
        } finally {
            setActiveAction("");
        }
    };

    return (
        <main className="coding-practice-page">
            <header className="coding-practice-header">
                <button className="coding-practice-back" onClick={() => navigate(-1)}>
                    ← Back to Practice
                </button>
                <div>
                    <p className="coding-practice-eyebrow">CODING PRACTICE</p>
                    <h1>Solve a Coding Problem</h1>
                    <div className="coding-practice-tags">
                        <span>{subject || "Subject not selected"}</span>
                        <span>{difficulty || "Difficulty not selected"}</span>
                    </div>
                </div>
            </header>

            {loading && <p className="coding-practice-notice" role="status">Loading coding problems…</p>}
            {!loading && error && (
                <p className="coding-practice-notice coding-practice-error" role="alert">{error}</p>
            )}
            {!loading && !error && problems.length === 0 && (
                <p className="coding-practice-notice" role="status">
                    No Coding problems were found for {subject} at {difficulty} difficulty.
                </p>
            )}

            {!loading && !error && selectedProblem && (
                <>
                    <section className="coding-problem-card" aria-labelledby="coding-problem-title">
                        <div className="coding-problem-heading">
                            <div>
                                <p className="coding-practice-eyebrow">
                                    {selectedProblem.topic || "CODING CHALLENGE"}
                                </p>
                                <h2 id="coding-problem-title">
                                    {selectedProblem.title || selectedProblem.question}
                                </h2>
                            </div>
                            {problems.length > 1 && (
                                <label className="coding-problem-picker">
                                    Choose problem
                                    <select
                                        value={selectedProblemIndex}
                                        disabled={Boolean(activeAction)}
                                        onChange={(event) => {
                                            setSelectedProblemIndex(Number(event.target.value))
                                            setExecution(null);
                                            setSubmission(null);
                                            setExecutionError("");
                                        }}
                                    >
                                        {problems.map((problem, index) => (
                                            <option key={problem.id ?? index} value={index}>
                                                {problem.title || problem.topic || `Problem ${index + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            )}
                        </div>

                        <div className="coding-problem-details">
                            <section>
                                <h3>Problem Description</h3>
                                <pre>{selectedProblem.description || selectedProblem.question}</pre>
                            </section>
                            <section>
                                <h3>Input Format</h3>
                                <pre>{selectedProblem.inputFormat || "Not specified."}</pre>
                            </section>
                            <section>
                                <h3>Output Format</h3>
                                <pre>{selectedProblem.outputFormat || "Not specified."}</pre>
                            </section>
                            <section>
                                <h3>Constraints</h3>
                                <pre>{selectedProblem.constraints || "Not specified."}</pre>
                            </section>
                            <section>
                                <h3>Sample Test Cases</h3>
                                {sampleTestCases.length ? (
                                    <div className="coding-test-list">
                                        {sampleTestCases.map((testCase, index) => (
                                            <article className="coding-test-case" key={testCase.id ?? index}>
                                                <strong>Sample {index + 1}</strong>
                                                <p><strong>Input:</strong> {testCase.input}</p>
                                                <p><strong>Expected output:</strong> {testCase.expectedOutput}</p>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="coding-muted">No sample test cases are included with this problem.</p>
                                )}
                            </section>
                        </div>
                    </section>

                    <section className="coding-editor-card" aria-labelledby="coding-editor-title">
                        <div className="coding-editor-header">
                            <h2 id="coding-editor-title">Code editor</h2>
                            <label>
                                Language
                                <select
                                    value={language}
                                    disabled={Boolean(activeAction)}
                                    onChange={(event) => {
                                        setLanguage(event.target.value);
                                        setExecution(null);
                                        setSubmission(null);
                                        setExecutionError("");
                                    }}
                                >
                                    {Object.keys(starterCode).map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <textarea
                            className="coding-editor"
                            aria-label={`${language} code editor`}
                            spellCheck="false"
                            disabled={Boolean(activeAction)}
                            value={codeByLanguage[language]}
                            onChange={handleCodeChange}
                        />
                        {executionError && (
                            <p className="coding-execution-error" role="alert">{executionError}</p>
                        )}
                        <div className="coding-editor-actions">
                            <button
                                type="button"
                                disabled={Boolean(activeAction) || !codeByLanguage[language]?.trim()}
                                onClick={() => executeCode("run")}
                            >
                                {activeAction === "run" ? "Running…" : "Run Code"}
                            </button>
                            <button
                                type="button"
                                disabled={Boolean(activeAction) || !codeByLanguage[language]?.trim()}
                                onClick={() => executeCode("submit")}
                            >
                                {activeAction === "submit" ? "Submitting…" : "Submit Code"}
                            </button>
                        </div>
                    </section>

                    {execution && (
                        <section className="coding-results-card" aria-live="polite">
                            <h2>Run results: {execution.verdict}</h2>
                            <p className="coding-muted">
                                {execution.passedCases} of {execution.totalCases} sample test cases passed.
                            </p>
                            <div className="coding-test-list">
                                {execution.testCases.map((testCase) => (
                                    <article className="coding-test-case" key={testCase.testCaseNumber}>
                                        <div className="coding-test-case-heading">
                                            <strong>Sample {testCase.testCaseNumber}</strong>
                                            <span className={testCase.passed ? "coding-status-passed" : "coding-status-failed"}>
                                                {testCase.status}
                                            </span>
                                        </div>
                                        {testCase.errorMessage && (
                                            <pre className="coding-execution-output">{testCase.errorMessage}</pre>
                                        )}
                                        <p><strong>Actual output:</strong></p>
                                        <pre className="coding-execution-output">{testCase.actualOutput || "(no output)"}</pre>
                                        <p><strong>Expected output:</strong></p>
                                        <pre className="coding-execution-output">{testCase.expectedOutput}</pre>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {submission && (
                        <section className="coding-results-card" aria-live="polite">
                            <h2>Submission: {submission.verdict}</h2>
                            <p>
                                Score: <strong>{Number(submission.score).toFixed(0)}%</strong>
                                {" · "}
                                Passed: <strong>{submission.passedCases}</strong>
                                {" · "}
                                Failed: <strong>{submission.totalCases - submission.passedCases}</strong>
                                {" · "}
                                Total: <strong>{submission.totalCases}</strong>
                            </p>
                        </section>
                    )}
                </>
            )}
        </main>
    );
}

export default CodingPractice;
