// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
//   const [authToken, setAuthToken] = useState(null);
//   const [userId, setUserId] = useState(localStorage.getItem('userId'));
//   const login = (id) => {
//     localStorage.setItem('isAuthenticated', true);
//     localStorage.setItem('userId', id);
//     setIsAuthenticated(true);
//   };
//   const logout = () => {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('userId');
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, authToken, setAuthToken, userId, setUserId }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isTeacher = false
    let isAdmin = false
    let status = "Student"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, role, user_id, class_id, is_form_teacher } = decoded

        isTeacher = role === "Teacher"
        isAdmin = role === "Admin"
        // isStudent = role == "Student"

        if (isTeacher) status = "Teacher"
        if (isAdmin) status = "Admin"

        return { username, role, user_id, isAdmin, isTeacher, status, class_id }
    }

    return { username: '', role: '', isAdmin, isTeacher, status}
}
export default useAuth