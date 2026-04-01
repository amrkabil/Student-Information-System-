using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentSystem.API.DTOs;
using StudentSystem.API.Services;

namespace StudentSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class InstructorsController : ControllerBase
{
    private readonly IInstructorService _service;

    public InstructorsController(IInstructorService service) => _service = service;

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<InstructorReadDto>>> GetAll() =>
        Ok(await _service.GetAllAsync());

    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<ActionResult<InstructorReadDto>> GetById(int id)
    {
        var instructor = await _service.GetByIdAsync(id);
        return instructor == null ? NotFound() : Ok(instructor);
    }

    [HttpPost]
    public async Task<ActionResult<InstructorReadDto>> Create(InstructorCreateDto dto)
    {
        var instructor = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = instructor.Id }, instructor);
    }

    [HttpPost("{id}/profile")]
    public async Task<IActionResult> AddProfile(int id, InstructorProfileCreateDto dto)
    {
        var added = await _service.AddProfileAsync(id, dto);
        return added ? Ok("Profile added successfully.") : BadRequest("Could not add profile (instructor not found or profile already exists).");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, InstructorUpdateDto dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
