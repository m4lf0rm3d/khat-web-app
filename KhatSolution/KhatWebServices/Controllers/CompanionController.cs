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
    [Route(ControllerRoutes.COMPANION_ROOT)]
    public class CompanionContorller : ControllerBase
    {
        // Business object for handling authentication operations.
        CompanionBO _companionhBO { get; set; }

        // Constructor initializing the authentication business object.
        public CompanionContorller()
        {
            _companionhBO = new();
        }

        // Action method for handling send companion requests
        [Authorize]
        [HttpPost]
        [Route(ControllerRoutes.SEND_COMPANION_INVITE)]
        public async Task<IActionResult> SendCompanionInviteAsync([FromBody] SendCompanionInviteDTO sendCompanionInviteDTO)
        {
            try
            {
                // Check if the received model is valid.
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get the user id from the jwt token
                int userId = AuthTokenUtility.ValidateToken(Request.Headers["Authorization"]);

                ResponseHandler response = await _companionhBO.SendCompanionInviteAsync(sendCompanionInviteDTO.InvitationReceiverEmail, userId);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while sending companion invite", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

        // Action method for handling accept companion requests
        [Authorize]
        [HttpPost]
        [Route(ControllerRoutes.ACCEPT_COMPANION_INVITE)]
        public async Task<IActionResult> AcceptCompanionInviteAsync([FromBody] AcceptCompanionInviteDTO sendCompanionInviteDTO)
        {
            try
            {
                // Check if the received model is valid.
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get the user id from the jwt token
                int userId = AuthTokenUtility.ValidateToken(Request.Headers["Authorization"]);

                ResponseHandler response = await _companionhBO.AcceptCompanionInviteAsync(sendCompanionInviteDTO.InviteLink);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while accpeting companion invite", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

        // Action method for handling accept companion requests
        [Authorize]
        [HttpGet]
        [Route(ControllerRoutes.GET_COMPANIONS_LIST)]
        public async Task<IActionResult> GetCompanionsListAsync()
        {
            try
            {
                // Check if the received model is valid.
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get the user id from the jwt token
                int userId = AuthTokenUtility.ValidateToken(Request.Headers["Authorization"]);

                ResponseHandler response = _companionhBO.GetCompanionsList(userId);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching companions", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

    }
}
