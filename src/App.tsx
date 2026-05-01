import { Routes, Route } from "react-router-dom";
import ManageJobPost from "./pages/ManageJobPost.tsx";
import JobDetails from "./pages/JobDetails.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
            <Route path="/ManageJobPost" element={<ManageJobPost/>}/>
            <Route path="/ManageJobPost/:jobId" element={<ManageJobPost/>}/>
            <Route path="/JobDetails/:jobId" element={<JobDetails/>}/>
        </Routes>
      </div>
  );
}

export default App;