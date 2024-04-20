using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class EmailSenderUtility
    {
        private static IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        public static void SendEmailAsync(string toEmail, string subject, string message)
        {
            // Get Configuration values from appsettings.json
            string fromEmail = configuration["EmailConfig:Email"];
            string password = configuration["EmailConfig:Password"];
            string host = configuration["EmailConfig:Password"];
            int port = Convert.ToInt16(configuration["EmailConfig:Port"]);

            // Create a new SMTP client with the specified host, port, and credentials
            SmtpClient client = new SmtpClient(host);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(fromEmail, password);
            client.EnableSsl = true;
            client.Port = port;

            // Create a new mail message with the specified sender, recipient, subject, and message
            var mail = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };

            // Send the mail asynchronously
            client.SendMailAsync(mail);
            
        }
    }
}
