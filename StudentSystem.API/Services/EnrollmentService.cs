using Microsoft.EntityFrameworkCore;
using StudentSystem.API.Data;
using StudentSystem.API.DTOs;
using StudentSystem.API.Models;

namespace StudentSystem.API.Services;

public interface IEnrollmentService
{
    Task<IEnumerable<EnrollmentReadDto>> GetAllAsync();
    Task<EnrollmentReadDto?> GetByIdAsync(int id);
    Task<EnrollmentReadDto> EnrollAsync(EnrollmentCreateDto dto);
    Task<bool> UpdateGradeAsync(int id, double grade);
    Task<bool> IsEnrolledAsync(int studentId, int courseId);
    Task<bool> DeleteAsync(int id);
}

public class EnrollmentService : IEnrollmentService
{
    private readonly AppDbContext _context;

    public EnrollmentService(AppDbContext context) => _context = context;

    public async Task<IEnumerable<EnrollmentReadDto>> GetAllAsync() =>
        await _context.Enrollments.AsNoTracking().Select(e => new EnrollmentReadDto
        {
            Id = e.Id,
            Grade = e.Grade,
            EnrollmentDate = e.EnrollmentDate,
            StudentId = e.StudentId,
            CourseId = e.CourseId,
            StudentName = e.Student.FirstName + " " + e.Student.LastName,
            CourseTitle = e.Course.Title
        }).ToListAsync();

    public async Task<EnrollmentReadDto?> GetByIdAsync(int id) =>
        await _context.Enrollments.AsNoTracking()
            .Where(e => e.Id == id)
            .Select(e => new EnrollmentReadDto
            {
                Id = e.Id,
                Grade = e.Grade,
                EnrollmentDate = e.EnrollmentDate,
                StudentId = e.StudentId,
                CourseId = e.CourseId,
                StudentName = e.Student.FirstName + " " + e.Student.LastName,
                CourseTitle = e.Course.Title
            }).FirstOrDefaultAsync();

    public async Task<EnrollmentReadDto> EnrollAsync(EnrollmentCreateDto dto)
    {
        var enrollment = new Enrollment
        {
            StudentId = dto.StudentId,
            CourseId = dto.CourseId,
            EnrollmentDate = DateTime.UtcNow
        };
        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync();

        // Refresh to get navigation properties
        return await _context.Enrollments.AsNoTracking()
            .Where(e => e.Id == enrollment.Id)
            .Select(e => new EnrollmentReadDto
            {
                Id = e.Id,
                Grade = e.Grade,
                EnrollmentDate = e.EnrollmentDate,
                StudentId = e.StudentId,
                CourseId = e.CourseId,
                StudentName = e.Student.FirstName + " " + e.Student.LastName,
                CourseTitle = e.Course.Title
            }).FirstAsync();
    }

    public async Task<bool> UpdateGradeAsync(int id, double grade)
    {
        var enrollment = await _context.Enrollments.FindAsync(id);
        if (enrollment == null) return false;

        enrollment.Grade = grade;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsEnrolledAsync(int studentId, int courseId) =>
        await _context.Enrollments.AnyAsync(e => e.StudentId == studentId && e.CourseId == courseId);

    public async Task<bool> DeleteAsync(int id)
    {
        var enrollment = await _context.Enrollments.FindAsync(id);
        if (enrollment == null) return false;

        _context.Enrollments.Remove(enrollment);
        await _context.SaveChangesAsync();
        return true;
    }
}
