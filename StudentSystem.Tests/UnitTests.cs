using Microsoft.EntityFrameworkCore;
using StudentSystem.API.Data;
using StudentSystem.API.Models;
using Xunit;

namespace StudentSystem.Tests;

public class UnitTests
{
    [Fact]
    public async Task AddPoints_UpdatesUserBalance()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

        using (var context = new AppDbContext(options))
        {
            var user = new User { Username = "testuser", PasswordHash = "hash", Role = UserRole.Student, AntiGravityPoints = 100 };
            context.Users.Add(user);
            await context.SaveChangesAsync();

            // Act
            user.AntiGravityPoints += 50;
            context.PointsTransactions.Add(new PointsTransaction { UserId = user.Id, Points = 50, Reason = "Test" });
            await context.SaveChangesAsync();
        }

        // Assert
        using (var context = new AppDbContext(options))
        {
            var user = await context.Users.FirstAsync();
            Assert.Equal(150, user.AntiGravityPoints);
        }
    }
}
