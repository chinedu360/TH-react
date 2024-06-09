import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import Classroom from "./Pages/classroom/Classroom";
import Student from "./Pages/student/Student";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/student/:id" element={<Student />} />
      </Routes>
    </Router>
  );
}

export default App;
