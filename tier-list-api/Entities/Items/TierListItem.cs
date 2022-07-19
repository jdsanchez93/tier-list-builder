using System.ComponentModel.DataAnnotations;

namespace tier_list_api.Entities;

public class TierListItem
{
    public int TierListItemId { get; set; }

    public int Index { get; set; }

    public string? Text { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public int TierListRowId { get; set; }
}
