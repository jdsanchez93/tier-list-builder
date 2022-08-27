using Microsoft.EntityFrameworkCore;
using tier_list_api.Entities;

namespace tier_list_api
{
    public class TierListDbContext : DbContext
    {
        public DbSet<TierList> TierLists => Set<TierList>();
        public DbSet<TierListRow> TierListRows => Set<TierListRow>();
        public DbSet<PositionalTierListItem> PositionalTierListItems => Set<PositionalTierListItem>();

        public TierListDbContext(DbContextOptions<TierListDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
    }

}