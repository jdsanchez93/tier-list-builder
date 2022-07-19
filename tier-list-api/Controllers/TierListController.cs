using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tier_list_api.Entities;

namespace tier_list_api.Controllers;

[ApiController]
[Route("[controller]")]
public class TierListController : ControllerBase
{
    private readonly ILogger<TierListController> _logger;
    private readonly TierListDbContext _context;

    public TierListController(ILogger<TierListController> logger, TierListDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        try
        {
            var t = _context.TierLists
                .Include(t => t.TierListRows)
                .FirstOrDefault(t => t.TierListId == id);

            if (t == null)
                return NotFound();
            return Ok(t);
        }
        catch (System.Exception e)
        {
            _logger.LogError("Get", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
    public IActionResult Post([FromBody] TierList t)
    {
        try
        {
            _context.TierLists.Add(t);
            _context.SaveChanges();
            return Created("/api/TierList", t);
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
            var t = _context.TierLists.FirstOrDefault(t => t.TierListId == id);
            if (t == null)
                return NotFound();
            _context.TierLists.Remove(t);
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
    public IActionResult Patch([FromRoute] int id, [FromBody] JsonPatchDocument<TierList> patchDoc)
    {
        try
        {
            var t = _context.TierLists.Find(id);
            if (t == null)
                return NotFound();
            patchDoc.ApplyTo(t);
            _context.SaveChanges();
            return NoContent();
        }
        catch (System.Exception e)
        {
            _logger.LogError("Patch", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("GetPositionalTierListItems/{tierListId}")]
    public IActionResult GetPositionalTierListItems([FromRoute] int tierListId)
    {
        try
        {
            var query = from i in _context.PositionalTierListItems
                        join t in _context.TierLists
                            on i.TierListId equals t.TierListId
                        where i.TierListId == tierListId
                        select i;

            return Ok(query.ToList());
        }
        catch (System.Exception e)
        {
            _logger.LogError("GetPositionalTierListItem", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

}
