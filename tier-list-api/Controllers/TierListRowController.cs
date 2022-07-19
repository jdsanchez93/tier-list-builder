using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using tier_list_api.Entities;

namespace tier_list_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TierListRowController : ControllerBase
{
    private readonly ILogger<TierListRowController> _logger;
    private readonly TierListDbContext _context;

    public TierListRowController(ILogger<TierListRowController> logger, TierListDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult GetbyId([FromRoute] int id)
    {
        try
        {
            var r = _context.TierListRows
                .FirstOrDefault(r => r.TierListRowId == id);

            if (r == null)
                return NotFound();
            return Ok(r);
        }
        catch (System.Exception e)
        {
            _logger.LogError("GetbyId", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    public IActionResult Post([FromBody] TierListRow r)
    {
        try
        {
            _context.TierListRows.Add(r);
            _context.SaveChanges();
            return Created("/api/TierListRow", r);
        }
        catch (System.Exception e)
        {
            _logger.LogError("Post", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete([FromRoute] int id)
    {
        try
        {
            var r = _context.TierListRows.FirstOrDefault(r => r.TierListRowId == id);
            if (r == null)
                return NotFound();
            _context.TierListRows.Remove(r);
            _context.SaveChanges();
            return Ok();
        }
        catch (System.Exception e)
        {
            _logger.LogError("Delete", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPatch("{id}")]
    public IActionResult Patch([FromRoute] int id, [FromBody] JsonPatchDocument<TierListRow> patchDoc)
    {
        var r = _context.TierListRows.Find(id);
        if (r == null)
            return NotFound();
        patchDoc.ApplyTo(r);
        _context.SaveChanges();
        return NoContent();
    }
}
