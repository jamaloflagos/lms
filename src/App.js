import { Route, Routes } from "react-router-dom";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import { Dashboard as ApplicantDashboard } from "./pages/applicant/Dashboard";
import { Dashboard as StudentDashboard } from "./pages/student/Dashboard";
import { Dashboard as TeacherDashboard } from "./pages/teacher/Dashboard";
import { Dashboard as AdminDashboard } from "./pages/admin/Dashboard";
import { Subject as TeacherSubject } from "./pages/teacher/Subject";
import { Subject as StudentSubject } from "./pages/student/Subject";
import { Subjects as TeacherSubjects } from "./pages/teacher/Subjects";
import { Subjects as StudentSubjects } from "./pages/student/Subjects";
import { Outline as StudentOutline } from "./pages/student/Outline";
import { Outline as TeacherOutline } from "./pages/teacher/Outline";
import { Note as TeacherNote } from "./pages/teacher/Note";
import { Note as StudentNote } from "./pages/student/Note";
import { Exam as ApplicantExam } from "./pages/applicant/Exam";
import { Reports as StudentReports } from "./pages/student/Reports";
import { Reports as TeacherReports } from "./pages/teacher/Reports";
import EditTeacher from "./pages/admin/EditTeacher";
import NewTeacher from "./pages/admin/NewTeacher";
import Classes from "./pages/admin/Classes";
import NewClass from "./pages/admin/NewClass";
import Class from "./pages/admin/Class";
import EditClass from "./pages/admin/EditClass";
import GroupsList from "./features/groups/GroupsList";
import Group from "./features/groups/Group";
import NewGroup from "./features/groups/NewGroup";
import EditGroup from "./features/groups/EditGroup";
import AppLayout from "./layouts/AppLayout";
import Public from "./pages/Public";
import Login from "./pages/Login";
import Teacher from "./pages/admin/Teacher";
import Apply from "./pages/Apply";
import UserLayout from "./layouts/UserLayout";
import NotFound from "./pages/NotFound";
import OutlineLists from "./features/outlines/OutlineLists";
import NewOutline from "./pages/teacher/NewOutline";
import EditOutline from "./pages/teacher/EditOutline";
import NewNote from "./pages/teacher/NewNote";
import EditNote from "./pages/teacher/EditNote";
import Teachers from "./pages/admin/Teachers";
import NewAssignment from "./pages/teacher/NewAssignment";
import NewExam from "./pages/teacher/NewExam";
import NewTest from "./pages/teacher/NewTest";
import Assignments from "./pages/student/Assignments";
import Assignment from "./pages/student/Assignment";
import Tests from "./pages/student/Tests";
import Test from "./pages/student/Test";
import Exams from "./pages/student/Exams";
import Exam from "./pages/student/Exam";
import useAuth from "./hooks/useAuth";
import NewTerm from "./pages/admin/NewTerm";

function App() {
  const { is_form_teacher } = useAuth();
  const studentUrlSegments = [
    "dashboard",
    "subjects",
    "assignments",
    "tests",
    "exams",
    "reports",
    "word-of-the-day",
  ];
  const applicantUrlSegments = ["dashboard"];
  const adminUrlSegments = ["dashboard", "classes", "teachers"];
  const teacherUrlSegments = [
    "dashboard",
    "subjects",
    "assignments",
    "tests",
    "exams",
  ];

  if (is_form_teacher) {
    teacherUrlSegments.push("reports");
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="apply" element={<Apply />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRole={[ROLES.Applicant]} />}>
            <Route
              path="applicant"
              element={<UserLayout urlSegments={applicantUrlSegments} />}
            >
              <Route path="dashboard" element={<ApplicantDashboard />} />
              <Route path=":id/entrance_exam" element={<ApplicantExam />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRole={[ROLES.Student]} />}>
            <Route
              path="student"
              element={<UserLayout urlSegments={studentUrlSegments} />}
            >
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="subjects" element={<StudentSubjects />} />
              <Route path="subjects/:subjectId" element={<StudentSubject />} />
              <Route
                path="subjects/:subjectId/outlines"
                element={<OutlineLists />}
              />
              <Route
                path="subjects/:subjectId/outlines/:outlineId/:classId"
                element={<StudentOutline />}
              />
              <Route
                path="subjects/outlines/:outlineId/notes/:noteId"
                element={<StudentNote />}
              />
              <Route path="assignments" element={<Assignments />} />
              <Route path="assignment/:assignmentId" element={<Assignment />} />
              <Route path="tests" element={<Tests />} />
              <Route path="test/:testId" element={<Test />} />
              <Route path="exams" element={<Exams />} />
              <Route path="exam/:examId" element={<Exam />} />
              <Route path="reports" element={<StudentReports />} />
              <Route path="groups" element={<GroupsList />} />
              <Route path="groups/new" element={<NewGroup />} />
              <Route path="groups/:id" element={<Group />} />
              <Route path="groups/:id/edit" element={<EditGroup />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.Teacher]} />}>
            <Route
              path="teacher"
              element={<UserLayout urlSegments={teacherUrlSegments} />}
            >
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="reports" element={<TeacherReports />} />
              <Route path="subjects" element={<TeacherSubjects />} />
              <Route path="subjects/:subjectId" element={<TeacherSubject />} />
              <Route
                path="subjects/:subjectId/outlines"
                element={<OutlineLists />}
              />
              <Route
                path="subjects/:subjectId/exams/new/:classId"
                element={<NewExam />}
              />
              <Route
                path="subjects/:subjectId/tests/new/:classId"
                element={<NewTest />}
              />
              <Route
                path="subjects/:subjectId/assignments/new/:classId"
                element={<NewAssignment />}
              />
              <Route
                path="subjects/:subjectId/outlines/new/:classId"
                element={<NewOutline />}
              />
              <Route
                path="subjects/outlines/:outlineId/edit"
                element={<EditOutline />}
              />
              <Route
                path="subjects/:subjectId/outlines/:outlineId/:classId"
                element={<TeacherOutline />}
              />
              <Route
                path="subjects/outlines/:outlineId/notes/:noteId"
                element={<TeacherNote />}
              />
              <Route
                path="subjects/outlines/:outlineId/notes/new"
                element={<NewNote />}
              />
              <Route
                path="subjects/outlines/:outlineId/notes/:noteId/edit"
                element={<EditNote />}
              />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={[ROLES.Admin]} />}>
            <Route
              path="admin"
              element={<UserLayout urlSegments={adminUrlSegments} />}
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="teachers/new" element={<NewTeacher />} />
              <Route path="teachers/:id" element={<Teacher />} />
              <Route path="teachers/:id/edit" element={<EditTeacher />} />
              <Route path="classes" element={<Classes />} />
              <Route path="classes/new" element={<NewClass />} />
              <Route path="classes/:id" element={<Class />} />
              <Route path="classes/:id/edit" element={<EditClass />} />
              <Route path="terms/new" element={<NewTerm />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={ROLES.Secretary} />}>
            <Route path="secretary"></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
