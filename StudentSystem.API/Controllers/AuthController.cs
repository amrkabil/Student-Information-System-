using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudentSystem.API.Data;
using StudentSystem.API.DTOs;
using StudentSystem.API.Models;

namespace StudentSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            return Conflict("Username already exists.");
        
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return Conflict("Email already exists.");

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Automatically create Profile based on Role
        if (dto.Role == "Student")
        {
            var student = new Student
            {
                FirstName = dto.Username, // Placeholder
                LastName = "Student",    // Placeholder
                Email = dto.Email,
                DateOfBirth = DateTime.UtcNow.AddYears(-20), // Default DOB
                GPA = 0.0,
                UserId = user.Id
            };
            _context.Students.Add(student);
        }
        else if (dto.Role == "Instructor")
        {
            var instructor = new Instructor
            {
                FirstName = dto.Username, // Placeholder
                LastName = "Instructor", // Placeholder
                Email = dto.Email,
                Department = "General", // Default Dept
                UserId = user.Id
            };
            _context.Instructors.Add(instructor);
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Login), new { username = user.Username }, "User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Wrong username or password");

        var token = GenerateJwtToken(user);

        return Ok(new AuthResponseDto
        {
            Username = user.Username,
            Email = user.Email,
            Role = user.Role,
            Token = token
        });
    }

    private string GenerateJwtToken(User user)
    {
        var jwtKey = _configuration["Jwt:Key"] ?? "StudentSystemSuperSecretKey_2026_WebEngineering!";
        var jwtIssuer = _configuration["Jwt:Issuer"] ?? "StudentSystemAPI";
        var jwtAudience = _configuration["Jwt:Audience"] ?? "StudentSystemClient";

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
