import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentList from './pages/students/StudentList';
import StudentForm from './pages/students/StudentForm';
import StudentDetail from './pages/students/StudentDetail';

// Course Pages
import CourseList from './pages/courses/CourseList';
import CourseForm from './pages/courses/CourseForm';
import CourseDetail from './pages/courses/CourseDetail';

// Enrollment Pages
import EnrollmentList from './pages/enrollments/EnrollmentList';
import EnrollmentForm from './pages/enrollments/EnrollmentForm';

// Instructor Pages
import InstructorList from './pages/instructors/InstructorList';
import InstructorForm from './pages/instructors/InstructorForm';
import InstructorDetail from './pages/instructors/InstructorDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Shared Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        {/* Students */}
        <Route path="/students" element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        } />
        <Route path="/students/new" element={
          <ProtectedRoute roles={['Admin']}>
            <StudentForm />
          </ProtectedRoute>
        } />
        <Route path="/students/:id" element={
          <ProtectedRoute>
            <StudentDetail />
          </ProtectedRoute>
        } />
        <Route path="/students/:id/edit" element={
          <ProtectedRoute roles={['Admin']}>
            <StudentForm />
          </ProtectedRoute>
        } />

        {/* Courses */}
        <Route path="/courses" element={
          <ProtectedRoute>
            <CourseList />
          </ProtectedRoute>
        } />
        <Route path="/courses/new" element={
          <ProtectedRoute roles={['Admin', 'Instructor']}>
            <CourseForm />
          </ProtectedRoute>
        } />
        <Route path="/courses/:id" element={
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        } />
        <Route path="/courses/:id/edit" element={
          <ProtectedRoute roles={['Admin', 'Instructor']}>
            <CourseForm />
          </ProtectedRoute>
        } />

        {/* Enrollments */}
        <Route path="/enrollments" element={
          <ProtectedRoute>
            <EnrollmentList />
          </ProtectedRoute>
        } />
        <Route path="/enrollments/new" element={
          <ProtectedRoute roles={['Admin', 'Instructor']}>
            <EnrollmentForm />
          </ProtectedRoute>
        } />

        {/* Instructors */}
        <Route path="/instructors" element={
          <ProtectedRoute>
            <InstructorList />
          </ProtectedRoute>
        } />
        <Route path="/instructors/new" element={
          <ProtectedRoute roles={['Admin']}>
            <InstructorForm />
          </ProtectedRoute>
        } />
        <Route path="/instructors/:id" element={
          <ProtectedRoute>
            <InstructorDetail />
          </ProtectedRoute>
        } />
        <Route path="/instructors/:id/edit" element={
          <ProtectedRoute roles={['Admin']}>
            <InstructorForm />
          </ProtectedRoute>
        } />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
