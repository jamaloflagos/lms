import { useNavigate } from "react-router-dom";
import { useAddNewTeacherMutation } from "./teachersApiSlice";
import { useEffect, useState } from "react";

const NewTeacherForm = ({ classes }) => {
  const navigate = useNavigate();
  const [addNewTeacher, { isLoading, isSuccess, isError, error }] =
    useAddNewTeacherMutation();

  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subjects, setSubjects] = useState([
    {
      name: "",
      classes: [],
    },
  ]);
  const [isFormTeacher, setIsFormTeacher] = useState(false);
  const [form_class, setFormClass] = useState("");

  console.log(classes)
  const canSave =
    [firstName, lastName, email, subjects?.length].every(Boolean) && !isLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      if (form_class) {
        await addNewTeacher({
          first_name: firstName,
          last_name: lastName,
          email,
          subjects,
          is_form_teacher: isFormTeacher,
          form_class: form_class,
        });
      } else {
        await addNewTeacher({
          first_name: firstName,
          last_name: lastName,
          email,
          subjects,
          is_form_teacher: isFormTeacher,
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubjects([]);
      setIsFormTeacher(false);
      setFormClass("");
      navigate("/admin/teachers"); // Redirect to teachers list page
    }
  }, [isSuccess, navigate]);

  // Class options for dropdown
  const classOptions = classes?.map((_class) => (
    <option value={_class.name} key={_class.id}>
      {_class.name}
    </option>
  ));

  const onSubjectClassesChange = (e, index, field) => {
    const options = Array.from(e.target.selectedOptions);
    const value = options.map((opt) => opt.value);
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) => {
        if (i === index) {
          return {
            ...subject,
            [field]: value,
          };
        }
        return subject;
      })
    );
  };

  const onSubjectNameChange = (index, field, value) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) => {
        if (i === index) {
          return {
            ...subject,
            [field]: value,
          };
        }
        return subject;
      })
    );
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", classes: [] }]);
  };

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const teacherSubjects = subjects?.map((subject, index) => (
    <div key={index}>
      <label htmlFor="subject_name">
        Subjects Name:
        <input
          type="text"
          id="subject_name"
          value={subject.name}
          onChange={(e) => onSubjectNameChange(index, "name", e.target.value)}
        />
      </label>

      <label htmlFor="classes">
        Classes:
        <select
          id="classes"
          value={subject.classes}
          onChange={(e) => onSubjectClassesChange(e, index, "classes")}
          multiple
        >
          <option value="">Select Classes</option>
          {classOptions}
        </select>
      </label>
      <div>{subject.classes.join(' ,')}</div>
      <button onClick={() => removeSubject(index)}>-</button>
    </div>
  ));

  const content = (
    <>
      {isError && <p className="error">{error?.data?.message}</p>}

      <form onSubmit={onSubmit}>
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

        {isFormTeacher && (
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
        )}

        <button type="submit" disabled={!canSave}>
          Save
        </button>
      </form>
    </>
  );

  return content;
};

export default NewTeacherForm;
