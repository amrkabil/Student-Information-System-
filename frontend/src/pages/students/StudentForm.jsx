import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import studentService from '../../services/studentService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gpa: ''
  });
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const student = await studentService.getById(id);
          setFormData({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            dateOfBirth: student.dateOfBirth.split('T')[0],
            gpa: student.gpa
          });
        } catch (err) {
          setError('Failed to load student data.');
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode]);

  const validate = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required';
    if (formData.gpa === '' || formData.gpa < 0 || formData.gpa > 4.0) errors.gpa = 'GPA must be between 0 and 4.0';
    
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

    setSubmitting(true);
    setError('');

    try {
      if (isEditMode) {
        await studentService.update(id, formData);
      } else {
        await studentService.create(formData);
      }
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save student.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h1>{isEditMode ? 'Edit Student' : 'Add New Student'}</h1>
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
                className={fieldErrors.firstName ? 'border-error' : ''}
              />
              {fieldErrors.firstName && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{fieldErrors.firstName}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={fieldErrors.lastName ? 'border-error' : ''}
              />
              {fieldErrors.lastName && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{fieldErrors.lastName}</span>}
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
              className={fieldErrors.email ? 'border-error' : ''}
            />
            {fieldErrors.email && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{fieldErrors.email}</span>}
          </div>

          <div className="flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={fieldErrors.dateOfBirth ? 'border-error' : ''}
              />
              {fieldErrors.dateOfBirth && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{fieldErrors.dateOfBirth}</span>}
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="gpa">GPA</label>
              <input
                id="gpa"
                name="gpa"
                type="number"
                step="0.01"
                value={formData.gpa}
                onChange={handleChange}
                className={fieldErrors.gpa ? 'border-error' : ''}
              />
              {fieldErrors.gpa && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{fieldErrors.gpa}</span>}
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/students')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : (isEditMode ? 'Update Student' : 'Create Student')}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .border-error {
          border-color: var(--error) !important;
        }
      `}</style>
    </div>
  );
};

export default StudentForm;
