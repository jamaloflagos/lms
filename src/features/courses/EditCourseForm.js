import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewCourseMutation, useDeleteCourseMutation } from "../courses/coursesApiSlice";
import DeletePromptModal from "../../components/DeletePromptModal";

const EditCourseForm = ({ course, classes }) => {
  const navigate = useNavigate();
  const [upDateCourse, { isLoading, isSuccess, isError, error }] = useAddNewCourseMutation();
  const [deleteCourse, {  isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteCourseMutation();
  const [canDelete, setCanDelete] = useState(false);
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [status, setStatus] = useState(course.status);
  const [_class, setClass] = useState(course._class);
  const [image, setImage] = useState(course.image);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    // const fileName = file.name;
    // const extension = fileName.split('.').pop().toLowerCase();
    // if (!extension === 'js') {
    //   setJSMessage("Please select an js file.");
    //   return;
    // }
    // setJSMessage(null);
    setImage(file);
  };

  const onDeleteCourseClicked = async () => {
    setDisplayDeletePrompt(true)
    if (canDelete) {
        await deleteCourse({id: course.id})
    }
  }

  const formData = new FormData();
  const canSave = [title, description, status, image, _class].every(Boolean) && !isLoading;
  const onSaveCourseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const formDataArr = [title, description, status, image, _class];
      formDataArr.forEach((item) => {
        formData.append(item, item);
      });
      formData.append('id', course.id)
     
      await upDateCourse(formData);
    }
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? ""

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setDescription("");
      setStatus("");
      setImage("");
      setClass("");
      navigate("");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const options = classes.map((_class) => {
    return (
      <option value={_class.id} key={_class.id}>
        {_class.name}
      </option>
    );
  });

  const content = (
    <>
      {(isError || isDelError) && <p>{errContent}</p>}

      <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
        <div>
            <h2>Edit Course #{course.title}</h2>
            <div>
                <button onClick={onSaveCourseClicked}>Save</button>
                <button onClick={onDeleteCourseClicked}>Delete</button>
            </div>
        </div>

        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label htmlFor="status">
          Status:
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="O">Open</option>
            <option value="W">Waitlisted</option>
          </select>
        </label>
        <label htmlFor="class">
          Class:
          <select
            id="class"
            value={_class}
            onChange={(e) => setClass(e.target.value)}
          >
            {options}
          </select>
        </label>
        <label htmlFor="image">
          <input
            type="file"
            id="image"
            name="image"
            onChange={onFileChange}
          />
        </label>

        <div>
          {image ? <p>preview</p> : <img src={image} alt="course_image" />}
        </div>
      </form>

      {displayDeletePrompt && <DeletePromptModal setCanDelete={setCanDelete} setDisplayDeletePrompt={setDisplayDeletePrompt} />}
    </>
  );
  return content;
};
export default EditCourseForm;
