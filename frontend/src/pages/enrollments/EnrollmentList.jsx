import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import enrollmentService from '../../services/enrollmentService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const user = authService.getUser();
  const canManage = user?.role === 'Admin' || user?.role === 'Instructor';

  const fetchEnrollments = async () => {
    try {
      const data = await enrollmentService.getAll();
      setEnrollments(data);
    } catch (err) {
      setError('Failed to load enrollments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enrollment?')) {
      try {
        await enrollmentService.remove(id);
        setEnrollments(enrollments.filter(e => e.id !== id));
      } catch (err) {
        alert('Failed to delete enrollment.');
      }
    }
  };

  const handleUpdateGrade = async (enrollment) => {
    try {
      await enrollmentService.update(enrollment.id, {
        studentId: enrollment.studentId,
        courseId: enrollment.courseId,
        grade: newGrade
      });
      setEnrollments(enrollments.map(e => e.id === enrollment.id ? { ...e, grade: newGrade } : e));
      setEditingId(null);
    } catch (err) {
      alert('Failed to update grade.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Enrollments</h1>
        {canManage && (
          <Link to="/enrollments/new" className="btn btn-primary">
            ➕ New Enrollment
          </Link>
        )}
      </div>

      <ErrorMessage message={error} />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No enrollments found.</td>
              </tr>
            ) : (
              enrollments.map(en => (
                <tr key={en.id}>
                  <td>{en.id}</td>
                  <td style={{ fontWeight: 600 }}>{en.studentName}</td>
                  <td style={{ fontWeight: 600 }}>{en.courseTitle}</td>
                  <td>
                    {editingId === en.id ? (
                      <div className="flex gap-2">
                        <select 
                          value={newGrade} 
                          onChange={(e) => setNewGrade(e.target.value)}
                          style={{ width: '80px', padding: '0.25rem' }}
                        >
                          <option value="">N/A</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="F">F</option>
                        </select>
                        <button onClick={() => handleUpdateGrade(en)} className="btn btn-sm btn-primary">Save</button>
                        <button onClick={() => setEditingId(null)} className="btn btn-sm btn-secondary">X</button>
                      </div>
                    ) : (
                      <span className={`badge ${en.grade ? 'badge-student' : 'badge-instructor'}`}>
                        {en.grade || 'Not Graded'}
                      </span>
                    )}
                  </td>
                  <td>{new Date(en.enrollmentDate).toLocaleDateString()}</td>
                  <td className="gap-2 flex">
                    {canManage && (
                      <>
                        <button 
                          onClick={() => { setEditingId(en.id); setNewGrade(en.grade || ''); }} 
                          className="btn btn-sm btn-secondary"
                        >
                          Edit Grade
                        </button>
                        <button 
                          onClick={() => handleDelete(en.id)} 
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrollmentList;
