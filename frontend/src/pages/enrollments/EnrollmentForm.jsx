import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import enrollmentService from '../../services/enrollmentService';
import studentService from '../../services/studentService';
import courseService from '../../services/courseService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: ''
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sList, cList] = await Promise.all([
          studentService.getAll(),
          courseService.getAll()
        ]);
        setStudents(sList);
        setCourses(cList);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await enrollmentService.create(formData);
      navigate('/enrollments');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('This student is already enrolled in this course.');
      } else {
        setError(err.response?.data?.message || 'Failed to create enrollment.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <div className="card">
        <h1>New Enrollment</h1>
        <hr className="mb-4" />

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentId">Select Student</label>
            <select
              id="studentId"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
            >
              <option value="">-- Choose Student --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.username} (ID: {s.id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="courseId">Select Course</label>
            <select
              id="courseId"
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              required
            >
              <option value="">-- Choose Course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/enrollments')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Enrolling...' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;
