using System;
using System.Collections.Generic;

namespace Core.Models
{
    public partial class Companion
    {
        public Companion()
        {
            CompanionSettings = new HashSet<CompanionSetting>();
            Khats = new HashSet<Khat>();
        }

        public int CompanionId { get; set; }
        public int CompanionAid { get; set; }
        public int CompanionBid { get; set; }
        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual User CompanionA { get; set; } = null!;
        public virtual User CompanionB { get; set; } = null!;
        public virtual User CreatedByNavigation { get; set; } = null!;
        public virtual User? UpdatedByNavigation { get; set; }
        public virtual ICollection<CompanionSetting> CompanionSettings { get; set; }
        public virtual ICollection<Khat> Khats { get; set; }
    }
}
