using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Budgetary_App_Final_Edition.Models;

namespace Budgetary_App_Final_Edition.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Budgetary_App_Final_Edition.Models.Bills> Bills { get; set; } = default!;
    }
}
