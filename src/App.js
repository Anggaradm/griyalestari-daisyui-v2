import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  NotFoundPage,
  PrintFinancialReport,
  SigninPage,
  SignupPage,
} from "./pages";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/print-financial-report"
            element={<PrintFinancialReport />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
