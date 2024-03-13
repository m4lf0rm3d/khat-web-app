using System;
using System.Collections.Generic;

namespace KhatWebServices.Models
{
    public partial class CompanionSetting
    {
        public int CompanionSettingId { get; set; }
        public int CompanionId { get; set; }
        public DateTime KhatExchangeTime { get; set; }
        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual Companion Companion { get; set; } = null!;
        public virtual User CreatedByNavigation { get; set; } = null!;
        public virtual User? UpdatedByNavigation { get; set; }
    }
}
