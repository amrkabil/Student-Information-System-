import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courseService from '../../services/courseService';
import authService from '../../services/authService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = authService.getUser();
  const canManage = user?.role === 'Admin' || user?.role === 'Instructor';

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAll();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.remove(id);
        setCourses(courses.filter(c => c.id !== id));
      } catch (err) {
        alert('Failed to delete course.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-4">
        <h1>Courses</h1>
        {canManage && (
          <Link to="/courses/new" className="btn btn-primary">
            ➕ Add New Course
          </Link>
        )}
      </div>

      <ErrorMessage message={error} />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Instructor</th>
              <th>Credits</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No courses found.</td>
              </tr>
            ) : (
              courses.map(course => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td style={{ fontWeight: 600 }}>{course.title}</td>
                  <td>{course.instructorUsername}</td>
                  <td>
                    <span className="badge badge-instructor">
                      {course.credits} Credits
                    </span>
                  </td>
                  <td className="gap-2 flex">
                    <Link to={`/courses/${course.id}`} className="btn btn-sm btn-secondary">View</Link>
                    {canManage && (
                      <>
                        <Link to={`/courses/${course.id}/edit`} className="btn btn-sm btn-primary">Edit</Link>
                        <button 
                          onClick={() => handleDelete(course.id)} 
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

export default CourseList;
