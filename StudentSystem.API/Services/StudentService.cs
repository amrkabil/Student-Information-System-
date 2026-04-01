using Microsoft.EntityFrameworkCore;
using StudentSystem.API.Data;
using StudentSystem.API.DTOs;
using StudentSystem.API.Models;

namespace StudentSystem.API.Services;

public interface IStudentService
{
    Task<IEnumerable<StudentReadDto>> GetAllAsync();
    Task<StudentReadDto?> GetByIdAsync(int id);
    Task<StudentReadDto> CreateAsync(StudentCreateDto dto);
    Task<bool> UpdateAsync(int id, StudentUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}

public class StudentService : IStudentService
{
    private readonly AppDbContext _context;

    public StudentService(AppDbContext context) => _context = context;

    public async Task<IEnumerable<StudentReadDto>> GetAllAsync() =>
        await _context.Students.AsNoTracking().Select(s => new StudentReadDto
        {
            Id = s.Id,
            FirstName = s.FirstName,
            LastName = s.LastName,
            Email = s.Email,
            DateOfBirth = s.DateOfBirth,
            GPA = s.GPA,
            CreatedAt = s.CreatedAt
        }).ToListAsync();

    public async Task<StudentReadDto?> GetByIdAsync(int id) =>
        await _context.Students.AsNoTracking()
            .Where(s => s.Id == id)
            .Select(s => new StudentReadDto
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                DateOfBirth = s.DateOfBirth,
                GPA = s.GPA,
                CreatedAt = s.CreatedAt
            }).FirstOrDefaultAsync();

    public async Task<StudentReadDto> CreateAsync(StudentCreateDto dto)
    {
        var student = new Student
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            DateOfBirth = dto.DateOfBirth,
            GPA = dto.GPA
        };
        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return new StudentReadDto
        {
            Id = student.Id,
            FirstName = student.FirstName,
            LastName = student.LastName,
            Email = student.Email,
            GPA = student.GPA,
            DateOfBirth = student.DateOfBirth,
            CreatedAt = student.CreatedAt
        };
    }

    public async Task<bool> UpdateAsync(int id, StudentUpdateDto dto)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null) return false;

        student.FirstName = dto.FirstName;
        student.LastName = dto.LastName;
        student.Email = dto.Email;
        student.GPA = dto.GPA;
        student.DateOfBirth = dto.DateOfBirth;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null) return false;

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
        return true;
    }
}
