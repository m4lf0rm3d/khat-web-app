using System;
using System.Collections.Generic;

namespace Core.Models
{
    public partial class KhatContent
    {
        public int KhatContentId { get; set; }
        public int KhatId { get; set; }
        public string KhatSectionText { get; set; } = null!;
        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual User CreatedByNavigation { get; set; } = null!;
        public virtual Khat Khat { get; set; } = null!;
        public virtual User? UpdatedByNavigation { get; set; }
    }
}
