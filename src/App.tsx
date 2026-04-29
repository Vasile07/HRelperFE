import { Routes, Route } from "react-router-dom";
import AddNewJobPost from "./pages/AddNewJobPost.tsx";
import JobDetails from "./pages/JobDetails.tsx";
import RegisterNewAccount from "./pages/RegisterNewAccount.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
            <Route path="/AddJobPost" element={<AddNewJobPost/>}/>
            <Route path="/JobDetails/:jobId" element={<JobDetails/>}/>
            <Route path="/Register" element={<RegisterNewAccount/>}/>
        </Routes>
      </div>
  );
}

export default App;