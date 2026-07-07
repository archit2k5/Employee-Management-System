import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Overview from "./pages/Overview";
import Employees from "./pages/Employees";
import LeaveApproval from "./pages/LeaveApproval";
import Recruitment from "./pages/Recruitment";
import Departments from "./pages/Departments";
import Performance from "./pages/Performance";

function App() {
  return (
    <Layout>
      <Routes>

        <Route path="/" element={<Overview />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/leave" element={<LeaveApproval />} />

        <Route path="/recruitment" element={<Recruitment />} />

        <Route path="/departments" element={<Departments />} />

        <Route path="/performance" element={<Performance />} />

      </Routes>
    </Layout>
  );
}

export default App;