import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import { useState } from "react";
// import LandingPage from "./pages/Landing";
// // import Login from "./pages/Login";
// // import Application from "./pages/Application";
// import Settings from "./pages/Settings";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import Student from "./dashboards/Student";
// import Teacher from "./dashboards/Teacher";
// import NotFound from "./pages/NotFound";
// import Lesson from "./pages/Lesson";
// import EntranceExam from "./pages/EntranceExam";
// import Attendance from "./pages/Attendance";
// import Attendances from "./pages/Attendances";
// import Subject from "./pages/Subject";
// import { useStudent } from "./hooks/useStudent";
// import StudentRoutes from "./components/student/Routes";
// import Payment from "./pages/Payment";
// import ClassPayment from "./pages/ClassPayment";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import StudentLayout from "./dashboards/student/StudentLayout";
import CoursesList from "./features/courses/CoursesList";
import Course from "./components/student/Course";
import StudentDashboard from "./dashboards/student/StudentDashboard";
import TeacherLayout from "./dashboards/teacher/TeacherLayout";
import TeacherDashboard from "./dashboards/teacher/TeacherDashboard";
import EditCourse from "./features/courses/EditCourse";
import NewCourse from "./features/courses/NewCourse";
import NewLesson from "./features/lessons/NewLesson";
import EditLesson from "./features/lessons/EditLesson";
import NewModule from "./features/modules/NewModule";
import EditModule from "./features/modules/EditModule";
import AdminDashboard from "./dashboards/admin/AdminDashboard";
import AdminLayout from "./dashboards/admin/AdminLayout";
import TeachersList from "./features/teachers/TeachersList";
import EditTeacher from "./features/teachers/EditTeacher";
import NewTeacher from "./features/teachers/NewTeacher";
import ClassesList from "./features/classes/ClassesList";
import NewClass from "./features/classes/NewClass";
import Class from "./features/classes/Class";
import EditClass from "./features/classes/EditClass";
import GroupsList from "./features/groups/GroupsList";
import Group from "./features/groups/Group";
import NewGroup from "./features/groups/NewGroup";
import EditGroup from "./features/groups/EditGroup";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import Application from "./components/Application";
import Lesson from "./features/lessons/Lesson";
import Teacher from "./features/teachers/Teacher";

function App() {
  // const { studentId } = useStudent();
  return (
    // <div className="h-screen relative">
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<LandingPage />} />
    //       <Route path="/login/:user" element={<Login />} />
    //       <Route path="/apply" element={<Application />} />
    //       <Route path="/payment" element={<Payment />} />
    //       <Route path="/payment/:classId" element={<ClassPayment />} />
    //       <Route path="/settings" element={<Settings />} />
    //       <Route path="/lesson/:topic/:lessonId" element={<Lesson />} />
    //       <Route path="/subject/:subject/:teacherId" element={<Subject />} />
    //       <Route
    //         path="/entrance-exam/:applicantId"
    //         element={<EntranceExam />}
    //       />
    //       <Route path="/attendances/class/:classId" element={<Attendance />} />
    //       <Route
    //         path="attendances/student/:studentId"
    //         element={<Attendances />}
    //       />
    //       <Route
    //         path="student/*"
    //         element={
    //           !studentId ? (
    //             <Navigate to={"/login/student"} />
    //           ) : (
    //             <StudentRoutes />
    //           )
    //         }
    //       />

    //       {/* <Route path='/admin/' element={<AdminRoutes />} /> */}
    //       {/* <Route
    //         path="/student/dashboard"
    //         element={<ProtectedRoute element={<Student />} user={"student"} />}
    //       /> */}
    //       <Route
    //         path="/teacher/dashboard"
    //         element={<ProtectedRoute element={<Teacher />} user={"teacher"} />}
    //       />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </BrowserRouter>
    // </div>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="application" element={<Application />} />
        
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={[ROLES.Student]} />}>
            <Route path="student" element={<StudentLayout />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="courses" element={<CoursesList />} />
              <Route path="courses/:id" element={<Course />} />
              <Route path=":course/lesson/:id" element={<Lesson />} />
              <Route path="groups" element={<GroupsList />} />
              <Route path="groups/new" element={<NewGroup />} />
              <Route path="groups/:id" element={<Group />} />
              <Route path="groups/:id/edit" element={<EditGroup />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.Teacher]} />}>
            <Route path="teacher" element={<TeacherLayout />}>
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="courses" element={<CoursesList />} />
              <Route path="courses/new" element={<NewCourse />} />
              <Route path="courses/:id" element={<Course />} />
              <Route path="courses/:id/edit" element={<EditCourse />} />
              <Route path="lessons/new" element={<NewLesson />} />
              <Route path="lessons/:id/edit" element={<EditLesson />} />
              <Route path="modules/new" element={<NewModule />} />
              <Route path="modules/id/edit" element={<EditModule />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.Admin]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="teachers" element={<TeachersList />} />
              <Route path="teachers/new" element={<NewTeacher />} />
              <Route path="teachers/:id" element={<Teacher />} />
              <Route path="teachers/:id/edit" element={<EditTeacher />} />
              <Route path="classes" element={<ClassesList />} />
              <Route path="classes/new" element={<NewClass />} />
              <Route path="classes/:id" element={<Class />} />
              <Route path="classes/:id/edit" element={<EditClass />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={ROLES.Secretary} />}>
            <Route path="secretary"></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
