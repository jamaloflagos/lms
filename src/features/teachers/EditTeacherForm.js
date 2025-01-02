import { useNavigate } from "react-router-dom";
import { useDeleteTeacherMutation, useUpdateTeacherMutation } from "./teachersApiSlice";
import { useEffect, useState } from "react";
import DeletePromptModal from "../../components/DeletePromptModal";

const EditTeacherForm = ({ teacher, classes }) => {
  const navigate = useNavigate();
  const [updateTeacher, { isLoading, isSuccess, isError, error }] =
    useUpdateTeacherMutation(); 
  const [deleteTeacher, {  isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteTeacherMutation()

  // State for form fields
  const [firstName, setFirstName] = useState(teacher.first_name);
  const [lastName, setLastName] = useState(teacher.last_name);
  const [email, setEmail] = useState(teacher.email);
  const [subjects, setSubjects] = useState(teacher.subjects);
  const [isFormTeacher, setIsFormTeacher] = useState(teacher.is_form_teacher);
  const [form_class, setFormClass] = useState(teacher.form_class);

  const [canDelete, setCanDelete] = useState(false);
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);

  const canSave =
    [firstName, lastName, email, subjects.length].every(Boolean) && !isLoading;

  const onSaveTeacherClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (form_class) {
        await updateTeacher({
          first_name: firstName,
          last_name: lastName,
          email,
          subjects,
          is_form_teacher: isFormTeacher,
          form_class: form_class,
        });
      } else {
        await updateTeacher({
          first_name: firstName,
          last_name: lastName,
          email,
          subjects,
          is_form_teacher: isFormTeacher,
        });
      }
    }
  };

  const onDeleteTeacherClicked = async () => {
    setDisplayDeletePrompt(true)
    if (canDelete) {
        await deleteTeacher({id: teacher.id})
    }
  }

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubjects([]);
      setIsFormTeacher(false);
      setFormClass("");
      navigate("/teachers"); // Redirect to teachers list page
    }
  }, [isSuccess, navigate, isDelSuccess]);

  // Class options for dropdown
  const classOptions = classes.map((_class) => (
    <option value={_class.name} key={_class.id}>
      {_class.name}
    </option>
  ));

  const onSubjectClassesChange = (e, index, field) => {
    const options = Array.from(e.target.selectedOptions);
    const value = options.map((opt) => opt.value);
    setSubjects(prevSubjects => {
        prevSubjects.map((subject, i) => {
            if (i === index) {
                return {
                    ...subject,
                    [field]: value
                }
            } else return subject
        })
    })
  };

  const onSubjectNameChange = (index, field, value) => {
    setSubjects(prevSubjects => {
        prevSubjects.map((subject, i) => {
            if (i === index) {
                return {
                    ...subject,
                    [field]: value
                }
            } else return subject
        })
    })
  }

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: "", classes: [] }
    ]);
  };

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? ""

  const teacherSubjects = subjects.map((subject, index) => (
    <div>
      <label htmlFor="subject_name">
        Subjects Name:
        <input
          type="text"
          id="subject_name"
          value={subject.name}
          onChange={(e) => onSubjectNameChange(index, 'name', e.target.value)}
        />
      </label>
      <label htmlFor="classes">
        Classes:
        <select
          id="classes"
          value={subject.classes}
          onChange={(e) => onSubjectClassesChange(e, index, 'classes')}
          multiple
        >
          {classOptions}
        </select>
      </label>
      <button onClick={removeSubject(index)}>-</button>
    </div>
  ));

  const content = (
    <>
      {(isError || isDelError) && <p>{errContent}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
      <div>
            <h2>Edit Teacher #{teacher.first_name} {teacher.last_name}</h2>
            <div>
                <button onClick={onSaveTeacherClicked}>Save</button>
                <button onClick={onDeleteTeacherClicked}>Delete</button>
            </div>
        </div>

        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {teacherSubjects}
        <button onClick={addSubject}>Add Subject</button>

        <label htmlFor="is_form_teacher">
          Is Form Teacher:
          <input
            type="checkbox"
            id="is_form_teacher"
            checked={isFormTeacher}
            onChange={(e) => setIsFormTeacher(e.target.checked)}
          />
        </label>

        <label htmlFor="_class">
          Class:
          <select
            id="_class"
            value={form_class}
            onChange={(e) => setFormClass(e.target.value)}
          >
            <option value="">Select a class</option>
            {classOptions}
          </select>
        </label>
      </form>

      {displayDeletePrompt && <DeletePromptModal setCanDelete={setCanDelete} setDisplayDeletePrompt={setDisplayDeletePrompt} />}
    </>
  );

  return content;
};

export default EditTeacherForm;
