using Common.Constants;
using Common.Handlers;
using Common.Utilities;
using Core.DTOs;
using Core.Models;
using Core.ViewModels;
using DAL.DbContexts;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.BusinessObjects
{
    public class CompanionBO
    {
        KhatContext _khatContext { get; set; }

        public CompanionBO()
        {
            _khatContext = new KhatContext();
        }

        public async Task<ResponseHandler> SendCompanionInviteAsync(string invitationReceiverEmail, int senderId)
        {
            try
            {

                // Check if is an invite is already sent today
                CompanionInvite invitationSent = _khatContext.CompanionInvites.FirstOrDefault(invite => invite.SenderId == senderId &&
                invite.ReceiverEmail == invitationReceiverEmail &&
                invite.CreatedOn.Date == DateTime.Today
                );

                if ( invitationSent != null )
                {
                    return new ResponseHandler(400, "Invitation already sent today!");
                }

                // Create a new companion invite object
                CompanionInvite invite = new()
                {
                    InviteLink = Guid.NewGuid(),
                    SenderId = senderId,
                    ReceiverEmail = invitationReceiverEmail,
                    CreatedOn = DateTime.Now,
                    CreatedBy = senderId
                };

                // Save Companion Invite in database
                await _khatContext.CompanionInvites.AddAsync(invite);
                await _khatContext.SaveChangesAsync();

                // Prepare Dynamic object to send email
                dynamic metaData = new ExpandoObject();
                metaData.inviteLink = $"http://localhost:5173/companions/verify/{invite.InviteLink}/";
                metaData.senderId = senderId;
                metaData.firstName = _khatContext.Users.Where(u => u.UserId == senderId).Select(u => u.FirstName).FirstOrDefault();

                // Send an email to the receiver
                EmailSenderUtility.SendEmail(invitationReceiverEmail, Enums.EmailKeys.COMPANION_INVITE, metaData);

                // Return a success response
                return new ResponseHandler(200, "Invitation Sent Successfully!", null, null);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while sending companion invite", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }
        }

        public async Task<ResponseHandler> AcceptCompanionInviteAsync(Guid inviteLink)
        {
            try
            {
                // Check if the invite link is valid
                CompanionInvite invite = _khatContext.CompanionInvites.FirstOrDefault(invite => invite.InviteLink == inviteLink && invite.IsAccepted == false && invite.IsActive == true && invite.CreatedOn.Date == DateTime.Today);

                if (invite == null)
                {
                    return new ResponseHandler(400, "Invalid Invitation Link or Expired!");
                }

                SqlParameter[] parameters = { new SqlParameter("@InviteLinkId", SqlDbType.UniqueIdentifier) { Value = invite.InviteLink } };
                _khatContext.ExecuteStoredProcedureWithoutResult(DatabaseDefaults.StoredProcedures.ACCEPT_COMPANION_INVITE, parameters);

                // Return a success response
                return new ResponseHandler(200, "Invitation Accepted Successfully!", null, null);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while accepting companion invite", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }
        }

        public ResponseHandler GetCompanionsList(int userId)
        {
            try
            {
                // Get the list of companions for the user
                HashSet<int> companionIds = _khatContext.Companions.Where(companion => (companion.CompanionAid == userId || companion.CompanionBid == userId) && companion.IsActive == true).Select(companion => companion.CompanionAid == userId ? companion.CompanionBid : companion.CompanionAid).ToHashSet();

                // Get the list of users from the companion ids
                List<UserViewModel> companions = _khatContext.Users
                    .Where(user => companionIds.Contains(user.UserId))
                    .Select(user => new UserViewModel
                    {
                        UserId = user.UserId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email
                    })
                    .ToList();


                // Return the list of companions
                return new ResponseHandler(200, "Companions Lists fetched successfully", null, companions);
            }
            catch(Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching companions list", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }


        }

    }

    

}
