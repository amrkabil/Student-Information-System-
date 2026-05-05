import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import instructorService from '../../services/instructorService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    credits: 3,
    instructorId: ''
  });
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instList = await instructorService.getAll();
        setInstructors(instList);

        if (isEditMode) {
          const course = await courseService.getById(id);
          setFormData({
            title: course.title,
            description: course.description,
            credits: course.credits,
            instructorId: course.instructorId || ''
          });
        }
      } catch (err) {
        setError('Failed to load form data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
        await courseService.update(id, formData);
      } else {
        await courseService.create(formData);
      }
      navigate('/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save course.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div className="card">
        <h1>{isEditMode ? 'Edit Course' : 'Add New Course'}</h1>
        <hr className="mb-4" />

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Advanced Web Engineering"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter course description..."
              required
            ></textarea>
          </div>

          <div className="flex gap-2">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="credits">Credits (1-6)</label>
              <input
                id="credits"
                name="credits"
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="instructorId">Instructor</label>
              <select
                id="instructorId"
                name="instructorId"
                value={formData.instructorId}
                onChange={handleChange}
                required
              >
                <option value="">Select Instructor</option>
                {instructors.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    {inst.username} ({inst.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/courses')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : (isEditMode ? 'Update Course' : 'Create Course')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
