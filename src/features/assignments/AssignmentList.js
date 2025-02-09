import {  useMemo } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetAssignmentsQuery } from "./assignmentsApiSlice";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const AssignmentList = ({ class_id, subject_id }) => {
    const { status } = useAuth();
    const filter =
        status === "Teacher" ? { class_id, subject_id } : { class_id };

    // Stable current date
    const currentDate = useMemo(
        () => new Date().toISOString().split("T")[0],
        []
    );

    const {
        assignments = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAssignmentsQuery(filter, {
        selectFromResult: (result) => ({
            assignments: Object.values(result?.data?.entities || {}).map(
                (assignment) => ({
                    id: assignment.id,
                    subject: assignment.subject,
                    due_date: assignment.due_date,
                })
            ),
            ...result,
        }),
    });

    const filteredAssignments = useMemo(() => {
        return assignments.filter(
            (assignment) => assignment.due_date > currentDate
        );
    }, [assignments, currentDate]);

    let content;

    if (isLoading) {
        content = <Spinner />;
    } else if (isError) {
        content = (
            <p className="text-red-600">
                {error?.data?.message || "An error occurred."}
            </p>
        );
    } else if (isSuccess && filteredAssignments.length === 0) {
        content = (
            <p className="text-gray-500 italic">
                No upcoming assignments available.
            </p>
        );
    } else if (isSuccess) {
        content = (
            <ul className="space-y-4">
                {filteredAssignments.map((assignment) => (
                    <li
                        key={assignment.id}
                        className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
                    >
                        <Link
                            to={`${assignment.id}`}
                            className="flex justify-between items-center text-blue-600 hover:underline"
                        >
                            <span className="font-medium text-gray-800">
                                {assignment.subject}
                            </span>
                            <span className="text-sm text-gray-600">
                                Due: {assignment.due_date}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }

    return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Assignments</h2>
        {content}
    </div>
);
};

export default AssignmentList;
