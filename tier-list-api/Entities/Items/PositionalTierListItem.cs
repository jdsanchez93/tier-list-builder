using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tier_list_api.Entities;

[Table("PositionalTierListItem")]
public class PositionalTierListItem
{
    [Key]
    public int PositionalTierListItemId { get; set; }

    public int PositionX { get; set; }

    public int PositionY { get; set; }

    public string? Label { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public int TierListId { get; set; }
    
    public TierList? TierList { get; set; }
}
