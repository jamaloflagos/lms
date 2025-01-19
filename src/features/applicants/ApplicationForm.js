import React, { useState, useEffect } from "react";
import { useApplyMutation } from "./applicantsApiSlice";
import { useNavigate } from "react-router-dom";

function generateApplicationId(prefix = "APP") {
  const randomChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = prefix;
  for (let i = 0; i < 7; i++) {
    id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return id;
}

function ApplicationForm({ classes }) {
  const navigate = useNavigate();
  const [apply, { isLoading, isSuccess, isError, error }] = useApplyMutation();
  const [formData, setFormData] = useState({
    application_id: generateApplicationId(),
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
    d_o_b: "",
    parent_first_name: "",
    parent_last_name: "",
    parent_email: "",
    parent_address: "",
    parent_phone_number: "",
    class_applied_for: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required.";
      }
    });

    // Validate email fields
    if (
      formData.email &&
      !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format.";
    }
    if (
      formData.parent_email &&
      !/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.parent_email)
    ) {
      newErrors.parent_email = "Invalid email format.";
    }

    // Validate phone numbers
    if (formData.phone_number && !/^\d{10,15}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10-15 digits.";
    }
    if (
      formData.parent_phone_number &&
      !/^\d{10,15}$/.test(formData.parent_phone_number)
    ) {
      newErrors.parent_phone_number = "Phone number must be 10-15 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() && !isLoading) {
      await apply(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        application_id: generateApplicationId(),
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        phone_number: "",
        d_o_b: "",
        parent_first_name: "",
        parent_last_name: "",
        parent_email: "",
        parent_address: "",
        parent_phone_number: "",
        class_applied_for: "",
      });
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const classOptions = classes?.map((_class) => (
    <option value={_class.id} key={_class.id}>
      {_class.name}
    </option>
  ));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <header className="mb-4 font-bold text-3xl text-blue-600">
          <h1>Application Form</h1>
        </header>
        {isError && (
          <p className="text-red-500 text-sm mb-4">{error?.data?.message}</p>
        )}

        <div className="mb-4">
          <label htmlFor="application_id" className="block text-gray-700">
            Application ID:
          </label>
          <input
            type="text"
            id="application_id"
            name="application_id"
            value={formData.application_id}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {[
          { id: "first_name", label: "First Name" },
          { id: "last_name", label: "Last Name" },
          { id: "email", label: "Email", type: "email" },
          { id: "address", label: "Address", type: "textarea" },
          { id: "phone_number", label: "Contact Phone" },
          { id: "d_o_b", label: "Date of Birth", type: "date" },
          { id: "parent_first_name", label: "Parent First Name" },
          { id: "parent_last_name", label: "Parent Last Name" },
          { id: "parent_email", label: "Parent Email", type: "email" },
          { id: "parent_address", label: "Parent Address", type: "textarea" },
          { id: "parent_phone_number", label: "Parent Contact Phone" },
        ].map(({ id, label, type = "text" }) => (
          <div className="mb-4" key={id}>
            <label htmlFor={id} className="block text-gray-700">
              {label}:
            </label>
            {type === "textarea" ? (
              <textarea
                id={id}
                name={id}
                value={formData[id]}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            ) : (
              <input
                type={type}
                id={id}
                name={id}
                value={formData[id]}
                onChange={onChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            )}
            {errors[id] && (
              <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
            )}
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="_class" className="block text-gray-700">
            Class Applying For:
          </label>
          <select
            id="_class"
            name="class_applied_for"
            value={formData.class_applied_for}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Choose Class</option>
            {classOptions}
          </select>
          {errors.class_applied_for && (
            <p className="text-red-500 text-sm mt-1">
              {errors.class_applied_for}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
