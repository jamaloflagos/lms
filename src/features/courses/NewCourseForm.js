import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useAddNewCourseMutation } from "./coursesApiSlice";


const NewCourseForm = ({ classes }) => {
    const navigate = useNavigate();
  const [addNewCourse, { isLoading, isSuccess, isError, error }] = useAddNewCourseMutation();
  const { id: creator } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [_class, setClass] = useState("");
  const [image, setImage] = useState("");


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

  const formData = new FormData();
  const canSave = [title, description, status, image, creator, _class].every(Boolean) && !isLoading
  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
        const formDataArr = [title, description, status, image, creator, _class];
        formDataArr.forEach((item) => {
          formData.append(item, item);
        });
        await addNewCourse(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
        setTitle('')
        setDescription('')
        setStatus('')
        setImage('')
        setClass('')
        navigate('')
    }
  }, [isSuccess, navigate])

  const options = classes.map((_class) => {
    return (
      <option value={_class.id} key={_class.id}>
        {_class.name}
      </option>
    );
  });

  const content = (
    <>
    {isError && <p>{error?.data?.message}</p>}
      <form onSubmit={onSubmit} encType="multipart/form-data">
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
        <button>Save</button>
      </form>
    </>
  );
  return content;
};
export default NewCourseForm;
