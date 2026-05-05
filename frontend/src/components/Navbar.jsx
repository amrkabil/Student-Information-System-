import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Logo size={35} />
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/students" className={isActive('/students')}>Students</Link></li>
          <li><Link to="/courses" className={isActive('/courses')}>Courses</Link></li>
          <li><Link to="/enrollments" className={isActive('/enrollments')}>Enrollments</Link></li>
          <li><Link to="/instructors" className={isActive('/instructors')}>Instructors</Link></li>
        </ul>

        <div className="nav-user">
          <div className="user-profile">
            <span className="username">{user?.username}</span>
            <span className={`badge badge-${user?.role?.toLowerCase()}`}>{user?.role}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-sm btn-primary">Logout</button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), #000;
          color: white;
          padding: 1.25rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: background 0.3s;
        }
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 4%;
        }
        .nav-logo {
          font-size: 1.8rem;
          font-weight: 900;
          color: var(--primary);
          letter-spacing: 1px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 1.25rem;
          margin-left: 2rem;
          flex-grow: 1;
        }
        .nav-links a {
          color: #e5e5e5;
          font-weight: 500;
          font-size: 0.85rem;
          transition: color 0.3s;
          padding: 0.5rem 0;
        }
        .nav-links a:hover {
          color: #b3b3b3;
        }
        .nav-links a.active {
          color: white;
          font-weight: 700;
        }
        .nav-user {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .user-profile {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .username {
          font-weight: 700;
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
