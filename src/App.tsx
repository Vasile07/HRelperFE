import { Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz.tsx";

function App() {
  return (
      <div style={{flex: 1, backgroundColor: "#fff"}}>
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
  );
}

export default App;