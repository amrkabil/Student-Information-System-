import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Logo from '../components/Logo';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <Logo size={50} className="register-logo" />
          <p>Register as a Student or Instructor</p>
        </div>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            {fieldErrors.username && <span className="field-error">{fieldErrors.username}</span>}
          </div>

          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className="flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm"
                required
              />
              {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Sign up as:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login now.</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c2-10bd-4519-998f-fd0d99a8fa2d/web/EG-en-20230501-popsignuptwoweeks-perspective_alpha_website_large.jpg');
          background-size: cover;
          background-position: center;
          padding: 2rem;
        }
        .register-card {
          background: rgba(0, 0, 0, 0.75);
          padding: 3rem;
          border-radius: 4px;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 500px;
          animation: fadeIn 1s ease-out;
        }
        .register-header {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .register-logo {
          margin-bottom: 1rem;
        }
        .register-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: white;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .register-header p {
          color: #8c8c8c;
          font-size: 0.9rem;
        }
        input, select {
          background: #333;
          border: none;
          height: 50px;
          color: white;
        }
        input:focus {
          background: #454545;
          border-bottom: 2px solid #e87c03;
        }
        .btn-block {
          width: 100%;
          height: 50px;
          margin-top: 1rem;
          font-size: 1.1rem;
        }
        .register-footer {
          margin-top: 2rem;
        }
        .register-footer p {
          color: #737373;
          font-size: 1rem;
        }
        .register-footer a {
          color: white;
          font-weight: 500;
          margin-left: 0.5rem;
        }
        .register-footer a:hover {
          text-decoration: underline;
        }
        .field-error {
          color: #e87c03;
          font-size: 0.7rem;
          margin-top: 0.25rem;
          display: block;
        }
        .success-message {
          background: #dcfce7;
          color: #166534;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        @media (max-width: 480px) {
          .register-card { padding: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Register;
