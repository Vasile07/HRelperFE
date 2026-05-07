import { Routes, Route } from "react-router-dom";
import ManageJobPost from "./pages/ManageJobPost.tsx";
import RegisterNewAccount from "./pages/RegisterNewAccount.tsx";
import DiscoverJobPageDashboard from "./pages/DiscoverJobPageDashboard.tsx";
import LoginPage from "./components/LoginPage.tsx";
import JobViewer from "./components/JobViewer.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import {UserRole} from "./constants/UserRole.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
            <Route path="/Login" element={<LoginPage/>}/>
            <Route path="/JobViewer/:id" element={<JobViewer/>}/>
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
            <Route path="/Register" element={<RegisterNewAccount/>}/>
            <Route path="/DiscoverJobs" element={<DiscoverJobPageDashboard/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="*" element={<div>404 Not Found</div>}/>
        </Routes>
      </div>
  );
}

export default App;