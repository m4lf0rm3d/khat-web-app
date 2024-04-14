using System;
using System.Collections.Generic;

namespace Core.Models
{
    public partial class Khat
    {
        public Khat()
        {
            KhatContents = new HashSet<KhatContent>();
        }

        public int KhatId { get; set; }
        public int CompanionId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool? IsActive { get; set; }

        public virtual Companion Companion { get; set; } = null!;
        public virtual User CreatedByNavigation { get; set; } = null!;
        public virtual User Receiver { get; set; } = null!;
        public virtual User Sender { get; set; } = null!;
        public virtual User? UpdatedByNavigation { get; set; }
        public virtual ICollection<KhatContent> KhatContents { get; set; }
    }
}
