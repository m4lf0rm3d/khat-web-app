using Common.Handlers;
using Common.Utilities;
using Core.DTOs;
using Core.Models;
using DAL.DbContexts;

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
            try
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
            catch(Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while logging in user", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }
        }

        // Handles user registration with the provided details.
        public ResponseHandler SignupUser(SignupDTO signupDTO)
        {
            try
            {
                // Check if a user with the given email already exists.
                User? _user = _khatContext.Users.Where(row => row.Email == signupDTO.Email).FirstOrDefault();

                // If a user is found, return an error response.
                if (_user != null)
                {
                    return new ResponseHandler(400, "Email already exists!", null, null);
                }

                // Generate a password hash using the provided password and email for comparison.
                string passwordHash = DataHashingUtility.GenerateHash(signupDTO.Password, signupDTO.Email);

                // Create a new user with the provided details and a hashed password.
                User user = new()
                {
                    Email = signupDTO.Email,
                    Password = passwordHash,
                    FirstName = signupDTO.FirstName,
                    LastName = signupDTO.LastName,
                    GenderId = signupDTO.GenderId,
                    CreatedOn = DateTime.Now,
                    CreatedBy = 1, // Default Super Admin
                };

                // Add the new user to the database context.
                _khatContext.Users.AddAsync(user);

                // Persist changes to the database.
                _khatContext.SaveChangesAsync();

                // Generate a token for the new user.
                string token = AuthTokenUtility.GenerateToken(user.UserId);

                // Return a success response with the token.
                return new ResponseHandler(200, "Signup Success!", token, null);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while signing up user", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }
            
        }
    }
}
