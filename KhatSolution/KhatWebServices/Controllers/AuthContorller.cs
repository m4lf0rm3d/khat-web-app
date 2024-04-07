using Microsoft.AspNetCore.Mvc;
using Common.Constants;
using Core.DTOs;
using BLL.BusinessObjects;
using Common.Handlers;

namespace KhatWebServices.Controllers
{
    [Route(ControllerRoutes.AUTH_ROOT)]
    public class AuthContorller : ControllerBase
    {

        AuthBO _authBO { get; set; }
        public AuthContorller()
        {
            _authBO = new();
        }

        [HttpPost]
        [Route(ControllerRoutes.AUTH_LOGIN)]
        public IActionResult Login([FromBody]LoginDTO loginDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                //return StatusCode(200, )
                ResponseHandler response = _authBO.LoginUser(loginDTO);
                return StatusCode(response.StatusCode, response);
            }
            catch(Exception ex)
            {
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
            

        }

        [HttpPost]
        [Route(ControllerRoutes.AUTH_SIGNUP)]
        public IActionResult Signup(SignupDTO signupDTO)
        {
            try
            {
                ResponseHandler response = _authBO.SignupUser(signupDTO);
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }
    }
}
