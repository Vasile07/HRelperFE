import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz.tsx";
import AddNewJobPost from "./pages/AddNewJobPost.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
            <Route path="/AddJobPost" element={<AddNewJobPost/>}/>
        </Routes>
      </div>
  );
}

export default App;