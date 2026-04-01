using Microsoft.EntityFrameworkCore;
using StudentSystem.API.Models;

namespace StudentSystem.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Student> Students { get; set; } = null!;
    public DbSet<Instructor> Instructors { get; set; } = null!;
    public DbSet<InstructorProfile> InstructorProfiles { get; set; } = null!;
    public DbSet<Course> Courses { get; set; } = null!;
    public DbSet<Enrollment> Enrollments { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // One-to-one: Instructor <-> InstructorProfile
        modelBuilder.Entity<Instructor>()
            .HasOne(i => i.InstructorProfile)
            .WithOne(p => p.Instructor)
            .HasForeignKey<InstructorProfile>(p => p.InstructorId)
            .OnDelete(DeleteBehavior.Cascade);

        // One-to-many: Instructor -> Courses
        modelBuilder.Entity<Instructor>()
            .HasMany(i => i.Courses)
            .WithOne(c => c.Instructor)
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Seed Users
        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Username = "admin", Email = "admin@system.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"), Role = "Admin" },
            new User { Id = 2, Username = "instructor1", Email = "instructor1@system.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Instructor@123"), Role = "Instructor" },
            new User { Id = 3, Username = "student1", Email = "student1@system.com", PasswordHash = BCrypt.Net.BCrypt.HashPassword("Student@123"), Role = "Student" }
        );

        // Seed Instructors
        modelBuilder.Entity<Instructor>().HasData(
            new Instructor { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@uni.edu", Department = "Computer Science" },
            new Instructor { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@uni.edu", Department = "Mathematics" }
        );

        // Seed Profiles
        modelBuilder.Entity<InstructorProfile>().HasData(
            new InstructorProfile { Id = 1, InstructorId = 1, Bio = "Expert in AI and Cloud Computing.", Office = "B-101", YearsOfExperience = 15 },
            new InstructorProfile { Id = 2, InstructorId = 2, Bio = "Researcher in Graph Theory.", Office = "M-202", YearsOfExperience = 10 }
        );

        // Seed Courses
        modelBuilder.Entity<Course>().HasData(
            new Course { Id = 1, InstructorId = 1, Title = "Intro to Web Design", Description = "Learn HTML, CSS, and JS.", Credits = 3 },
            new Course { Id = 2, InstructorId = 1, Title = "Cloud Architecture", Description = "AWS and Azure fundamentals.", Credits = 4 },
            new Course { Id = 3, InstructorId = 2, Title = "Advanced Calculus", Description = "Complex integration and series.", Credits = 4 }
        );

        // Seed Students
        modelBuilder.Entity<Student>().HasData(
            new Student { Id = 1, FirstName = "Alice", LastName = "Johnson", Email = "alice.j@student.edu", DateOfBirth = new DateTime(2002, 5, 15), GPA = 3.8 },
            new Student { Id = 2, FirstName = "Bob", LastName = "Wilson", Email = "bob.w@student.edu", DateOfBirth = new DateTime(2001, 10, 20), GPA = 3.5 }
        );

        // Seed Enrollments
        modelBuilder.Entity<Enrollment>().HasData(
            new Enrollment { Id = 1, StudentId = 1, CourseId = 1, Grade = 4.0, EnrollmentDate = DateTime.UtcNow.AddMonths(-2) },
            new Enrollment { Id = 2, StudentId = 1, CourseId = 2, Grade = 3.7, EnrollmentDate = DateTime.UtcNow.AddMonths(-1) },
            new Enrollment { Id = 3, StudentId = 2, CourseId = 3, Grade = 3.5, EnrollmentDate = DateTime.UtcNow.AddMonths(-2) }
        );
    }
}
