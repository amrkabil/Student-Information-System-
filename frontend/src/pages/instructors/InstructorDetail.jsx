import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import instructorService from '../../services/instructorService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';

const InstructorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = authService.getRole() === 'Admin';

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const data = await instructorService.getById(id);
        setInstructor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructor();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!instructor) return <div className="container">Instructor not found.</div>;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Instructor Details</h1>
        <div className="gap-2 flex">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
          {isAdmin && (
            <Link to={`/instructors/${id}/edit`} className="btn btn-primary">Edit Profile</Link>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex align-center gap-2 mb-4">
          <div style={{ fontSize: '3rem' }}>👨‍🏫</div>
          <div>
            <h2>{instructor.firstName} {instructor.lastName}</h2>
            <p className="text-muted">{instructor.email}</p>
          </div>
        </div>

        <div className="info-box mt-4">
          <p><strong>Department:</strong> {instructor.department}</p>
          <p><strong>Office:</strong> {instructor.office || 'Main Faculty'}</p>
          <p><strong>Bio:</strong> {instructor.bio || 'Expert in their field.'}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3>Courses Taught ({instructor.courses?.length || 0})</h3>
        <div className="table-container mt-4">
          <table>
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Credits</th>
                <th>Enrolled Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructor.courses?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">Not teaching any courses currently.</td>
                </tr>
              ) : (
                instructor.courses?.map(course => (
                  <tr key={course.id}>
                    <td style={{ fontWeight: 600 }}>{course.title}</td>
                    <td>{course.credits}</td>
                    <td>{course.studentCount || 0}</td>
                    <td>
                      <Link to={`/courses/${course.id}`} className="btn btn-sm btn-secondary">View Course</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .info-box {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid var(--primary);
        }
        .info-box p {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default InstructorDetail;
