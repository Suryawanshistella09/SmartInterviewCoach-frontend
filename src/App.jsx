import { BrowserRouter, Routes, Route } from "react-router-dom";

import InterviewQuestion from "./pages/InterviewQuestion";
import InterviewResult from "./pages/InterviewResult";
import MyProgress from "./pages/MyProgress";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PracticeInterview from "./pages/PracticeInterview";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                   <Route
                         path="/settings"
                        element={
                            <ProtectedRoute>
                            <Settings /> 
                            </ProtectedRoute>
                          } 
                / >

                    
                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Practice Interview */}
                <Route
                    path="/practice-interview"
                    element={
                        <ProtectedRoute>
                            <PracticeInterview />
                        </ProtectedRoute>
                    }
                />


                {/* Interview Questions */}
                <Route
                    path="/interview-question"
                    element={
                        <ProtectedRoute>
                            <InterviewQuestion />
                        </ProtectedRoute>
                    }
                />


                {/* Interview Result */}
                <Route
                    path="/interview-result"
                    element={
                        <ProtectedRoute>
                            <InterviewResult />
                        </ProtectedRoute>
                    }
                />


                {/* My Progress */}
                <Route
                    path="/my-progress"
                    element={
                        <ProtectedRoute>
                            <MyProgress />
                        </ProtectedRoute>
                    }
                />


                {/* Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;