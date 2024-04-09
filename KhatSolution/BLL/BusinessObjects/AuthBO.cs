using Common.Handlers;
using Common.Utilities;
using Core.DTOs;
using Core.Models;
using DAL.DbContexts;
using log4net.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BusinessObjects
{
    // The AuthBO class is responsible for authentication-related business operations.
    public class AuthBO
    {
        // DbContext instance for database operations.
        KhatContext _khatContext { get; set; }

        // Constructor initializing the DbContext.
        public AuthBO()
        {
            _khatContext = new KhatContext();
        }

        // Attempts to log in a user with the provided credentials.
        public ResponseHandler LoginUser(LoginDTO loginDTO)
        {
            // Generate a password hash using the provided password and email for comparison.
            string passwordHash = DataHashingUtility.GenerateHash(loginDTO.Password, loginDTO.Email);

            // Attempt to find a user with the matching email and password hash.
            User? user = _khatContext.Users.Where(row =>
                row.Email == loginDTO.Email &&
                row.Password == passwordHash
            ).FirstOrDefault();

            // If no user is found, return an error response.
            if (user == null)
            {
                return new ResponseHandler(401, "Email or Password does not match!", null, null);
            }

            // Generate a token for the authenticated user.
            string token = AuthTokenUtility.GenerateToken(user.UserId);

            // Return a success response with the token.
            return new ResponseHandler(200, "Login Success!", token, null);
        }

        // Handles user registration with the provided details.
        public ResponseHandler SignupUser(SignupDTO signupDTO)
        {
            // Check if a user with the given email already exists.
            User? _user = _khatContext.Users.Where(row => row.Email == signupDTO.Email).FirstOrDefault();

            // If a user is found, return an error response.
            if (_user != null)
            {
                return new ResponseHandler(400, "Email already exists!", null, null);
            }

            // Create a new user with the provided details and a hashed password.
            User user = new()
            {
                Email = signupDTO.Email,
                Password = DataHashingUtility.GenerateHash(signupDTO.Password, signupDTO.Email),
                FirstName = signupDTO.FirstName,
                LastName = signupDTO.LastName,
                GenderId = signupDTO.GenderId,
                CreatedOn = DateTime.Now,
                CreatedBy = 1, // Placeholder value for CreatedBy
            };

            // Add the new user to the database context.
            _khatContext.Users.Add(user);

            // Persist changes to the database.
            _khatContext.SaveChanges();

            // Generate a token for the new user.
            string token = AuthTokenUtility.GenerateToken(user.UserId);

            // Return a success response with the token.
            return new ResponseHandler(200, "Signup Success!", token, null);
        }
    }
}
