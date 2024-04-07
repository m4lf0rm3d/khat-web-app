using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Please enter email")]
        [MinLength(4, ErrorMessage = "Invalid email length")]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
