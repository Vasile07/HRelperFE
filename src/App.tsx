import { Routes, Route } from "react-router-dom";
import ManageJobPost from "./pages/ManageJobPost.tsx";
import JobDetails from "./pages/JobDetails.tsx";
import RegisterNewAccount from "./pages/RegisterNewAccount.tsx";
import DiscoverJobPageDashboard from "./pages/DiscoverJobPageDashboard.tsx";
import LoginPage from "./components/LoginPage.tsx";
import JobViewer from "./components/JobViewer.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
            <Route path="/Login" element={<LoginPage/>}/>
            <Route path="/JobViewer/:id" element={<JobViewer/>}/>
            <Route path="/ManageJobPost" element={<ManageJobPost/>}/>
            <Route path="/ManageJobPost/:jobId" element={<ManageJobPost/>}/><Route path="/JobDetails/:jobId" element={<JobDetails/>}/>
            <Route path="/Register" element={<RegisterNewAccount/>}/>
            <Route path="/DiscoverJobs" element={<DiscoverJobPageDashboard/>}/>
            <Route path="*" element={<div>404 Not Found</div>}/>
        </Routes>
      </div>
  );
}

export default App;