import { useNavigate } from "react-router-dom";
import { useAddNewTeacherMutation } from "./teachersApiSlice";
import { memo, useEffect, useState } from "react";

const NewTeacherForm = ({
  allClasses,
  filteredClasses,
  sch_subjects,
  setSubjectId,
}) => {
  const navigate = useNavigate();
  const [addNewTeacher, { isLoading, isSuccess, isError, error }] =
    useAddNewTeacherMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subjects, setSubjects] = useState([
    {
      subject_id: "",
      classes_ids: [],
    },
  ]);
  const [isFormTeacher, setIsFormTeacher] = useState(false);
  const [form_class, setFormClass] = useState("");
  const canSave =
    [firstName, lastName, email, subjects?.length > 0].every(Boolean) &&
    !isLoading;

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

  const filteredClassesOptions = filteredClasses?.map((_class) => (
    <option value={_class.id} key={_class.id}>
      {_class.name}
    </option>
  ));

  const allClassesOptions = allClasses?.map((_class) => (
    <option value={_class.id} key={_class.id}>
      {_class.name}
    </option>
  ));

  const subjectOptions = sch_subjects?.map((subject) => (
    <option value={subject.id} key={subject.id}>
      {subject.name}
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
    setSubjectId(value);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject_id: "", classes_ids: [] }]);
  };

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const teacherSubjects = subjects?.map((subject, index) => (
    <div key={index}>
      <label htmlFor="subject_name">
        Subjects Name:
        <select
          id="subject_name"
          value={subject.subject_id}
          onChange={(e) =>
            onSubjectNameChange(index, "subject_id", e.target.value)
          }
        >
          <option value="">Select Subject</option>
          {subjectOptions}
        </select>
      </label>

      <label htmlFor="classes">
        Classes:
        <select
          id="classes"
          value={subject.classes_id}
          onChange={(e) => onSubjectClassesChange(e, index, "classes_ids")}
          multiple
        >
          <option value="">Select Classes</option>
          {filteredClassesOptions}
        </select>
      </label>
      {/* <div>{subject.classes.join(' ,')}</div> */}
      <button type="button" onClick={() => removeSubject(index)}>
        -
      </button>
    </div>
  ));


  const content = (
    <>
      <form onSubmit={onSubmit}>
        {isError && <p className="error">{error?.data?.message}</p>}
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
        <button type="button" onClick={addSubject}>
          Add Subject
        </button>

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
              {allClassesOptions}
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

const memoizedTeacherForm = memo(NewTeacherForm);

export default memoizedTeacherForm;
