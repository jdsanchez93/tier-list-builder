using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tier_list_api.Entities;

[Table("TierListRow")]
public class TierListRow
{
    public int TierListRowId { get; set; }

    [MaxLength(100)]
    public string? Name { get; set; }

    public int Index { get; set; }

    public int? TierListId { get; set; }

}
