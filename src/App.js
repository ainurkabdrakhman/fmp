import React from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate,} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Workload from "./pages/WorkLoad";
import WorkOrderDetails from "./pages/WorkOrderDetails";
import EngineerProfiles from "./pages/EngineerProfiles";
import EngineerProfileDetails from "./pages/EngineerProfileDetails";
import Reports from "./pages/Reports";
import NewWorkOrder from "./pages/NewWorkOrder";
import "./App.css";

function ProtectedRoute({ allowedRoles, children }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="app-layout">
      {!hideHeaderFooter && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workorder/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <WorkOrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-workorder"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <NewWorkOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/workload"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <Workload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/engineers"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <EngineerProfiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <EngineerProfiles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profiles/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <EngineerProfileDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["admin", "technician"]}>
                <Reports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
