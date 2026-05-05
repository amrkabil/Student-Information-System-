using Microsoft.EntityFrameworkCore;
using StudentSystem.API.Data;
using StudentSystem.API.DTOs;
using StudentSystem.API.Models;

namespace StudentSystem.API.Services;

public interface ICourseService
{
    Task<IEnumerable<CourseReadDto>> GetAllAsync();
    Task<CourseReadDto?> GetByIdAsync(int id);
    Task<CourseReadDto> CreateAsync(CourseCreateDto dto);
    Task<bool> UpdateAsync(int id, CourseUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}

public class CourseService : ICourseService
{
    private readonly AppDbContext _context;

    public CourseService(AppDbContext context) => _context = context;

    public async Task<IEnumerable<CourseReadDto>> GetAllAsync() =>
        await _context.Courses.AsNoTracking()
            .Include(c => c.Instructor).ThenInclude(i => i.User)
            .Select(c => new CourseReadDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Credits = c.Credits,
                CreatedAt = c.CreatedAt,
                InstructorId = c.InstructorId,
                InstructorUsername = c.Instructor.User != null ? c.Instructor.User.Username : c.Instructor.FirstName
            }).ToListAsync();

    public async Task<CourseReadDto?> GetByIdAsync(int id) =>
        await _context.Courses.AsNoTracking()
            .Include(c => c.Instructor).ThenInclude(i => i.User)
            .Where(c => c.Id == id)
            .Select(c => new CourseReadDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Credits = c.Credits,
                CreatedAt = c.CreatedAt,
                InstructorId = c.InstructorId,
                InstructorUsername = c.Instructor.User != null ? c.Instructor.User.Username : c.Instructor.FirstName
            }).FirstOrDefaultAsync();

    public async Task<CourseReadDto> CreateAsync(CourseCreateDto dto)
    {
        var course = new Course
        {
            Title = dto.Title,
            Description = dto.Description,
            Credits = dto.Credits,
            InstructorId = dto.InstructorId
        };
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return await _context.Courses.AsNoTracking()
            .Include(c => c.Instructor).ThenInclude(i => i.User)
            .Where(c => c.Id == course.Id)
            .Select(c => new CourseReadDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Credits = c.Credits,
                InstructorId = c.InstructorId,
                InstructorUsername = c.Instructor.User != null ? c.Instructor.User.Username : c.Instructor.FirstName,
                CreatedAt = c.CreatedAt
            }).FirstAsync();
    }

    public async Task<bool> UpdateAsync(int id, CourseUpdateDto dto)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null) return false;

        course.Title = dto.Title;
        course.Description = dto.Description;
        course.Credits = dto.Credits;
        course.InstructorId = dto.InstructorId;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null) return false;

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();
        return true;
    }
}
