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
    public class KhatBO
    {
        KhatContext _khatContext { get; set; }

        public KhatBO()
        {
            _khatContext = new KhatContext();
        }

        public async Task<ResponseHandler> AddMessageToKhat(string message, int senderId, int receiverId)
        {
            try
            {

                // Get Khat Id
                int khatId = _khatContext.Khats.FirstOrDefault(khat => (khat.SenderId == senderId && khat.ReceiverId == receiverId)).KhatId;

                if (khatId == 0)
                {
                    return new ResponseHandler(400, "Khat not found!");
                }

                // Create a new message object
                KhatContent newMessage = new()
                {
                    KhatId = khatId,
                    KhatSectionText = message,
                    CreatedOn = DateTime.Now,
                    CreatedBy = senderId
                };

                // Save Message in database
                await _khatContext.KhatContents.AddAsync(newMessage);
                await _khatContext.SaveChangesAsync();

                // Return a success response
                return new ResponseHandler(200, "Message added to Khat successfully!", null, null);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while adding message to khat", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }
        }

        public async Task<ResponseHandler> GetSelfKhat(int userId, int receiverId)
        {
            try
            {
                // Get Khat Id
                int khatId = _khatContext.Khats.FirstOrDefault(khat => (khat.SenderId == userId && khat.ReceiverId == receiverId)).KhatId;

                if (khatId == 0)
                {
                    return new ResponseHandler(400, "Khat not found!");
                }

                // Get the list of messages for the khat
                List<KhatMessageViewModel> messages = _khatContext.KhatContents
                    .Where(message => message.KhatId == khatId && message.CreatedOn.Date == DateTime.Today)
                    .Select(message => new KhatMessageViewModel()
                        {
                            KhatId = message.KhatId,
                            SenderId = message.CreatedBy,
                            ReceiverId = receiverId,
                            Message = message.KhatSectionText,
                            CreatedOn = message.CreatedOn
                        }
                    )
                    .ToList();

                // Return the list of messages
                return new ResponseHandler(200, "Messages fetched successfully", null, messages);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching self khats", ex);
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
                List<CompanionViewModel> companions = _khatContext.Users
                    .Where(user => companionIds.Contains(user.UserId))
                    .Select(user => new CompanionViewModel
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

        public async Task<ResponseHandler> GetKhatByCompanionId(int companionId, int userId)
        {
            try
            {
                // Get Khat Id
                int khatId = _khatContext.Khats.FirstOrDefault(khat => (khat.ReceiverId == userId && khat.CompanionId == companionId)).KhatId;

                // Get Khat Dates
                List<DateTime> khatDates = _khatContext.KhatContents
                    .Where(message => message.KhatId == khatId)
                    .Select(message => message.CreatedOn.Date)
                    .Distinct()
                    .ToList();

                // Return the list of companions
                return new ResponseHandler(200, "Companions Lists fetched successfully", null, khatDates);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching companions list", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }


        }

        public async Task<ResponseHandler> GetKhatContent(int companionId, DateTime khatDate, int userId)
        {
            try
            {
                // Get Khat Id
                int khatId = _khatContext.Khats.FirstOrDefault(khat => (khat.ReceiverId == userId && khat.CompanionId == companionId)).KhatId;

                // Get Khats based on date
                List<KhatMessageViewModel> messages = _khatContext.KhatContents
                    .Where(message => message.KhatId == khatId && message.CreatedOn.Date == khatDate)
                    .Select(message => new KhatMessageViewModel()
                    {
                            KhatId = message.KhatId,
                            SenderId = message.CreatedBy,
                            ReceiverId = userId,
                            Message = message.KhatSectionText,
                            CreatedOn = message.CreatedOn
                        }
                    )
                    .ToList();

                // Return the list of companions
                return new ResponseHandler(200, "Companions Lists fetched successfully", null, messages);
            }
            catch (Exception ex)
            {
                //Log the exception and return a generic error response.
                LoggerUtility.LogError("Error occurred while fetching companions list", ex);
                return new ResponseHandler(500, "Something went wrong!", null, null);
            }


        }

    }

    

}
