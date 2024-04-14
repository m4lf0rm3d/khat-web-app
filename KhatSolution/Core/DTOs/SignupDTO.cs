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
        [MinLength(4, ErrorMessage = "Invalid email length")]
        [MaxLength(100, ErrorMessage = "Invalid email length")]
        [RegularExpression(@"^(?:(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:""(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*""))@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$", ErrorMessage = "Invalid email address")]

        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter password")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!""#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,64}$", ErrorMessage = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter first name")]
        [MinLength(1, ErrorMessage = "Invalid first name length")]
        [MaxLength(25, ErrorMessage = "Invalid first name length")]
        [RegularExpression(@"^[A-Za-z ]+$", ErrorMessage = "First Name can only contain alphabets and spaces")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Please enter last name")]
        [MinLength(1, ErrorMessage = "Invalid last name length")]
        [MaxLength(25, ErrorMessage = "Invalid last name length")]
        [RegularExpression(@"^[A-Za-z ]+$", ErrorMessage = "Last Name can only contain alphabets and spaces")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Please enter gender id")]
        [Range(1,3, ErrorMessage = "Invalid gender id")]
        public int GenderId { get; set; }
    }
}
