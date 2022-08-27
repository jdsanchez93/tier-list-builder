using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tier_list_api.Entities;

[Table("TierList")]
public class TierList
{
    [Key]
    public int TierListId { get; set; }

    [MaxLength(100)]
    public string? Name { get; set; }

    public List<TierListRow>? TierListRows { get; set; }
}
