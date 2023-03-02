using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using tier_list_api.Entities;

namespace tier_list_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TierListItemController : ControllerBase
{
    private readonly ILogger<TierListItemController> _logger;
    private readonly TierListDbContext _context;

    public TierListItemController(ILogger<TierListItemController> logger, TierListDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult Get([FromRoute] int id)
    {
        try
        {
            var i = _context.TierListItems
                .FirstOrDefault(i => i.TierListItemId == id);

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
    public IActionResult Post([FromBody] TierListItem i)
    {
        try
        {
            _context.TierListItems.Add(i);
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
            var i = _context.TierListItems.FirstOrDefault(t => t.TierListItemId == id);
            if (i == null)
                return NotFound();
            _context.TierListItems.Remove(i);
            _context.SaveChanges();
            // TODO delete object in s3
            return Ok();
        }
        catch (System.Exception e)
        {
            _logger.LogError("Delete", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPatch("{id}")]
    public IActionResult Patch([FromRoute] int id, [FromBody] JsonPatchDocument<TierListItem> patchDoc)
    {
        var i = _context.TierListItems.Find(id);
        if (i == null)
            return NotFound();
        patchDoc.ApplyTo(i);
        _context.SaveChanges();
        return NoContent();
    }

}
