import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from '../hooks/useAuth';

const fetchSubjects = async () => {
  const response = await fetch('/api/subjects/'); // Replace with your actual endpoint
  if (!response.ok) throw new Error('Error fetching subjects');
  return response.json();
};

function ClassForm() {
  const { authToken } = useAuth();
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [category, setCategory] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const { data: subjects, isLoading, error } = useQuery('subjects', fetchSubjects);

const mutation = useMutation({
  mutationFn: async (newClassData) => {
    const response = await fetch('/api/classes/', { // Replace with your actual endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authentication': authToken
      },
      body: JSON.stringify(newClassData),
    });
    if (!response.ok) throw new Error('Error creating class');
    return response.json();
  }
})

//   const handleSubjectToggle = (subject) => {
//     setSelectedSubjects(prev => 
//       prev.includes(subject)
//         ? prev.filter(item => item !== subject)
//         : [...prev, subject]
//     );
//   };

  const handleSubjectSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredSubjects = subjects.filter((subject) =>
      subject.name.toLowerCase().includes(searchQuery)
    );
    setFilteredSubjects(filteredSubjects);
  };

//   const filteredSubjects = subjects?.filter(subject =>
//     subject.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newClass = {
      name,
      nick_name: nickName,
      category,
      subjects: selectedSubjects,
    };

    mutation.mutate(newClass); // Use useMutation to handle form submission
  };

  useEffect(() => {
    if (subjects) {
        setFilteredSubjects(subjects);
    }
  }, [subjects, ]);

  if (isLoading) return <div>Loading subjects...</div>;
  if (error) return <div>Error loading subjects.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Class Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Nick Name:
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Subjects:
          <input
            type="text"
            placeholder="Search subjects..."
            onChange={handleSubjectSearch}
          />
          <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc' }}>
            {filteredSubjects.map((subject) => (
              <div key={subject.id}>
                <label>
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
                </label>
              </div>
            ))}
          </div>
        </label>
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {mutation.error && <div>Error: {mutation.error.message}</div>}
    </form>
  );
}

export default ClassForm;
