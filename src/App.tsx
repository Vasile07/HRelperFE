import { Routes, Route } from "react-router-dom";
import AddNewJobPost from "./pages/AddNewJobPost.tsx";
import JobDetails from "./pages/JobDetails.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
            <Route path="/AddJobPost" element={<AddNewJobPost/>}/>
            <Route path="/JobDetails/:jobId" element={<JobDetails/>}/>
        </Routes>
      </div>
  );
}

export default App;