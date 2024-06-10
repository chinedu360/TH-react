import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load the components
const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"));
const Classroom = lazy(() => import("./Pages/classroom/Classroom"));
const Student = lazy(() => import("./Pages/student/Student"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
