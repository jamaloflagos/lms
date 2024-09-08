import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from '../hooks/useAuth';

const fetchSubjects = async () => {
    const response = await fetch('/api/subjects/'); // Replace with your actual endpoint
    if (!response.ok) throw new Error('Error fetching subjects');
    return response.json();
  };

const fetchClasses = async () => {
  const response = await fetch('/api/classes/');
  if (!response.ok) throw new Error('Error fetching subjects');
  return response.json();
};

const TeacherForm = () => {
  const { authToken } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isFormTeacher, setIsFormTeacher] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [filteredlasses, setFilteredClasses] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const { data: subjects, isLoading: subjectsLoading } = useQuery('subjects', fetchSubjects);
  const { data: classes, isLoading: classesLoading } = useQuery('classes', fetchClasses);

  const saveTeacher = async (teacherData) => {
    const response = await fetch('/api/teachers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authToken
      },
      body: JSON.stringify(teacherData),
    });
    return response.json();
  };

  const mutation = useMutation(saveTeacher, {
    onSuccess: () => {
      alert('Teacher saved successfully!');
    },
    onError: () => {
      alert('Error saving teacher');
    },
  });

  const handleSubjectSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredSubjects = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchQuery)
    );
    setFilteredSubjects(filteredSubjects);
  };

  const handleClassSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredClasses = classes.filter((_class) =>
      _class.name.toLowerCase().includes(searchQuery)
    );
    setFilteredClasses(filteredClasses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherData = {
      first_name: firstName,
      last_name: lastName,
      subjects: selectedSubjects,
      is_form_teacher: isFormTeacher,
      _class: selectedClass,
    };
    mutation.mutate(teacherData);
  };


  useEffect(() => {
    if (subjects && classes) {
        setFilteredSubjects(subjects);
        setFilteredClasses(classes);
    }
  }, [subjects, classes]);

  if (subjectsLoading || classesLoading) return <div>Loading....</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Subjects:</label>
        <input
          type="text"
          placeholder="Search subjects..."
          onChange={handleSubjectSearch}
        />
        <div>
          {filteredSubjects.map((subject) => (
            <div key={subject.id}>
              <input
                type="checkbox"
                checked={selectedSubjects.includes(subject.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSubjects([...selectedSubjects, subject.name]);
                  } else {
                    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject.name));
                  }
                }}
              />
              {subject.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Class:</label>
        <input
          type="text"
          placeholder="Search class..."
          onChange={handleClassSearch}
        />
        <div>
          {filteredlasses.map((_class) => (
            <div key={_class.id}>
              <input
                type="radio"
                value={_class.id}
                checked={selectedClass === _class.id}
                onChange={(e) => setSelectedClass(e.target.value)}
              />
              {_class.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isFormTeacher}
            onChange={(e) => setIsFormTeacher(e.target.checked)}
          />
          Is Form Teacher
        </label>
      </div>

      <button type="submit">Save Teacher</button>
    </form>
  );
};

export default TeacherForm;
