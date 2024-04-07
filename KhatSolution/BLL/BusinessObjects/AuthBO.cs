using Common.Handlers;
using Core.DTOs;
using Core.Models;
using DAL.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BusinessObjects
{
    public class AuthBO
    {
        KhatContext _khatContext { get; set; }
        public AuthBO()
        {
            _khatContext = new KhatContext();
        }

        public ResponseHandler LoginUser(LoginDTO loginDTO)
        {
            User? user = _khatContext.Users.Where(row => row.Email == loginDTO.Email && row.Password == loginDTO.Password).FirstOrDefault();

            if(user == null)
            {
                return new ResponseHandler(400, "Email or Password does not match!", null, null);
            }

            return new ResponseHandler(200, "Login Success!", null, null);
        }
        
        public ResponseHandler SignupUser(SignupDTO signupDTO)
        {
            User user = new()
            {
                Email = signupDTO.Email,
                Password = signupDTO.Password,
                FirstName = signupDTO.FirstName,
                LastName = signupDTO.LastName,
                GenderId = signupDTO.GenderId,
                CreatedOn = DateTime.Now,
                CreatedBy = 0,
            };

            _khatContext.Users.AddAsync(user);

            // Now fetch the ID of the newly inserted user
            int userId = user.UserId;

            // Update CreatedBy property with the fetched ID
            user.CreatedBy = userId;

            // Save changes to reflect the updated CreatedBy property
            _khatContext.SaveChangesAsync();

            return new ResponseHandler(200, "Signup Success!", null, null);
        }
    }
}
