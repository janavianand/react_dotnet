using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        // constructor
        // need to mention the base class options for migrations - causes probs in migrations if we dont
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values {get;set;}

        //override a method available in dbcontext

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
                .HasData(
                    new Value {Id=1,Name="Value 101"},
                    new Value {Id=2,Name="Value 102"},
                    new Value {Id=3,Name="Value 103"}
                );
        }
    }
}
