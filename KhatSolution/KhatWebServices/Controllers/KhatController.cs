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

    [Route(ControllerRoutes.KHAT_ROOT)]
    public class KhatController : ControllerBase
    {
        KhatBO _khatBO { get; set; }

        // Constructor initializing the authentication business object.
        public KhatController()
        {
            _khatBO = new();
        }

        // Action method for adding message to khat
        [Authorize]
        [HttpPost]
        [Route(ControllerRoutes.ADD_MESSAGE_TO_KHAT)]
        public async Task<IActionResult> AddMessafeToKhat([FromBody] KhatMessageDTO khatMessage)
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

                ResponseHandler response = await _khatBO.AddMessageToKhat(khatMessage.Message, userId, khatMessage.ReceiverId);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while adding message to khat", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

        // Action method for getting self khat
        [Authorize]
        [HttpPost]
        [Route(ControllerRoutes.GET_SELF_KHAT)]
        public async Task<IActionResult> GetSelfKhat([FromBody] KhatReceiverDTO khat)
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

                ResponseHandler response = await _khatBO.GetSelfKhat(userId, khat.ReceiverId);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching seld khat", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

        // Action method for getting received khat date by companion id
        [Authorize]
        [HttpPost]
        [Route(ControllerRoutes.GET_KHAT_BY_COMPANION_ID)]
        public async Task<IActionResult> GetKhatByCompanionId([FromBody] GetKhatByCompanionId khat)
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

                ResponseHandler response = await _khatBO.GetKhatByCompanionId(khat.CompanionId, userId);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching seld khat", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

        // Action method for getting received khat date by companion id
        [Authorize]
        [HttpPost]
        [Route(ControllerRoutes.GET_KHAT_CONTENT)]
        public async Task<IActionResult> GetKhatByDate([FromBody] GetKhatByCompanionId khat)
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

                ResponseHandler response = await _khatBO.GetKhatContent(khat.CompanionId,khat.KhatDate, userId);

                // Return the response with appropriate status code.
                return StatusCode(response.StatusCode, response);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching seld khat", ex);
                return StatusCode(500, new ResponseHandler(500, "Something went wrong!"));
            }
        }

    }
}
