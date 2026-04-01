using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSystem.API.DTOs;
using StudentSystem.API.Services;

namespace StudentSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EnrollmentsController : ControllerBase
{
    private readonly IEnrollmentService _service;

    public EnrollmentsController(IEnrollmentService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EnrollmentReadDto>>> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<EnrollmentReadDto>> GetById(int id)
    {
        var enrollment = await _service.GetByIdAsync(id);
        return enrollment == null ? NotFound() : Ok(enrollment);
    }

    [HttpPost]
    public async Task<ActionResult<EnrollmentReadDto>> Enroll(EnrollmentCreateDto dto)
    {
        if (await _service.IsEnrolledAsync(dto.StudentId, dto.CourseId))
            return Conflict("Student is already enrolled in this course.");

        var enrollment = await _service.EnrollAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = enrollment.Id }, enrollment);
    }

    [Authorize(Roles = "Admin,Instructor")]
    [HttpPut("{id}/grade")]
    public async Task<IActionResult> UpdateGrade(int id, EnrollmentGradeUpdateDto dto)
    {
        var updated = await _service.UpdateGradeAsync(id, dto.Grade);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
