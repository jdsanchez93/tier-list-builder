using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tier_list_api.Entities;

[Table("TierListItem")]
public class TierListItem
{
    public int TierListItemId { get; set; }

    public string? Name { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    [NotMapped]
    public string? PresignedUrl { get; set; }

    public int TierListId { get; set; }

    public TierList? TierList { get; set; }
}
