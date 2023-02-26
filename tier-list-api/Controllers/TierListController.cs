using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tier_list_api.Entities;

namespace tier_list_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TierListController : ControllerBase
{
    private readonly ILogger<TierListController> _logger;
    private readonly TierListDbContext _context;

    public TierListController(ILogger<TierListController> logger, TierListDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        try
        {
            var t = _context.TierLists.ToList();
            return Ok(t);
        }
        catch (System.Exception e)
        {
            _logger.LogError(e, "GetAll");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
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
            _logger.LogError(e, "Get");
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
            _logger.LogError(e, "Post");
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
            _logger.LogError(e, "Delete");
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
            _logger.LogError(e, "Patch");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("GetTierListItems/{tierListId}")]
    public IActionResult GetTierListItems([FromRoute] int tierListId)
    {
        try
        {
            var query = from i in _context.TierListItems
                        join t in _context.TierLists
                            on i.TierListId equals t.TierListId
                        where i.TierListId == tierListId
                        select i;

            return Ok(query.ToList());
        }
        catch (System.Exception e)
        {
            _logger.LogError(e, "GetTierListItems");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutTierList([FromRoute] int id, [FromBody] TierList updatedTierList)
    {
        try
        {
            var tierList = _context.TierLists
                .Include(t => t.TierListRows)
                .FirstOrDefault(t => t.TierListId == id);
            if (tierList == null)
            {
                return NotFound();
            }

            tierList.Name = updatedTierList.Name;

            IEnumerable<int> previousRowIds = new List<int>();
            if (tierList.TierListRows != null && tierList.TierListRows.Any())
            {
                previousRowIds = tierList.TierListRows
                    .Select(r => r.TierListRowId);
            }

            IEnumerable<int> currentRowIds = new List<int>();
            if (updatedTierList.TierListRows != null && updatedTierList.TierListRows.Any())
            {
                currentRowIds = updatedTierList.TierListRows
                    .Where(r => r.TierListRowId != 0)
                    .Select(r => r.TierListRowId);
            }

            // find existing ids that were removed
            var removedIds = previousRowIds.Except(currentRowIds);
            tierList.TierListRows?
                .Where(r => removedIds.Contains(r.TierListRowId))
                .ToList()
                .ForEach(r => _context.Remove(r));

            // find existing ids that were updated
            var updatedIds = previousRowIds.Intersect(currentRowIds);
            tierList.TierListRows?
                .Where(r => updatedIds.Contains(r.TierListRowId))
                .ToList()
                .ForEach(r => _context.Update(r));

            // add new rows (row id is 0)
            updatedTierList.TierListRows?
                .Where(r => r.TierListRowId == 0)
                .ToList()
                .ForEach(r => _context.TierListRows.Add(r));

            await _context.SaveChangesAsync();

            return Ok(tierList);
        }
        catch (System.Exception e)
        {
            _logger.LogError(e, "PutTierList");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

}
