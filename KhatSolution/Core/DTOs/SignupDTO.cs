using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class SignupDTO
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

        [Required(ErrorMessage = "Please enter first name")]
        [MinLength(1, ErrorMessage = "Invalid first name length")]
        [MaxLength(25, ErrorMessage = "Invalid first name length")]
        [RegularExpression("^[A-Za-z\\s]+$", ErrorMessage = "First Name can only contain alphabets and spaces")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Please enter last name")]
        [MinLength(1, ErrorMessage = "Invalid last name length")]
        [MaxLength(25, ErrorMessage = "Invalid last name length")]
        [RegularExpression("^[A-Za-z\\s]+$", ErrorMessage = "Last Name can only contain alphabets and spaces")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Please enter gender id")]
        [Range(1,3, ErrorMessage = "Invalid gender id")]
        public int GenderId { get; set; }
    }
}
