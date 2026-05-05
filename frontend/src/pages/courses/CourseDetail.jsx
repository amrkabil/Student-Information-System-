import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = authService.getUser();
  const canManage = user?.role === 'Admin' || user?.role === 'Instructor';

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!course) return <div className="container">Course not found.</div>;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Course Details</h1>
        <div className="gap-2 flex">
          <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
          {canManage && (
            <Link to={`/courses/${id}/edit`} className="btn btn-primary">Edit Course</Link>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between align-center mb-4">
          <h2>{course.title}</h2>
          <span className="badge badge-instructor">{course.credits} Credits</span>
        </div>
        
        <p className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          {course.description}
        </p>

        <div className="info-box">
          <p><strong>Instructor:</strong> {course.instructorName || 'Unassigned'}</p>
          <p><strong>Department:</strong> {course.department || 'N/A'}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3>Enrolled Students ({course.enrolledStudents?.length || 0})</h3>
        <div className="table-container mt-4">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>GPA</th>
                <th>Enrollment Date</th>
              </tr>
            </thead>
            <tbody>
              {course.enrolledStudents?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No students enrolled yet.</td>
                </tr>
              ) : (
                course.enrolledStudents?.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td style={{ fontWeight: 600 }}>{student.firstName} {student.lastName}</td>
                    <td>
                      <span className="badge badge-student">{student.gpa?.toFixed(2)}</span>
                    </td>
                    <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
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
          border-left: 4px solid var(--accent);
        }
        .info-box p {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default CourseDetail;
