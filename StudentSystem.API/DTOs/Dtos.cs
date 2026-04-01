using System.ComponentModel.DataAnnotations;

namespace StudentSystem.API.DTOs;

// Student DTOs
public class StudentCreateDto
{
    [Required, MaxLength(100), MinLength(2)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(100), MinLength(2)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Range(0, 4.0)]
    public double GPA { get; set; }
}

public class StudentUpdateDto
{
    [Required, MaxLength(100), MinLength(2)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(100), MinLength(2)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Range(0, 4.0)]
    public double GPA { get; set; }
}

public class StudentReadDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public double GPA { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Instructor DTOs
public class InstructorCreateDto
{
    [Required, MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Department { get; set; } = string.Empty;
}

public class InstructorUpdateDto
{
    [Required, MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Department { get; set; } = string.Empty;
}

public class InstructorReadDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public InstructorProfileReadDto? InstructorProfile { get; set; }
}

// InstructorProfile DTOs
public class InstructorProfileCreateDto
{
    [Required, MaxLength(500)]
    public string Bio { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string Office { get; set; } = string.Empty;

    [Range(0, 50)]
    public int YearsOfExperience { get; set; }
}

public class InstructorProfileReadDto
{
    public int Id { get; set; }
    public string Bio { get; set; } = string.Empty;
    public string Office { get; set; } = string.Empty;
    public int YearsOfExperience { get; set; }
    public int InstructorId { get; set; }
}

// Course DTOs
public class CourseCreateDto
{
    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Range(1, 10)]
    public int Credits { get; set; }

    [Required]
    public int InstructorId { get; set; }
}

public class CourseUpdateDto
{
    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Range(1, 10)]
    public int Credits { get; set; }

    [Required]
    public int InstructorId { get; set; }
}

public class CourseReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Credits { get; set; }
    public DateTime CreatedAt { get; set; }
    public int InstructorId { get; set; }
}

// Enrollment DTOs
public class EnrollmentCreateDto
{
    [Required]
    public int StudentId { get; set; }

    [Required]
    public int CourseId { get; set; }
}

public class EnrollmentGradeUpdateDto
{
    [Range(0, 4.0)]
    public double Grade { get; set; }
}

public class EnrollmentReadDto
{
    public int Id { get; set; }
    public double? Grade { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public int StudentId { get; set; }
    public int CourseId { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public string CourseTitle { get; set; } = string.Empty;
}

// Auth DTOs
public class RegisterDto
{
    [Required, MaxLength(50), MinLength(3)]
    public string Username { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(6)]
    public string Password { get; set; } = string.Empty;

    public string Role { get; set; } = "Student";
}

public class LoginDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDto
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}
