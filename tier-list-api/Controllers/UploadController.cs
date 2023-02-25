using Microsoft.AspNetCore.Mvc;
using tier_list_api.Entities;
using System.Net.Http;

namespace tier_list_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly ILogger<UploadController> _logger;
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public UploadController(ILogger<UploadController> logger, IConfiguration configuration, HttpClient httpClient)
    {
        _logger = logger;
        _configuration = configuration;
        _httpClient = httpClient;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] UploadData d)
    {
        try
        {
            var url = _configuration["Aws:ApiGatewayUrl"];
            var httpResponse = await _httpClient.PostAsJsonAsync(url, d);

            var apiGatewayResponse = await httpResponse.Content.ReadFromJsonAsync<ApiGatewayResponse>();
            return Created("/api/Upload", apiGatewayResponse);
        }
        catch (System.Exception e)
        {
            _logger.LogError(e, "Post");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    public class UploadData
    {
        public int TierListId { get; set; }
        public string? Extension { get; set; }
    }

    public class ApiGatewayResponse
    {
        public string? S3ObjectName { get; set; }
        public string? UploadUrl { get; set; }
    }

}
