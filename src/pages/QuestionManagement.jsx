import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./QuestionManagement.css";

const codingSubjects = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack & Queue",
    "Searching & Sorting",
    "Trees",
    "Graphs",
    "Dynamic Programming"
];

const emptyTestCases = () => [
    { id: null, input: "", expectedOutput: "", testCaseType: "Sample" },
    { id: null, input: "", expectedOutput: "", testCaseType: "Hidden" }
];

const emptyForm = () => ({
    interviewType: "Technical",
    subject: "Java",
    difficulty: "Easy",
    question: "",
    topic: "",
    keywords: "",
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    constraints: "",
    testCases: emptyTestCases()
});

const getErrorMessage = (error, fallback) =>
    error.response?.data?.detail ||
    error.response?.data?.message ||
    (typeof error.response?.data === "string" ? error.response.data : "") ||
    error.message ||
    fallback;

const getResponseList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    if (Array.isArray(data?.data)) return data.data;
    return null;
};

function QuestionManagement() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [codingProblems, setCodingProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [editingKind, setEditingKind] = useState(null);

    const fetchQuestions = async () => {
        setLoading(true);
        setError("");

        const [questionResult, codingResult] = await Promise.allSettled([
            api.get("/api/questions"),
            api.get("/api/coding-problems/admin")
        ]);
        const loadErrors = [];

        if (questionResult.status === "fulfilled") {
            const list = getResponseList(questionResult.value.data);
            if (list) {
                setQuestions(list);
            } else {
                setQuestions([]);
                loadErrors.push("Interview questions were returned in an unsupported format.");
            }
        } else {
            setQuestions([]);
            loadErrors.push(getErrorMessage(
                questionResult.reason,
                "Interview questions could not be loaded."
            ));
        }

        if (codingResult.status === "fulfilled") {
            const list = getResponseList(codingResult.value.data);
            if (list) {
                setCodingProblems(list);
            } else {
                setCodingProblems([]);
                loadErrors.push("Coding problems were returned in an unsupported format.");
            }
        } else {
            setCodingProblems([]);
            loadErrors.push(getErrorMessage(
                codingResult.reason,
                "Coding problems could not be loaded."
            ));
        }

        if (loadErrors.length > 0) {
            console.error("Error loading questions:", loadErrors);
            setError(loadErrors.join(" "));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => {
            const next = { ...current, [name]: value };
            if (name === "interviewType" && value === "Coding" &&
                !codingSubjects.includes(current.subject)) {
                next.subject = "Arrays";
            }
            return next;
        });
        setFormError("");
    };

    const updateTestCase = (index, name, value) => {
        setForm((current) => ({
            ...current,
            testCases: current.testCases.map((testCase, caseIndex) =>
                caseIndex === index ? { ...testCase, [name]: value } : testCase
            )
        }));
    };

    const addTestCase = () => {
        setForm((current) => ({
            ...current,
            testCases: [
                ...current.testCases,
                { id: null, input: "", expectedOutput: "", testCaseType: "Sample" }
            ]
        }));
    };

    const removeTestCase = (index) => {
        setForm((current) => ({
            ...current,
            testCases: current.testCases.filter((_, caseIndex) => caseIndex !== index)
        }));
    };

    const validateForm = () => {
        if (form.interviewType === "Coding" && editingKind !== "question") {
            if (
                !form.subject.trim() ||
                !form.difficulty.trim() ||
                !form.title.trim() ||
                !form.description.trim() ||
                !form.topic.trim() ||
                !form.inputFormat.trim() ||
                !form.outputFormat.trim() ||
                !form.constraints.trim()
            ) {
                return "Complete all coding problem fields before saving.";
            }
            if (form.testCases.some((testCase) =>
                !testCase.input.trim() || !testCase.expectedOutput.trim()
            )) {
                return "Every test case must have an input and expected output.";
            }
            if (!form.testCases.some((testCase) => testCase.testCaseType === "Sample")) {
                return "Add at least one sample test case.";
            }
            if (!form.testCases.some((testCase) => testCase.testCaseType === "Hidden")) {
                return "Add at least one hidden test case.";
            }
            return "";
        }

        if (!form.question.trim() || !form.topic.trim() || !form.keywords.trim()) {
            return "Please enter the interview question, evaluation topic and answer keywords.";
        }
        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationMessage = validateForm();
        if (validationMessage) {
            setFormError(validationMessage);
            return;
        }

        try {
            setSaving(true);
            setFormError("");
            if (form.interviewType === "Coding") {
                const codingProblem = {
                    subject: form.subject,
                    difficulty: form.difficulty,
                    title: form.title,
                    description: form.description,
                    topic: form.topic,
                    inputFormat: form.inputFormat,
                    outputFormat: form.outputFormat,
                    constraints: form.constraints,
                    testCases: form.testCases
                };
                const isEditingCoding = editingKind === "coding";
                if (isEditingCoding) {
                    await api.put(`/api/coding-problems/${editingId}`, codingProblem);
                } else {
                    await api.post("/api/coding-problems", codingProblem);
                }
                window.alert(isEditingCoding
                    ? "Coding problem updated successfully."
                    : "Coding problem added successfully.");
            } else {
                const question = {
                    interviewType: form.interviewType,
                    subject: form.subject,
                    difficulty: form.difficulty,
                    question: form.question,
                    topic: form.topic,
                    keywords: form.keywords
                };
                if (editingId !== null) {
                    await api.put(`/api/questions/${editingId}`, question);
                } else {
                    await api.post("/api/questions", question);
                }
                window.alert(editingId !== null
                    ? "Question updated successfully."
                    : "Question added successfully.");
            }

            setForm(emptyForm());
            setEditingId(null);
            setEditingKind(null);
            await fetchQuestions();
        } catch (requestError) {
            console.error("Save question error:", requestError);
            setFormError(getErrorMessage(requestError, "Unable to save question."));
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditingKind(item._kind);
        if (item._kind === "coding") {
            setForm({
                ...emptyForm(),
                interviewType: "Coding",
                subject: item.subject,
                difficulty: item.difficulty,
                topic: item.topic || "",
                title: item.title || "",
                description: item.description || "",
                inputFormat: item.inputFormat || "",
                outputFormat: item.outputFormat || "",
                constraints: item.constraints || "",
                testCases: (item.testCases || []).map((testCase) => ({
                    ...testCase,
                    testCaseType: testCase.testCaseType ||
                        (testCase.hidden ? "Hidden" : "Sample")
                }))
            });
        } else {
            setForm({
                ...emptyForm(),
                interviewType: item.interviewType,
                subject: item.subject,
                difficulty: item.difficulty,
                question: item.question || "",
                topic: item.topic || "",
                keywords: item.keywords || ""
            });
        }
        setFormError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (item) => {
        const typeLabel = item._kind === "coding" ? "coding problem" : "question";
        if (!window.confirm(`Are you sure you want to delete this ${typeLabel}?`)) {
            return;
        }
        try {
            if (item._kind === "coding") {
                await api.delete(`/api/coding-problems/${item.id}`);
            } else {
                await api.delete(`/api/questions/${item.id}`);
            }
            await fetchQuestions();
        } catch (requestError) {
            console.error("Delete error:", requestError);
            window.alert(getErrorMessage(requestError, `Unable to delete ${typeLabel}.`));
        }
    };

    const handleCancel = () => {
        setForm(emptyForm());
        setEditingId(null);
        setEditingKind(null);
        setFormError("");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    const allQuestions = [
        ...questions.map((question) => ({ ...question, _kind: "question" })),
        ...codingProblems.map((problem) => ({
            ...problem,
            interviewType: "Coding",
            _kind: "coding"
        }))
    ];
    const countByType = (type) =>
        allQuestions.filter((question) =>
            String(question.interviewType || "").trim().toLowerCase() === type.toLowerCase()
        ).length;

    return (
        <div className="question-management-page">
            <aside className="question-management-sidebar">
                <div className="question-management-logo">
                    <div className="question-management-logo-icon">SC</div>
                    <div><h2>Smart Interview</h2><span>Coach</span></div>
                </div>
                <nav className="question-management-nav">
                    <button onClick={() => navigate("/admin-dashboard")}><span>⌂</span>Dashboard</button>
                    <button onClick={() => navigate("/user-management")}><span>👥</span>User Management</button>
                    <button className="question-management-active"><span>📝</span>Question Management</button>
                    <button onClick={() => navigate("/interview-statistics")}><span>📊</span>Interview Statistics</button>
                </nav>
                <div className="question-management-sidebar-bottom">
                    <button onClick={() => navigate("/admin-profile")}><span>◯</span>Profile</button>
                    <button className="question-management-logout" onClick={handleLogout}><span>↪</span>Logout</button>
                </div>
            </aside>

            <main className="question-management-main">
                <header className="question-management-header">
                    <div>
                        <p>ADMIN PANEL</p>
                        <h1>Question Management</h1>
                        <span>Create and manage Technical, HR and Coding questions.</span>
                    </div>
                    <div className="question-management-admin">
                        <div className="question-management-avatar">A</div>
                        <div><strong>Administrator</strong><span>ADMIN</span></div>
                    </div>
                </header>

                <section className="question-management-stats">
                    {[
                        ["📝", "Total Questions", allQuestions.length, "Questions in database"],
                        ["💻", "Technical", countByType("Technical"), "Technical questions"],
                        ["💡", "Coding", countByType("Coding"), "Coding questions"],
                        ["🤝", "HR", countByType("HR"), "HR questions"]
                    ].map(([icon, label, count, caption]) => (
                        <div className="question-management-stat-card" key={label}>
                            <div className="question-management-stat-icon">{icon}</div>
                            <div><span>{label}</span><h3>{loading || error ? "—" : count}</h3><small>{caption}</small></div>
                        </div>
                    ))}
                </section>

                <section className="question-management-form-section">
                    <div className="question-management-section-header">
                        <div>
                            <p>{editingId !== null ? "EDIT QUESTION" : "ADD QUESTION"}</p>
                            <h2>{editingId !== null ? "Edit Interview Question" : "Create New Question"}</h2>
                        </div>
                    </div>
                    <form className="question-management-form" onSubmit={handleSubmit}>
                        <div className="question-form-row">
                            <div className="question-form-group">
                                <label htmlFor="interviewType">Interview Type</label>
                                <select
                                    id="interviewType"
                                    name="interviewType"
                                    value={form.interviewType}
                                    onChange={handleChange}
                                    disabled={editingId !== null}
                                >
                                    <option value="Technical">Technical</option>
                                    <option value="HR">HR</option>
                                    <option value="Coding">Coding</option>
                                </select>
                            </div>
                            <div className="question-form-group">
                                <label htmlFor="subject">Subject</label>
                                {form.interviewType === "Coding" && editingKind !== "question" ? (
                                    <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                                        {codingSubjects.map((subject) => <option key={subject}>{subject}</option>)}
                                    </select>
                                ) : (
                                    <input
                                        id="subject"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="Example: Java"
                                        required
                                    />
                                )}
                            </div>
                            <div className="question-form-group">
                                <label htmlFor="difficulty">Difficulty</label>
                                <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange}>
                                    <option>Easy</option><option>Medium</option><option>Hard</option>
                                </select>
                            </div>
                        </div>

                        {form.interviewType === "Coding" ? (
                            <>
                                <div className="question-form-group">
                                    <label htmlFor="title">Problem Title</label>
                                    <input id="title" name="title" value={form.title} onChange={handleChange} required />
                                </div>
                                <div className="question-form-group">
                                    <label htmlFor="description">Problem Description</label>
                                    <textarea id="description" name="description" value={form.description} onChange={handleChange} rows="4" required />
                                </div>
                                <div className="question-form-group">
                                    <label htmlFor="topic">Evaluation Topic</label>
                                    <input id="topic" name="topic" value={form.topic} onChange={handleChange} required />
                                </div>
                                <div className="question-form-grid">
                                    <div className="question-form-group">
                                        <label htmlFor="inputFormat">Input Format</label>
                                        <textarea id="inputFormat" name="inputFormat" value={form.inputFormat} onChange={handleChange} required />
                                    </div>
                                    <div className="question-form-group">
                                        <label htmlFor="outputFormat">Output Format</label>
                                        <textarea id="outputFormat" name="outputFormat" value={form.outputFormat} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="question-form-group">
                                    <label htmlFor="constraints">Constraints</label>
                                    <textarea id="constraints" name="constraints" value={form.constraints} onChange={handleChange} required />
                                </div>

                                <div className="question-test-cases">
                                    <div className="question-test-cases-heading">
                                        <div><label>Test Cases</label><small>Add sample and hidden cases; both types are required.</small></div>
                                        <button type="button" className="question-add-test-case" onClick={addTestCase}>Add Test Case</button>
                                    </div>
                                    {form.testCases.map((testCase, index) => (
                                        <article className="question-test-case" key={testCase.id ?? `new-${index}`}>
                                            <div className="question-test-case-heading">
                                                <strong>Test Case {index + 1}</strong>
                                                <button type="button" className="question-remove-test-case" onClick={() => removeTestCase(index)}>Remove</button>
                                            </div>
                                            <div className="question-form-grid">
                                                <div className="question-form-group">
                                                    <label htmlFor={`test-input-${index}`}>Input</label>
                                                    <textarea id={`test-input-${index}`} value={testCase.input} onChange={(event) => updateTestCase(index, "input", event.target.value)} required />
                                                </div>
                                                <div className="question-form-group">
                                                    <label htmlFor={`test-output-${index}`}>Expected Output</label>
                                                    <textarea id={`test-output-${index}`} value={testCase.expectedOutput} onChange={(event) => updateTestCase(index, "expectedOutput", event.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="question-form-group">
                                                <label htmlFor={`test-type-${index}`}>Test Case Type</label>
                                                <select id={`test-type-${index}`} value={testCase.testCaseType} onChange={(event) => updateTestCase(index, "testCaseType", event.target.value)}>
                                                    <option value="Sample">Sample</option>
                                                    <option value="Hidden">Hidden</option>
                                                </select>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="question-form-group">
                                    <label htmlFor="question">Interview Question</label>
                                    <textarea id="question" name="question" value={form.question} onChange={handleChange} placeholder="Enter the interview question..." rows="4" required />
                                </div>
                                <div className="question-form-group">
                                    <label htmlFor="topic">Evaluation Topic</label>
                                    <input id="topic" name="topic" value={form.topic} onChange={handleChange} placeholder="Example: OOP Concepts" required />
                                </div>
                                <div className="question-form-group">
                                    <label htmlFor="keywords">Answer Keywords</label>
                                    <input id="keywords" name="keywords" value={form.keywords} onChange={handleChange} placeholder="Example: class, object, inheritance" required />
                                    <small>Enter keywords separated by commas.</small>
                                </div>
                            </>
                        )}

                        {formError && <div className="question-management-error" role="alert">{formError}</div>}
                        <div className="question-form-actions">
                            <button type="submit" className="question-save-button" disabled={saving}>
                                {saving ? "Saving..." : editingId !== null ? "Update Question" : "Add Question"}
                            </button>
                            {editingId !== null && <button type="button" className="question-cancel-button" onClick={handleCancel}>Cancel</button>}
                        </div>
                    </form>
                </section>

                <section className="question-management-section">
                    <div className="question-management-section-header">
                        <div><p>QUESTION BANK</p><h2>All Questions</h2></div>
                        <button className="refresh-questions-button" onClick={fetchQuestions}>↻ Refresh</button>
                    </div>
                    {loading && <div className="question-management-message" role="status">Loading questions...</div>}
                    {!loading && error && <div className="question-management-error" role="alert">{error}</div>}
                    {!loading && !error && allQuestions.length === 0 && (
                        <div className="question-management-message">No questions found.</div>
                    )}
                    {!loading && !error && allQuestions.length > 0 && (
                        <div className="question-card-list">
                            {allQuestions.map((item) => (
                                <article className="question-management-card" key={`${item._kind}-${item.id}`}>
                                    <div className="question-card-header">
                                        <div>
                                            <span className="question-type-badge">{item.interviewType}</span>
                                            <span className="question-subject-badge">{item.subject}</span>
                                            <span className="question-difficulty-badge">{item.difficulty}</span>
                                        </div>
                                        <span>#{item.id}</span>
                                    </div>
                                    <div className="question-card-body">
                                        <h3>{item._kind === "coding" ? item.title : item.question}</h3>
                                        <p><strong>Topic:</strong> {item.topic}</p>
                                        {item._kind === "coding" ? (
                                            <p><strong>Test Cases:</strong> {item.testCases?.length || 0}</p>
                                        ) : (
                                            <p><strong>Keywords:</strong> {item.keywords}</p>
                                        )}
                                    </div>
                                    <div className="question-card-actions">
                                        <button className="edit-question-button" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="delete-question-button" onClick={() => handleDelete(item)}>Delete</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
                <button className="back-admin-button" onClick={() => navigate("/admin-dashboard")}>← Back to Admin Dashboard</button>
            </main>
        </div>
    );
}

export default QuestionManagement;
