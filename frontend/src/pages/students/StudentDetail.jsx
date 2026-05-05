import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import studentService from '../../services/studentService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAdmin = authService.getRole() === 'Admin';

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await studentService.getById(id);
        setStudent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!student) return <div className="container">Student not found.</div>;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Student Details</h1>
        <div className="gap-2 flex">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
          {isAdmin && (
            <Link to={`/students/${id}/edit`} className="btn btn-primary">Edit Profile</Link>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex align-center gap-2 mb-4">
          <div style={{ fontSize: '3rem' }}>👤</div>
          <div>
            <h2>{student.firstName} {student.lastName}</h2>
            <p className="text-muted">{student.email}</p>
          </div>
        </div>

        <div className="grid-2 mt-4">
          <div className="info-item">
            <label>GPA</label>
            <p className="stat-value">{student.gpa?.toFixed(2)}</p>
          </div>
          <div className="info-item">
            <label>Date of Birth</label>
            <p>{new Date(student.dateOfBirth).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3>Current Enrollments</h3>
        <div className="table-container mt-4">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Grade</th>
                <th>Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {student.enrollments?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No enrollments found.</td>
                </tr>
              ) : (
                student.enrollments?.map(en => (
                  <tr key={en.id}>
                    <td style={{ fontWeight: 600 }}>{en.courseTitle}</td>
                    <td>{en.instructorName}</td>
                    <td>
                      <span className={`badge ${en.grade ? 'badge-student' : 'badge-instructor'}`}>
                        {en.grade || 'Not Graded'}
                      </span>
                    </td>
                    <td>{new Date(en.enrollmentDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .info-item label {
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }
        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent);
        }
      `}</style>
    </div>
  );
};

export default StudentDetail;
