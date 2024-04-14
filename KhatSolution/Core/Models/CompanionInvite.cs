using System;
using System.Collections.Generic;

namespace Core.Models
{
    public partial class CompanionInvite
    {
        public int InviteId { get; set; }
        public Guid InviteLink { get; set; }
        public int SenderId { get; set; }
        public string ReceiverEmail { get; set; } = null!;
        public DateTime? UpdateOn { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public bool IsAccepted { get; set; }
        public bool? IsActive { get; set; }

        public virtual User CreatedByNavigation { get; set; } = null!;
        public virtual User Sender { get; set; } = null!;
        public virtual User? UpdatedByNavigation { get; set; }
    }
}
