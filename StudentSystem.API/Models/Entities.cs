using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentSystem.API.Models;

public class Instructor
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Department { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public InstructorProfile? InstructorProfile { get; set; }
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}

public class InstructorProfile
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(500)]
    public string Bio { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string Office { get; set; } = string.Empty;

    [Range(0, 50)]
    public int YearsOfExperience { get; set; }

    [ForeignKey("Instructor")]
    public int InstructorId { get; set; }
    public Instructor Instructor { get; set; } = null!;
}

public class Course
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Range(1, 10)]
    public int Credits { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("Instructor")]
    public int InstructorId { get; set; }
    public Instructor Instructor { get; set; } = null!;

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}

public class Enrollment
{
    [Key]
    public int Id { get; set; }

    [Range(0, 4.0)]
    public double? Grade { get; set; }

    public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

    [ForeignKey("Student")]
    public int StudentId { get; set; }
    public Student Student { get; set; } = null!;

    [ForeignKey("Course")]
    public int CourseId { get; set; }
    public Course Course { get; set; } = null!;
}

public class User
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(50), MinLength(3)]
    public string Username { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = "Student";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
