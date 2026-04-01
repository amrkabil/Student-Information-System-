using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using StudentSystem.API.DTOs;
using Xunit;

namespace StudentSystem.Tests;

public class IntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public IntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Get_Courses_ReturnsSuccess()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/courses");

        // Assert
        response.EnsureSuccessStatusCode();
    }

    [Fact]
    public async Task Register_NewUser_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateClient();
        var registerDto = new RegisterDto
        {
            Username = "newuser" + Guid.NewGuid().ToString().Substring(0, 8),
            Password = "Password123!",
            Role = API.Models.UserRole.Student
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/auth/register", registerDto);

        // Assert
        response.EnsureSuccessStatusCode();
    }
}
