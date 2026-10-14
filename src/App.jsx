import { BrowserRouter, Routes, Route } from "react-router-dom";

import InterviewQuestion from "./pages/InterviewQuestion";
import CodingPractice from "./pages/CodingPractice";
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
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import UserManagement from "./pages/UserManagement";
import QuestionManagement from "./pages/QuestionManagement";
import InterviewStatistics from "./pages/InterviewStatistics";

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
                />
                     
                <Route
                    path="/user-management"
                    element={
                        <ProtectedRoute>
                          <UserManagement />
                        </ProtectedRoute>
                }
           />

                   <Route
                    path="/admin-dashboard"
                   element={
                       <ProtectedRoute>
                       <AdminDashboard />
                       </ProtectedRoute>
          }
     />
                      <Route
                             path="/admin-profile"
                             element={
                          <ProtectedRoute>
                           <AdminProfile />
                           </ProtectedRoute>
                    }
                    />

                    <Route
                         path="/question-management"
                         element={
                            <ProtectedRoute>
                              <QuestionManagement />
                            </ProtectedRoute>
              }
      />

                   <Route
                        path="/interview-statistics"
                        element={
                         <ProtectedRoute>
                         <InterviewStatistics />
                         </ProtectedRoute>
                    }
               />

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

                <Route
                    path="/coding-practice"
                    element={
                        <ProtectedRoute>
                            <CodingPractice />
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