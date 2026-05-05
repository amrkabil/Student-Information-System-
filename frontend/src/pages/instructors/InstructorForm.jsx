import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instructorService from '../../services/instructorService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const InstructorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchInstructor = async () => {
        try {
          const inst = await instructorService.getById(id);
          setFormData({
            firstName: inst.firstName,
            lastName: inst.lastName,
            email: inst.email,
            department: inst.department
          });
        } catch (err) {
          setError('Failed to load instructor data.');
        } finally {
          setLoading(false);
        }
      };
      fetchInstructor();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (isEditMode) {
        await instructorService.update(id, formData);
      } else {
        await instructorService.create(formData);
      }
      navigate('/instructors');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save instructor.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h1>{isEditMode ? 'Edit Instructor' : 'Add New Instructor'}</h1>
        <hr className="mb-4" />

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/instructors')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : (isEditMode ? 'Update Instructor' : 'Create Instructor')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorForm;
