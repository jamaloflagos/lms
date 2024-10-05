import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Application from "./pages/Application";
import Settings from "./pages/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";
import Student from "./dashboards/Student";
import Teacher from "./dashboards/Teacher";
import NotFound from "./pages/NotFound";
import Lesson from "./pages/Lesson";
import EntranceExam from "./pages/EntranceExam";
import Attendance from "./pages/Attendance";
import Attendances from "./pages/Attendances";
import Subject from "./pages/Subject";
import { useStudent } from "./hooks/useStudent";
import StudentRoutes from "./components/student/Routes";
import Payment from "./pages/Payment";
import ClassPayment from "./pages/ClassPayment";

function App() {
  const { studentId } = useStudent();
  return (
    <div className="App h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:user" element={<Login />} />
          <Route path="/apply" element={<Application />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/:classId" element={<ClassPayment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/lesson/:topic/:lessonId" element={<Lesson />} />
          <Route path="/subject/:subject/:teacherId" element={<Subject />} />
          <Route
            path="/entrance-exam/:applicantId"
            element={<EntranceExam />}
          />
          <Route path="/attendances/class/:classId" element={<Attendance />} />
          <Route
            path="attendances/student/:studentId"
            element={<Attendances />}
          />
          <Route
            path="student/*"
            element={
              !studentId ? (
                <Navigate to={"/login/student"} />
              ) : (
                <StudentRoutes />
              )
            }
          />

          {/* <Route path='/admin/' element={<AdminRoutes />} /> */}
          {/* <Route
            path="/student/dashboard"
            element={<ProtectedRoute element={<Student />} user={"student"} />}
          /> */}
          <Route
            path="/teacher/dashboard"
            element={<ProtectedRoute element={<Teacher />} user={"teacher"} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
