import { useNavigate } from "react-router-dom";
import { useDeleteTeacherMutation, useUpdateTeacherMutation } from "./teachersApiSlice";
import { useEffect, useState } from "react";
import DeletePromptModal from "../../components/DeletePromptModal";
import SuccessPromptModal from "../../components/SuccessPromptModal";

const EditTeacherForm = ({ teacher, allClasses, filteredClasses, sch_subjects, setSubjectId }) => {
  const navigate = useNavigate();
  const [updateTeacher, { isLoading, isSuccess, isError, error }] =
    useUpdateTeacherMutation(); 
  const [deleteTeacher, {isLoading: isDelLoading, isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteTeacherMutation();

  // State for form fields
  const [firstName, setFirstName] = useState(teacher.first_name);
  const [lastName, setLastName] = useState(teacher.last_name);
  const [email, setEmail] = useState(teacher.email);
  const [subjects, setSubjects] = useState(teacher.subjects);
  const [isFormTeacher, setIsFormTeacher] = useState(teacher.is_form_teacher);
  const [form_class, setFormClass] = useState(teacher.form_class);

  const [displaySuccessModal, setDisplaySuccessModal] = useState(false)
  const [errors, setErrors] = useState({});
  const [displayDeletePrompt, setDisplayDeletePrompt] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  const canSave =
    [firstName, lastName, email, subjects?.length].every(Boolean) && !isLoading;

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
      if (!subject?.classes_ids?.length) {
        newErrors[`classes_${index}`] = "At least one class must be selected.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSaveTeacherClicked = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      id: teacher.id,
      first_name: firstName,
      last_name: lastName,
      email,
      subjects,
      is_form_teacher: isFormTeacher,
      form_class,
    };
    
    await updateTeacher(payload);
  };

  const handleDeleteTeacher = async () => {
      await deleteTeacher({id: teacher.id});
  };

  if (canDelete) {
    handleDeleteTeacher()
    setCanDelete(false)
  }

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

    setSubjectId(value)
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


  useEffect(() => {
    if (isSuccess) {
      // setFirstName("");
      // setLastName("");
      // setEmail("");
      // setSubjects([{ subject_id: "", classes_ids: [] }]);
      // setIsFormTeacher(false);
      // setFormClass("");
      setDisplaySuccessModal(true)
    }
    if (isDelSuccess) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setSubjects([{ subject_id: "", classes_ids: [] }]);
      setIsFormTeacher(false);
      setFormClass("");
      navigate("/admin/teachers")
    }
  }, [isSuccess, navigate, isDelSuccess]);

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

  const subjectOptions = sch_subjects?.map(subject => (
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
        onChange={(e) => onSubjectNameChange(index, "subject_id", e.target.value)}
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
        onSubmit={onSaveTeacherClicked}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
        <header className="mb-4 font-bold text-3xl text-blue-600">
          Edit Teacher: {teacher.first_name} {teacher.last_name}
        </header>
        {isError && (
          <p className="text-red-500 text-sm mb-4">{error?.data?.message}</p>
        )}
        {(isDelError) && <p className="text-red-500 text-sm mb-4">{delError?.data?.message}</p>}

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

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onSaveTeacherClicked}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {isLoading ? "Saving..." : "Save" }
          </button>
          <button
            type="button"
            onClick={() => setDisplayDeletePrompt(true)}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            { isDelLoading ? "Deleting" : "Delete"}
          </button>
        </div>
      </form>
      {displaySuccessModal && <SuccessPromptModal setDisplaySuccessModal={setDisplaySuccessModal} />} 
      {displayDeletePrompt && <DeletePromptModal setCanDelete={setCanDelete} setDisplayDeletePrompt={setDisplayDeletePrompt} resource={'teacher'} />}
    </div>
  );
};

export default EditTeacherForm;
