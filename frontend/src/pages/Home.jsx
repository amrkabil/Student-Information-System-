import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import studentService from '../services/studentService';
import courseService from '../services/courseService';
import enrollmentService from '../services/enrollmentService';
import instructorService from '../services/instructorService';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const user = authService.getUser();
  const isAdmin = user?.role === 'Admin';
  const isInstructor = user?.role === 'Instructor';
  const isStudent = user?.role === 'Student';
  
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
    instructors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [s, c, e, i] = await Promise.all([
          studentService.getAll(),
          courseService.getAll(),
          enrollmentService.getAll(),
          instructorService.getAll()
        ]);
        setStats({
          students: s.length,
          courses: c.length,
          enrollments: e.length,
          instructors: i.length
        });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <div className="welcome-section mb-4">
        <h1>Welcome back, {user?.username}!</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <p className="text-muted">You are logged in as:</p>
          <span className={`badge badge-${user?.role?.toLowerCase()}`}>{user?.role}</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>Total Students</h3>
            <p className="stat-value">{stats.students}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Total Courses</h3>
            <p className="stat-value">{stats.courses}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>Total Instructors</h3>
            <p className="stat-value">{stats.instructors}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Total Enrollments</h3>
            <p className="stat-value">{stats.enrollments}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions mt-4">
        <h2>Dashboard Quick Actions</h2>
        <div className="actions-grid mt-4">
          {isAdmin && (
            <>
              <Link to="/students" className="action-btn">
                <span>👥</span> Student Management
              </Link>
              <Link to="/instructors" className="action-btn">
                <span>👨‍🏫</span> Instructor Management
              </Link>
              <Link to="/courses" className="action-btn">
                <span>📖</span> Course Catalog
              </Link>
              <Link to="/enrollments" className="action-btn">
                <span>📑</span> Enrollment Logs
              </Link>
              <Link to="/students/new" className="action-btn action-btn-accent">
                <span>➕</span> Create New Student
              </Link>
            </>
          )}

          {isInstructor && (
            <>
              <Link to="/courses" className="action-btn">
                <span>👨‍💻</span> My Courses
              </Link>
              <Link to="/enrollments" className="action-btn">
                <span>📝</span> Grade Students
              </Link>
              <Link to="/courses/new" className="action-btn action-btn-accent">
                <span>➕</span> Create Course
              </Link>
            </>
          )}

          {isStudent && (
            <>
              <Link to="/courses" className="action-btn">
                <span>📖</span> Browse Courses
              </Link>
              <Link to="/enrollments" className="action-btn">
                <span>📑</span> My Enrollments
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .welcome-section h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .stat-card {
          background: #181818;
          padding: 2rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 2rem;
          border-left: 5px solid var(--primary);
          transition: var(--transition);
        }
        .stat-card:hover {
          transform: translateY(-8px) scale(1.05);
          background: #282828;
          box-shadow: 0 10px 30px rgba(0,0,0,0.8);
        }
        .stat-icon {
          font-size: 3rem;
          opacity: 0.8;
        }
        .stat-info h3 {
          font-size: 0.75rem;
          color: #808080;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .action-btn {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 4px;
          text-align: center;
          font-weight: 700;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: var(--transition);
          border: 1px solid transparent;
        }
        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.08);
          border-color: #555;
          z-index: 10;
        }
        .action-btn-accent {
          background: var(--primary);
          box-shadow: 0 4px 20px rgba(229, 9, 20, 0.3);
        }
        .action-btn-accent:hover {
          background: var(--primary-hover);
          border-color: white;
        }
        .action-btn span {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Home;
