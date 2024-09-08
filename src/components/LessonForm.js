import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

function LessonForm({teacherId}) {
  const classSet = localStorage.getItem('classSet');
  const classes = [...JSON.parse(classSet)]
  const subjectSet = localStorage.getItem('subjectSet');
  const subjects = [...JSON.parse(subjectSet)]
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [hasQuiz, setHasQuiz] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [hasVideo, setHasVideo] = useState(false);
  const [video, setVideo] = useState('');
  const [dateCreated, setDateCreated] = useState('');


  const mutation = useMutation({
    mutationFn: async (newLessonData) => {
      const response = await fetch('http://127.0.0.1:8000/lessons/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLessonData),
      });
    
      if (!response.ok) {
        throw new Error('Failed to create lesson');
      }
    
      return response.json();
    },
    onError: (error) => {
      alert(error.message)
    },
    onSuccess: (data) => {
      alert('Successfully created lesson')
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLessonData = {
      teacher: teacherId,
      subject,
      topic,
      _class: selectedClass,
      content,
      has_quiz: hasQuiz,
      quiz,
      has_video: hasVideo,
      video,
      date_created: dateCreated,
    };

    mutation.mutate(newLessonData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Class</label>
        <select name="" id="" onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {
            classes && classes.map(_class => (
              <option value={_class} key={_class}>{_class}</option>
            ))
          }
        </select>
      </div>
      <div>
        <label>Subject:</label>
        <select name="" id="" onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select a subject</option>
          {
            subjects && subjects.map(subject => (
              <option value={subject}>{subject}</option>
            ))
          }
        </select>
      </div>
      <div>
        <label>Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Has Quiz:</label>
        <input
          type="checkbox"
          checked={hasQuiz}
          onChange={(e) => setHasQuiz(e.target.checked)}
        />
      </div>
      <div>
        <label>Quiz (JSON format):</label>
        <textarea
          value={JSON.stringify(quiz)}
          onChange={(e) => setQuiz(JSON.parse(e.target.value))}
          disabled={!hasQuiz}
        />
      </div>
      <div>
        <label>Has Video:</label>
        <input
          type="checkbox"
          checked={hasVideo}
          onChange={(e) => setHasVideo(e.target.checked)}
        />
      </div>
      <div>
        <label>Video URL:</label>
        <input
          type="text"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          disabled={!hasVideo}
        />
      </div>
      <div>
        <label>Date Created:</label>
        <input
          type="date"
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create Lesson'}
      </button>
      {mutation.error && <div>Error: {mutation.error.message}</div>}
    </form>
  );
}

export default LessonForm;
