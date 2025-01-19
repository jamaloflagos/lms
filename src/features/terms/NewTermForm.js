import { useEffect, useState } from "react";
import { useAddNewTermMutation } from "./termsApiSlice";
import SuccessPromptModal from "../../components/SuccessPromptModal";

const NewTermForm = () => {
    const [addNewTerm, { isLoading, isSuccess, isError, error }] = useAddNewTermMutation();
    const [termName, setTermName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [year, setYear] = useState("");
    const [errors, setErrors] = useState({});
    const [displaySuccessModal, setDisplaySuccessModal] = useState(false)

    const validateForm = () => {
        const newErrors = {};
        if (!termName) newErrors.termName = "Term name is required.";
        if (!startDate) newErrors.startDate = "Start date is required.";
        if (!endDate) newErrors.endDate = "End date is required.";
        if (!year || isNaN(year)) newErrors.year = "Year must be a valid number.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const termData = { name: termName, start_date: startDate, end_date: endDate, year };
            await addNewTerm(termData);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setTermName("");
            setStartDate("");
            setEndDate("");
            setYear("");
            setDisplaySuccessModal(true)
        }
    }, [isSuccess]);

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={onSubmit}>
                {isError && <p className="text-red-500 mb-4">{error?.data?.message}</p>}
                <header>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">New Term</h1>
                </header>

                {/* Term Name */}
                <div className="mb-4">
                    <label htmlFor="term_name" className="block text-sm font-medium text-gray-700">Term Name</label>
                    <input
                        type="text"
                        id="term_name"
                        value={termName}
                        onChange={(e) => setTermName(e.target.value)}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.termName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.termName && <p className="text-red-500 text-sm mt-1">{errors.termName}</p>}
                </div>

                {/* Start Date */}
                <div className="mb-4">
                    <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                </div>

                {/* End Date */}
                <div className="mb-4">
                    <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                </div>

                {/* Year */}
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                        type="text"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
            {displaySuccessModal && <SuccessPromptModal setDisplaySuccessModal={setDisplaySuccessModal} />}
        </div>
    );
};

export default NewTermForm;
