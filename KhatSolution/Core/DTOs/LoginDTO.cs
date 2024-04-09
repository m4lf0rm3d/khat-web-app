using System.ComponentModel.DataAnnotations;

namespace Core.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Please enter email")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [MinLength(4, ErrorMessage = "Invalid email length")]
        [MaxLength(100, ErrorMessage = "Invalid email length")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter password")]
        [MinLength(8, ErrorMessage = "Invalid password length")]
        [MaxLength(64, ErrorMessage = "Invalid password length")]
        public string Password { get; set; }
    }
}
