import NewOutlineForm from "./NewOutlineForm"

const AddOutline = ({ classId, subjectId}) => {
    const formattedSubjectId = subjectId.split("_")[1]

  return <NewOutlineForm classId={classId} subjectId={formattedSubjectId} />
}
export default AddOutline