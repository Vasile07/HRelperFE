import {Routes, Route, Navigate} from "react-router-dom";
import ManageJobPost from "./pages/ManageJobPost.tsx";
import RegisterNewAccount from "./pages/RegisterNewAccount.tsx";
import DiscoverJobPageDashboard from "./pages/DiscoverJobPageDashboard.tsx";
import LoginPage from "./components/LoginPage.tsx";
import JobViewer from "./components/JobViewer.tsx";
import Profile from "./pages/Profile.tsx";
import AnalyticsDashboard from "./analytics/AnalyticsDashboard.jsx"
import ProtectedRoute from "./ProtectedRoute.tsx";
import {UserRole} from "./constants/UserRole.tsx";
import RouteLogger from "./RouteLogger.tsx";

function App() {
    return (
        <div style={{flex: 1, backgroundColor: "#fff"}}>
            <RouteLogger>
                <Routes>
                    <Route path="/" element={<Navigate to="/DiscoverJobs" replace/>}/>

                    <Route path="/Login" element={<LoginPage/>}/>
                    <Route path="/Register" element={<RegisterNewAccount/>}/>

                    <Route path="/JobViewer/:id" element={
                        <ProtectedRoute allowedRoles={[UserRole.HiringManager, UserRole.Recruiter]}>
                            <JobViewer/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/ManageJobPost" element={
                        <ProtectedRoute allowedRoles={[UserRole.HiringManager]}>
                            <ManageJobPost/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/ManageJobPost/:jobId" element={
                        <ProtectedRoute allowedRoles={[UserRole.HiringManager]}>
                            <ManageJobPost/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/DiscoverJobs" element={
                        <ProtectedRoute allowedRoles={[UserRole.HiringManager, UserRole.Recruiter]}>
                            <DiscoverJobPageDashboard/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/Profile" element={
                        <ProtectedRoute allowedRoles={[UserRole.HiringManager, UserRole.Recruiter]}>
                            <Profile/>
                        </ProtectedRoute>
                    }/>

                    <Route path="/AnalyticsDashboard" element={
                        <ProtectedRoute allowedRoles={[UserRole.Admin]}>
                            <AnalyticsDashboard/>
                        </ProtectedRoute>
                    }/>

                    <Route path="*" element={
                        <ProtectedRoute allowedRoles={[UserRole.HiringManager, UserRole.Recruiter]}>
                            <div>404 Not Found</div>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </RouteLogger>
        </div>
    );
}

export default App;