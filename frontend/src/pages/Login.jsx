import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Logo from '../components/Logo';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(username, password);
      // Redirect based on role logic will be handled in a shared Home or protected redirection
      navigate('/'); 
    } catch (err) {
      // Use the specific message from the server if available, otherwise default
      const message = err.response?.data || 'Wrong username or password';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <Logo size={60} className="login-logo" />
          <p>Sign in to manage student information</p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            New to SIS? <Link to="/register">Sign up now.</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c2-10bd-4519-998f-fd0d99a8fa2d/web/EG-en-20230501-popsignuptwoweeks-perspective_alpha_website_large.jpg');
          background-size: cover;
          background-position: center;
          padding: 2rem;
        }
        .login-card {
          background: rgba(0, 0, 0, 0.75);
          padding: 4rem;
          border-radius: 4px;
          box-shadow: var(--shadow);
          width: 100%;
          max-width: 450px;
          animation: fadeIn 1s ease-out;
        }
        .login-header {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .login-logo {
          margin-bottom: 1.5rem;
        }
        .login-header h1 {
          font-size: 2.2rem;
          margin-bottom: 0.75rem;
          color: white;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .login-header p {
          color: #8c8c8c;
          font-size: 0.9rem;
        }
        input {
          background: #333;
          border: none;
          height: 50px;
          color: white;
        }
        input:focus {
          background: #454545;
          border-bottom: 2px solid #e87c03; /* Netflix orange-ish focus */
        }
        .btn-block {
          width: 100%;
          height: 50px;
          margin-top: 1.5rem;
          font-size: 1.1rem;
        }
        .login-footer {
          margin-top: 2rem;
          text-align: left;
        }
        .login-footer p {
          color: #737373;
          font-size: 1rem;
        }
        .login-footer a {
          color: white;
          font-weight: 500;
          margin-left: 0.5rem;
        }
        .login-footer a:hover {
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .login-card { padding: 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Login;
