import { useAddNewTeacherMutation } from "./teachersApiSlice";
import { memo, useEffect, useState } from "react";
import SuccessPromptModal from "../../components/SuccessPromptModal";

const NewTeacherForm = ({
  allClasses,
  filteredClasses,
  sch_subjects,
  fetchClassesForSubject,
}) => {

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
  const [errors, setErrors] = useState({});
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false)

  const canSave =
    [firstName, lastName, email, subjects?.length > 0].every(Boolean) &&
    !isLoading &&
    subjects.every(
      (subject) => subject.subject_id && subject.classes_ids.length > 0
    );

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      subjects,
    };

    if (isFormTeacher && form_class) {
      payload.is_form_teacher = isFormTeacher;
      payload.form_class = form_class;
    }

    if (canSave) {
      await addNewTeacher(payload);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubjects([{ subject_id: "", classes_ids: [] }]);
      setIsFormTeacher(false);
      setFormClass("");
      setDisplaySuccessModal(true)
    }
  }, [isSuccess]);

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim() || !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email))
      newErrors.email = "A valid email is required.";

    subjects.forEach((subject, index) => {
      if (!subject.subject_id) {
        newErrors[`subject_${index}`] = "Subject is required.";
      }
      if (!subject.classes_ids.length) {
        newErrors[`classes_${index}`] = "At least one class must be selected.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubjectClassesChange = (e, index, field) => {
    const options = Array.from(e.target.selectedOptions);
    const value = options.map((opt) => opt.value);
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
  };

  const onSubjectNameChange = (index, field, value) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    );
    fetchClassesForSubject(value);
    // setSubjectId(value);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subject_id: "", classes_ids: [] }]);
  };

  const removeSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

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

  const teacherSubjects = subjects?.map((subject, index) => (
    <div key={index} className="mb-4">
      <label htmlFor={`subject_name_${index}`} className="block text-gray-700">
        Subject Name:
      </label>
      <select
        id={`subject_name_${index}`}
        value={subject.subject_id}
        onChange={(e) =>
          onSubjectNameChange(index, "subject_id", e.target.value)
        }
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select Subject</option>
        {subjectOptions}
      </select>
      {errors[`subject_${index}`] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[`subject_${index}`]}
        </p>
      )}

      <label htmlFor={`classes_${index}`} className="block text-gray-700 mt-2">
        Classes:
      </label>
      <select
        id={`classes_${index}`}
        value={subject.classes_ids}
        onChange={(e) => onSubjectClassesChange(e, index, "classes_ids")}
        multiple
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="">Select Classes</option>
        {filteredClassesOptions}
      </select>
      {errors[`classes_${index}`] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[`classes_${index}`]}
        </p>
      )}

      <button
        type="button"
        onClick={() => removeSubject(index)}
        className="text-red-500 mt-2"
      >
        Remove Subject
      </button>
    </div>
  ));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <header className="mb-4 font-bold text-3xl text-blue-600">
          Add New Teacher
        </header>
        {isError && (
          <p className="text-red-500 text-sm mb-4">{error?.data?.message}</p>
        )}

        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {teacherSubjects}

        <button
          type="button"
          onClick={addSubject}
          className="bg-green text-white py-2 px-4 rounded mt-4"
        >
          Add Subject
        </button>

        <div className="mb-4 mt-6">
          <label htmlFor="is_form_teacher" className="block text-gray-700">
            Is Form Teacher:
          </label>
          <input
            type="checkbox"
            id="is_form_teacher"
            checked={isFormTeacher}
            onChange={(e) => setIsFormTeacher(e.target.checked)}
            className="ml-2"
          />
        </div>

        {isFormTeacher && (
          <div className="mb-4">
            <label htmlFor="_class" className="block text-gray-700">
              Form Class:
            </label>
            <select
              id="_class"
              value={form_class}
              onChange={(e) => setFormClass(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select a Class</option>
              {allClassesOptions}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          // disabled={!canSave}
        >
          {isLoading ? "Saving..." : "Save" }
        </button>
      </form>
      {displaySuccessModal && <SuccessPromptModal setDisplaySuccessModal={setDisplaySuccessModal} />}
    </div>
  );
};

const MemoizedNewTeacherForm = memo(NewTeacherForm);

export default MemoizedNewTeacherForm;
