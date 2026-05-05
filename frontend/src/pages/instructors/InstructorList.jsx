import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import instructorService from '../../services/instructorService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getUser();
  const isAdmin = user?.role === 'Admin';

  const fetchInstructors = async () => {
    try {
      const data = await instructorService.getAll();
      setInstructors(data);
    } catch (err) {
      setError('Failed to load instructors.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this instructor?')) {
      try {
        await instructorService.remove(id);
        setInstructors(instructors.filter(i => i.id !== id));
      } catch (err) {
        alert('Failed to delete instructor.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Instructors</h1>
        {isAdmin && (
          <Link to="/instructors/new" className="btn btn-primary">
            ➕ Add New Instructor
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
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instructors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No instructors found.</td>
              </tr>
            ) : (
              instructors.map(inst => (
                <tr key={inst.id}>
                  <td>{inst.id}</td>
                  <td style={{ fontWeight: 600 }}>{inst.username}</td>
                  <td>{inst.email}</td>
                  <td>
                    <span className="badge badge-instructor">{inst.department}</span>
                  </td>
                  <td className="gap-2 flex">
                    <Link to={`/instructors/${inst.id}`} className="btn btn-sm btn-secondary">View</Link>
                    {isAdmin && (
                      <>
                        <Link to={`/instructors/${inst.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                        <button 
                          onClick={() => handleDelete(inst.id)} 
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

export default InstructorList;
