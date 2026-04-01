using Microsoft.EntityFrameworkCore;
using StudentSystem.API.Data;
using StudentSystem.API.DTOs;
using StudentSystem.API.Models;

namespace StudentSystem.API.Services;

public interface IInstructorService
{
    Task<IEnumerable<InstructorReadDto>> GetAllAsync();
    Task<InstructorReadDto?> GetByIdAsync(int id);
    Task<InstructorReadDto> CreateAsync(InstructorCreateDto dto);
    Task<bool> UpdateAsync(int id, InstructorUpdateDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> AddProfileAsync(int id, InstructorProfileCreateDto dto);
}

public class InstructorService : IInstructorService
{
    private readonly AppDbContext _context;

    public InstructorService(AppDbContext context) => _context = context;

    public async Task<IEnumerable<InstructorReadDto>> GetAllAsync() =>
        await _context.Instructors.AsNoTracking().Select(i => new InstructorReadDto
        {
            Id = i.Id,
            FirstName = i.FirstName,
            LastName = i.LastName,
            Email = i.Email,
            Department = i.Department,
            CreatedAt = i.CreatedAt,
            InstructorProfile = i.InstructorProfile == null ? null : new InstructorProfileReadDto
            {
                Id = i.InstructorProfile.Id,
                Bio = i.InstructorProfile.Bio,
                Office = i.InstructorProfile.Office,
                YearsOfExperience = i.InstructorProfile.YearsOfExperience,
                InstructorId = i.InstructorProfile.InstructorId
            }
        }).ToListAsync();

    public async Task<InstructorReadDto?> GetByIdAsync(int id) =>
        await _context.Instructors.AsNoTracking()
            .Where(i => i.Id == id)
            .Select(i => new InstructorReadDto
            {
                Id = i.Id,
                FirstName = i.FirstName,
                LastName = i.LastName,
                Email = i.Email,
                Department = i.Department,
                CreatedAt = i.CreatedAt,
                InstructorProfile = i.InstructorProfile == null ? null : new InstructorProfileReadDto
                {
                    Id = i.InstructorProfile.Id,
                    Bio = i.InstructorProfile.Bio,
                    Office = i.InstructorProfile.Office,
                    YearsOfExperience = i.InstructorProfile.YearsOfExperience,
                    InstructorId = i.InstructorProfile.InstructorId
                }
            }).FirstOrDefaultAsync();

    public async Task<InstructorReadDto> CreateAsync(InstructorCreateDto dto)
    {
        var instructor = new Instructor
        {
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            Department = dto.Department
        };
        _context.Instructors.Add(instructor);
        await _context.SaveChangesAsync();
        return new InstructorReadDto
        {
            Id = instructor.Id,
            FirstName = instructor.FirstName,
            LastName = instructor.LastName,
            Email = instructor.Email,
            Department = instructor.Department,
            CreatedAt = instructor.CreatedAt
        };
    }

    public async Task<bool> UpdateAsync(int id, InstructorUpdateDto dto)
    {
        var instructor = await _context.Instructors.FindAsync(id);
        if (instructor == null) return false;

        instructor.FirstName = dto.FirstName;
        instructor.LastName = dto.LastName;
        instructor.Email = dto.Email;
        instructor.Department = dto.Department;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var instructor = await _context.Instructors.FindAsync(id);
        if (instructor == null) return false;

        _context.Instructors.Remove(instructor);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AddProfileAsync(int id, InstructorProfileCreateDto dto)
    {
        var instructor = await _context.Instructors.Include(i => i.InstructorProfile).FirstOrDefaultAsync(i => i.Id == id);
        if (instructor == null || instructor.InstructorProfile != null) return false;

        instructor.InstructorProfile = new InstructorProfile
        {
            InstructorId = id,
            Bio = dto.Bio,
            Office = dto.Office,
            YearsOfExperience = dto.YearsOfExperience
        };

        await _context.SaveChangesAsync();
        return true;
    }
}
