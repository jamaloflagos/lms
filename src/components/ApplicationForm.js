import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCustomQuery } from '../hooks/useCustomQuery';


function generateApplicationId(prefix = 'APP') {
  const randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = prefix;
  for (let i = 0; i < 7; i++) {
    id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return id;
}


function ApplicantForm() {
    const { data: classes, isLoading: classesLoading, isError } = useCustomQuery(['classes'], `http://127.0.0.1:8000/classes`);
    const [selectedClass, setSelectedClass] = useState('');
    const [message, setMessage] = useState('');
    const [filteredClasses, setFilteredClasses] = useState([]);
  const [formData, setFormData] = useState({
    application_id: generateApplicationId(),
    first_name: '',
    last_name: '',
    contact_mail: '',
    address: '',
    contact_phone: '',
    parent_first_name: '',
    parent_last_name: '',
    parent_contact_mail: '',
    parent_address: '',
    parent_contact_phone: '',
    class_applied_for: selectedClass
  });


  const mutation = useMutation({
    mutationFn: async (applicantData) => {
      const response = await fetch('http://127.0.0.1:8000/applicants/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantData),
      });
    
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Applicant email already exist');
        }
        throw new Error('Network response was not ok');
      }
    
      return response.json();

    }, 
    onError: (error) => {
      setMessage(error.message);
    }
  });

  const handleClassSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredClasses = classes.filter((_class) =>
      _class.name.toLowerCase().includes(searchQuery)
    );
    setFilteredClasses(filteredClasses);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    mutation.mutate(formData);
  };

  useEffect(() => {
    if (classes) {
        setFilteredClasses(classes);
    }
  }, [classes]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      class_applied_for: selectedClass
    }));
  }, [selectedClass]);

  if (classesLoading) return <div>Loading....</div>
  if (isError) return <div>Error fetching data</div>
  if (mutation.isSuccess) return <div>You have successfully applied!</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Application ID:
          <input
            type="text"
            name="application_id"
            value={formData.application_id}
            readOnly
          />
        </label>
      </div>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Contact Mail:
          <input
            type="email"
            name="contact_mail"
            value={formData.contact_mail}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Contact Phone:
          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>Class Applying For:</label>
        <input
          type="text"
          placeholder="Search class..."
          onChange={handleClassSearch}
        />
        <div>
          {filteredClasses.map((_class) => (
            <div key={_class.id}>
              <input
                type="radio"
                value={_class.id}
                checked={selectedClass === _class.id}
                onChange={(e) => setSelectedClass(_class.id)}
              />
              {_class.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <label>
          Parent First Name:
          <input
            type="text"
            name="parent_first_name"
            value={formData.parent_first_name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Parent Last Name:
          <input
            type="text"
            name="parent_last_name"
            value={formData.parent_last_name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Parent Contact Mail:
          <input
            type="email"
            name="parent_contact_mail"
            value={formData.parent_contact_mail}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Parent Address:
          <textarea
            name="parent_address"
            value={formData.parent_address}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Parent Contact Phone:
          <input
            type="text"
            name="parent_contact_phone"
            value={formData.parent_contact_phone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      {message && <p>{message}</p>}
      <button type="submit" disabled={mutation.isLoading}>
        Submit
      </button>
      {mutation.isLoading && <p>Submitting...</p>}
      {/* {mutation.isError && <p>Error: {mutation.error.message}</p>} */}
    </form>
  );
}

export default ApplicantForm;
