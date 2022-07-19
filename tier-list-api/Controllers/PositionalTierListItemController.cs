using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using tier_list_api.Entities;

namespace tier_list_api.Controllers;

[ApiController]
[Route("[controller]")]
public class PositionalTierListItemController : ControllerBase
{
    private readonly ILogger<PositionalTierListItemController> _logger;
    private readonly TierListDbContext _context;

    public PositionalTierListItemController(ILogger<PositionalTierListItemController> logger, TierListDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult Get([FromRoute] int id)
    {
        try
        {
            var i = _context.PositionalTierListItems
                .FirstOrDefault(i => i.PositionalTierListItemId == id);

            if (i == null)
                return NotFound();
            return Ok(i);
        }
        catch (System.Exception e)
        {
            _logger.LogError("Get", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    public IActionResult Post([FromBody] PositionalTierListItem i)
    {
        try
        {
            _context.PositionalTierListItems.Add(i);
            _context.SaveChanges();
            return Created("/api/PositionalTierListItem", i);
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
            var i = _context.PositionalTierListItems.FirstOrDefault(t => t.PositionalTierListItemId == id);
            if (i == null)
                return NotFound();
            _context.PositionalTierListItems.Remove(i);
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
    public IActionResult Patch([FromRoute] int id, [FromBody] JsonPatchDocument<PositionalTierListItem> patchDoc)
    {
        var i = _context.PositionalTierListItems.Find(id);
        if (i == null)
            return NotFound();
        patchDoc.ApplyTo(i);
        _context.SaveChanges();
        return NoContent();
    }

}
