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
    contact_mail: "",
    address: "",
    contact_phone: "",
    parent_first_name: "",
    parent_last_name: "",
    parent_contact_mail: "",
    parent_address: "",
    parent_contact_phone: "",
    class_applied_for: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const canSave = Object.values(formData).every(Boolean) && !isLoading

  const onSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
        await apply(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        application_id: "",
        first_name: "",
        last_name: "",
        contact_mail: "",
        address: "",
        contact_phone: "",
        parent_first_name: "",
        parent_last_name: "",
        parent_contact_mail: "",
        parent_address: "",
        parent_contact_phone: "",
        class_applied_for: "",
      });
      navigate('/login')
    }
  }, [isSuccess, navigate]);

  const classOptions = classes?.map((_class) => (
    <option value={_class.id} key={_class.id}>
      {_class.name}
    </option>
  ));

  const content = (
    <>
    <main>
    <form onSubmit={onSubmit}>
        {isError && <p>{error?.data?.messgae}</p>}
      <label>
        Application ID:
        <input
          type="text"
          name="application_id"
          value={formData.application_id}
          readOnly
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Contact Mail:
        <input
          type="email"
          name="contact_mail"
          value={formData.contact_mail}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Address:
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Contact Phone:
        <input
          type="text"
          name="contact_phone"
          value={formData.contact_phone}
          onChange={onChange}
          required
        />
      </label>
      <label htmlFor="_class">
        Class Applying For:
        <select id="_class" name="class_applied_for" value={formData.class_applied_for} onChange={onChange}>
            {classOptions}
        </select>
      </label>
      <label>
        Parent First Name:
        <input
          type="text"
          name="parent_first_name"
          value={formData.parent_first_name}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Parent Last Name:
        <input
          type="text"
          name="parent_last_name"
          value={formData.parent_last_name}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Parent Contact Mail:
        <input
          type="email"
          name="parent_contact_mail"
          value={formData.parent_contact_mail}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Parent Address:
        <textarea
          name="parent_address"
          value={formData.parent_address}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Parent Contact Phone:
        <input
          type="text"
          name="parent_contact_phone"
          value={formData.parent_contact_phone}
          onChange={onChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    </main>
    </>
  )
  return content
}

export default ApplicationForm;
