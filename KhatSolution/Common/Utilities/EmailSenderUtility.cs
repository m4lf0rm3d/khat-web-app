using Common.Constants;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Dynamic;

namespace Common.Utilities
{
    public static class EmailSenderUtility
    {
        private static IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

        public static void SendEmailAsync(string toEmail, string subject, string message)
        {
            // Get Configuration values from appsettings.json
            string fromEmail = configuration["EmailConfig:FromEmail"];
            string password = configuration["EmailConfig:Password"];
            string host = configuration["EmailConfig:Host"];
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

        public static void SendEmail(string toEmail, Enums.EmailKeys emailKey, dynamic metaData)
        {
            string emailTemplate = String.Empty;
            string subject = String.Empty;

            switch (emailKey)
            {
                case Enums.EmailKeys.SIGNUP:
                    emailTemplate = "Hello, <br> <br> Thank you for signing up with us. <br> <br> Regards, <br> The Team";
                    subject = "Welcome to the Team!";
                    break;
                case Enums.EmailKeys.PASSWORD_RESET:
                    emailTemplate = "Hello, <br> <br> You have requested to reset your password. <br> <br> Regards, <br> The Team";
                    subject = "Password Reset Request";
                    break;
                case Enums.EmailKeys.COMPANION_INVITE:
                    // Using string interpolation correctly with dynamic metaData
                    subject = $"Join {metaData.firstName} on Khat";
                    emailTemplate = $@"
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>Invite to Khat</title>
<style>
    body {{ font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }}
    .email-container {{ max-width: 600px; margin: auto; background: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }}
    .header {{ background-color: #5B3A1D; color: white; padding: 10px; text-align: center; font-size: 24px; }}
    .content {{ padding: 20px; line-height: 1.6; color: #555555; }}
    .button {{ display: block; width: 200px; margin: 20px auto; padding: 10px; text-align: center; background-color: #5B3A1D; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; }}
</style>
</head>
<body>
<div class='email-container'>
    <div class='header'>Join {metaData.firstName} on Khat</div>
    <div class='content'>
        <h1>Hello Cutie!</h1>
        <p><strong>Khat</strong> is a great app for connecting and staying in touch. {metaData.firstName} is inviting you to join Khat!</p>
        <p>Click the button below to get started:</p>
        <a href='{metaData.inviteLink}' class='button'>Join Khat</a>
        <p>If the button above does not work, please copy and paste the following link into your browser:</p>
        <p><code>{metaData.inviteLink}</code></p>
        <p>Best regards,<br>Khat Team<br><a href='https://www.khat.pk'>https://www.khat.pk</a></p>
    </div>
</div>
</body>
</html>
";
                    break;
            }
            SendEmailAsync(toEmail, subject, emailTemplate);
        }
    }
}
