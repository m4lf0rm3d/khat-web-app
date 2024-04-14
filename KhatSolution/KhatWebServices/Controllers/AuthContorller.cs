using Microsoft.AspNetCore.Mvc;
using Common.Constants;
using Core.DTOs;
using BLL.BusinessObjects;
using Common.Handlers;
using Microsoft.AspNetCore.Authorization;
using log4net;
using Common.Utilities;

namespace KhatWebServices.Controllers
{
    // Controller responsible for handling authentication-related requests.
    [Route(ControllerRoutes.AUTH_ROOT)]
    public class AuthContorller : ControllerBase
    {
        // Business object for handling authentication operations.
        AuthBO _authBO { get; set; }

        // Constructor initializing the authentication business object.
        public AuthContorller()
        {
            _authBO = new();
        }

        // Action method for handling user login requests.
        [HttpPost]
        [Route(ControllerRoutes.AUTH_LOGIN)]
        public IActionResult Login([FromBody] LoginDTO loginDTO)
        {
            try
            {
                // Check if the received model is valid.
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                ResponseHandler response = _authBO.LoginUser(loginDTO);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while logging in user", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

        // Action method for handling user signup requests.
        [HttpPost]
        [Route(ControllerRoutes.AUTH_SIGNUP)]
        public IActionResult Signup([FromBody] SignupDTO signupDTO)
        {
            try
            {
                // Check if the received model is valid.
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Attempt to sign up the user using the provided details.
                ResponseHandler response = _authBO.SignupUser(signupDTO);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while logging in user", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }
    }
}
