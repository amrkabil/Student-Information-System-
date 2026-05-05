import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studentService from '../../services/studentService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getUser();
  const isAdmin = user?.role === 'Admin';

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.remove(id);
        setStudents(students.filter(s => s.id !== id));
      } catch (err) {
        alert('Failed to delete student.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Students</h1>
        {isAdmin && (
          <Link to="/students/new" className="btn btn-primary">
            ➕ Add New Student
          </Link>
        )}
      </div>

      <ErrorMessage message={error} />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>GPA</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No students found.</td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td style={{ fontWeight: 600 }}>{student.username}</td>
                  <td>{student.email}</td>
                  <td>
                    <span className={`badge ${student.gpa >= 3.0 ? 'badge-student' : 'badge-instructor'}`}>
                      {student.gpa?.toFixed(2)}
                    </span>
                  </td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                  <td className="gap-2 flex">
                    <Link to={`/students/${student.id}`} className="btn btn-sm btn-secondary">View</Link>
                    {isAdmin && (
                      <>
                        <Link to={`/students/${student.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                        <button 
                          onClick={() => handleDelete(student.id)} 
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

export default StudentList;
