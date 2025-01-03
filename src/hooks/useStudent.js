import { createContext, useContext, useState } from "react";

const StudentContext = createContext()
export const useStudent = () => useContext(StudentContext)

export const StudentProvider = ({children}) => {
    const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));
    const [studentDetail, setStudentDetail] = useState(JSON.parse(localStorage.getItem('studentDetail')));

    const contextValue = {
        studentId,
        setStudentId,
        studentDetail,
        setStudentDetail
    }
    return (
        <StudentContext.Provider value={contextValue}>
            {children}
        </StudentContext.Provider>
    )
}