using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class GetKhatByCompanionId
    {
        public int CompanionId { get; set; }
        public DateTime KhatDate { get; set; }
    }
}
