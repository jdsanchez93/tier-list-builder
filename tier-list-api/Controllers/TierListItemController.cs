using Amazon.S3;
using Amazon.S3.Model;
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
    private readonly IConfiguration _configuration;
    private readonly IAmazonS3 _s3Client;

    public TierListItemController(ILogger<TierListItemController> logger, TierListDbContext context, IConfiguration configuration, IAmazonS3 s3Client)
    {
        _logger = logger;
        _context = context;
        _configuration = configuration;
        _s3Client = s3Client;
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
            _logger.LogError(e, "Get");
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
            _logger.LogError(e, "Post");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            var i = _context.TierListItems.FirstOrDefault(t => t.TierListItemId == id);
            if (i == null)
                return NotFound();

            if (i.ImageUrl != null)
            {
                var bucketName = _configuration["Aws:BucketName"];
                await DeleteObjectNonVersionedBucketAsync(bucketName, i.ImageUrl);
            }

            _context.TierListItems.Remove(i);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (AmazonS3Exception e)
        {
            _logger.LogError(e, "Delete S3 error");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
        catch (System.Exception e)
        {
            _logger.LogError(e, "Delete");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    private async Task DeleteObjectNonVersionedBucketAsync(string bucketName, string keyName)
    {
        var deleteObjectRequest = new DeleteObjectRequest
        {
            BucketName = bucketName,
            Key = keyName
        };
        await _s3Client.DeleteObjectAsync(deleteObjectRequest);
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
