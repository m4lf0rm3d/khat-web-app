using System;
using System.Collections.Generic;

namespace Core.Models
{
    public partial class User
    {
        public User()
        {
            CompanionCompanionAs = new HashSet<Companion>();
            CompanionCompanionBs = new HashSet<Companion>();
            CompanionCreatedByNavigations = new HashSet<Companion>();
            CompanionInviteCreatedByNavigations = new HashSet<CompanionInvite>();
            CompanionInviteSenders = new HashSet<CompanionInvite>();
            CompanionInviteUpdatedByNavigations = new HashSet<CompanionInvite>();
            CompanionSettingCreatedByNavigations = new HashSet<CompanionSetting>();
            CompanionSettingUpdatedByNavigations = new HashSet<CompanionSetting>();
            CompanionUpdatedByNavigations = new HashSet<Companion>();
            GenderCreatedByNavigations = new HashSet<Gender>();
            GenderUpdatedByNavigations = new HashSet<Gender>();
            InverseCreatedByNavigation = new HashSet<User>();
            InverseUpdatedByNavigation = new HashSet<User>();
            KhatContentCreatedByNavigations = new HashSet<KhatContent>();
            KhatContentUpdatedByNavigations = new HashSet<KhatContent>();
            KhatCreatedByNavigations = new HashSet<Khat>();
            KhatReceivers = new HashSet<Khat>();
            KhatSenders = new HashSet<Khat>();
            KhatUpdatedByNavigations = new HashSet<Khat>();
        }

        public int UserId { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string? LastName { get; set; }
        public int GenderId { get; set; }
        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool IsBlocked { get; set; }
        public bool? IsActive { get; set; }

        public virtual User CreatedByNavigation { get; set; } = null!;
        public virtual Gender Gender { get; set; } = null!;
        public virtual User? UpdatedByNavigation { get; set; }
        public virtual ICollection<Companion> CompanionCompanionAs { get; set; }
        public virtual ICollection<Companion> CompanionCompanionBs { get; set; }
        public virtual ICollection<Companion> CompanionCreatedByNavigations { get; set; }
        public virtual ICollection<CompanionInvite> CompanionInviteCreatedByNavigations { get; set; }
        public virtual ICollection<CompanionInvite> CompanionInviteSenders { get; set; }
        public virtual ICollection<CompanionInvite> CompanionInviteUpdatedByNavigations { get; set; }
        public virtual ICollection<CompanionSetting> CompanionSettingCreatedByNavigations { get; set; }
        public virtual ICollection<CompanionSetting> CompanionSettingUpdatedByNavigations { get; set; }
        public virtual ICollection<Companion> CompanionUpdatedByNavigations { get; set; }
        public virtual ICollection<Gender> GenderCreatedByNavigations { get; set; }
        public virtual ICollection<Gender> GenderUpdatedByNavigations { get; set; }
        public virtual ICollection<User> InverseCreatedByNavigation { get; set; }
        public virtual ICollection<User> InverseUpdatedByNavigation { get; set; }
        public virtual ICollection<KhatContent> KhatContentCreatedByNavigations { get; set; }
        public virtual ICollection<KhatContent> KhatContentUpdatedByNavigations { get; set; }
        public virtual ICollection<Khat> KhatCreatedByNavigations { get; set; }
        public virtual ICollection<Khat> KhatReceivers { get; set; }
        public virtual ICollection<Khat> KhatSenders { get; set; }
        public virtual ICollection<Khat> KhatUpdatedByNavigations { get; set; }
    }
}
