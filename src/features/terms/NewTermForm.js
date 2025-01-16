import { useEffect, useState } from "react"
import { useAddNewTermMutation } from "./termsApiSlice"
import { useNavigate } from "react-router-dom"

const NewTermForm = () => {
    const [addNewTerm, {isLoading, isSuccess, isError, error}] = useAddNewTermMutation()
    const [termName, setTermName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [year, setYear] = useState("")
    const navigate = useNavigate()

    const canSave = [termName, startDate, endDate, year].every(Boolean) && !isLoading

    const onSubmit = async (e) => {
        e.preventDefault()
        const termData = {
            name: termName,
            start_date: startDate,
            end_date: endDate,
            year
        }

        if (canSave) {
            await addNewTerm(termData)
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setTermName("")
            setStartDate("")
            setEndDate("")
            setYear("")
            navigate("/admin/dashboard")
        }
    }, [isSuccess, navigate])

  return (
    <>
        <form onSubmit={onSubmit}>
        {isError && <p>{error?.data?.message}</p>}
            <label htmlFor="term_name">Term Name:
                <input type="text" id="term_name" value={termName} onChange={(e) => setTermName(e.target.value)} />
            </label>
            <label htmlFor="start_date">Start Date:
                <input type="date" id="start_date" value={startDate} onChange={(e) => setStartDate(e.target.valueAsDate)} />
            </label>
            <label htmlFor="end_date">End Date:
                <input type="date" id="end_date" value={endDate} onChange={(e) => setEndDate(e.target.valueAsDate)} />
            </label>
            <label htmlFor="year">Year:
                <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
            </label>
            <div>
                <button>Save</button>
            </div>
        </form>
    </>
  )
}
export default NewTermForm