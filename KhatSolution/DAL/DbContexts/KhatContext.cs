using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Core.Models;
using Microsoft.Extensions.Configuration;

namespace DAL.DbContexts
{
    public partial class KhatContext : DbContext
    {
        IConfiguration configuration { get; set; }
        public KhatContext()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        }

        public KhatContext(DbContextOptions<KhatContext> options)
            : base(options)
        {

        }

        public virtual DbSet<Companion> Companions { get; set; } = null!;
        public virtual DbSet<CompanionInvite> CompanionInvites { get; set; } = null!;
        public virtual DbSet<CompanionSetting> CompanionSettings { get; set; } = null!;
        public virtual DbSet<Gender> Genders { get; set; } = null!;
        public virtual DbSet<Khat> Khats { get; set; } = null!;
        public virtual DbSet<KhatContent> KhatContents { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Companion>(entity =>
            {
                entity.ToTable("Companion");

                entity.HasIndex(e => e.CompanionId, "UQ__Companio__8B53BEEAD4CC2DFD")
                    .IsUnique();

                entity.Property(e => e.CompanionAid).HasColumnName("CompanionAId");

                entity.Property(e => e.CompanionBid).HasColumnName("CompanionBId");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.CompanionA)
                    .WithMany(p => p.CompanionCompanionAs)
                    .HasForeignKey(d => d.CompanionAid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk1_Companion_User_CompanionAId");

                entity.HasOne(d => d.CompanionB)
                    .WithMany(p => p.CompanionCompanionBs)
                    .HasForeignKey(d => d.CompanionBid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk2_Companion_User_CompanionBId");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.CompanionCreatedByNavigations)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk4_Companion_User_CreatedBy");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.CompanionUpdatedByNavigations)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk3_Companion_User_UpdatedBy");
            });

            modelBuilder.Entity<CompanionInvite>(entity =>
            {
                entity.HasKey(e => e.InviteId)
                    .HasName("PK__Companio__AFACE86D6BC7E71A");

                entity.HasIndex(e => e.InviteId, "UQ__Companio__AFACE86C67A9A353")
                    .IsUnique();

                entity.HasIndex(e => e.InviteLink, "UQ__Companio__D85C1C827C99CB2F")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ReceiverEmail).HasMaxLength(100);

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.CompanionInviteCreatedByNavigations)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk3_CompanionInvites_User_CreatedBy");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.CompanionInviteSenders)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk1_CompanionInvites_User_SenderId");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.CompanionInviteUpdatedByNavigations)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk2_CompanionInvites_User_UpdatedBy");
            });

            modelBuilder.Entity<CompanionSetting>(entity =>
            {
                entity.ToTable("CompanionSetting");

                entity.HasIndex(e => e.CompanionSettingId, "UQ__Companio__20AC1276412BC5DC")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.KhatExchangeTime)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.Companion)
                    .WithMany(p => p.CompanionSettings)
                    .HasForeignKey(d => d.CompanionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk1_CompanionSetting_Companion_CompanionId");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.CompanionSettingCreatedByNavigations)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk3_CompanionSetting_User_CreatedBy");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.CompanionSettingUpdatedByNavigations)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk2_CompanionSetting_User_UpdatedBy");
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.ToTable("Gender");

                entity.HasIndex(e => e.GenderId, "UQ__Gender__4E24E9F62D9DD5E3")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.GenderCreatedByNavigations)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("fk2_Gender_User_CreatedBy");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.GenderUpdatedByNavigations)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk1_Gender_User_UpdatedBy");
            });

            modelBuilder.Entity<Khat>(entity =>
            {
                entity.ToTable("Khat");

                entity.HasIndex(e => e.KhatId, "UQ__Khat__C2C958BE0149C157")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.Companion)
                    .WithMany(p => p.Khats)
                    .HasForeignKey(d => d.CompanionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk1_Khat_Companion_CompanionId");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.KhatCreatedByNavigations)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk5_Khat_User_CreatedBy");

                entity.HasOne(d => d.Receiver)
                    .WithMany(p => p.KhatReceivers)
                    .HasForeignKey(d => d.ReceiverId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk3_Khat_User_ReceiverId");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.KhatSenders)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk2_Khat_User_SenderId");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.KhatUpdatedByNavigations)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk4_Khat_User_UpdatedBy");
            });

            modelBuilder.Entity<KhatContent>(entity =>
            {
                entity.ToTable("KhatContent");

                entity.HasIndex(e => e.KhatContentId, "UQ__KhatCont__C5D260E9896979E5")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.KhatSectionText).HasMaxLength(4000);

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.KhatContentCreatedByNavigations)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk3_KhatContent_User_CreatedBy");

                entity.HasOne(d => d.Khat)
                    .WithMany(p => p.KhatContents)
                    .HasForeignKey(d => d.KhatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk1_KhatContent_Khat_KhatId");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.KhatContentUpdatedByNavigations)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk2_KhatContent_User_UpdatedBy");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.UserId, "UQ__User__1788CC4D858ADBD2")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "UQ__User__A9D10534095E3CFC")
                    .IsUnique();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(25);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.LastName).HasMaxLength(25);

                entity.Property(e => e.Password)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateOn).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.InverseCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk3_User_CreatedBy");

                entity.HasOne(d => d.Gender)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.GenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk1_User_Gender_GenderId");

                entity.HasOne(d => d.UpdatedByNavigation)
                    .WithMany(p => p.InverseUpdatedByNavigation)
                    .HasForeignKey(d => d.UpdatedBy)
                    .HasConstraintName("fk2_User_UpdatedBy");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
