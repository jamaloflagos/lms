const DeletePromptModal = ({ setCanDelete, setDisplayDeletePrompt }) => {
    const onYesClicked = () => {
        setCanDelete(true)
        setDisplayDeletePrompt(false)
      }
    
      const onNoClicked = () => {
        setCanDelete(false)
        setDisplayDeletePrompt(false)
      }
      
  return (
    <div>
            <p>Are you sure you want to delete this course?</p>
            <div>
                <button onClick={onNoClicked}>No</button>
                <button onClick={onYesClicked}>Yes</button>
            </div>
        </div>
  )
}
export default DeletePromptModal