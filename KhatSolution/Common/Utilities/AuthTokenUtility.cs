using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class AuthTokenUtility
    {
        private static IConfiguration configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();


        // Method to generate a JWT token for a given user ID
        public static string GenerateToken(int userId)
        {
            // Create a symmetric security key using the JWT configuration key
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(configuration["JwtConfig:Secret"]));

            // Create signing credentials using the security key and HMACSHA256 algorithm
            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);

            // Create a list of claims, including the user ID
            List<Claim> claims = new()
            {
                new Claim("id", userId.ToString())
            };

            // Create a new JWT token with the specified claims, issuer, audience, expiration, and signing credentials
            JwtSecurityToken token = new(
                configuration["JwtConfig:Issuer"],
                configuration["JwtConfig:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(configuration["JwtConfig:AccessTokenExpirationInMinutes"])),
                signingCredentials: credentials);

            // Write the token as a string and return it
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Method to validate a JWT token and return the user ID
        public static int ValidateToken(string authHeaders)
        {
            // Get the token from the authorization header
            string token = authHeaders.Split(" ")[1];

            // Create a token validation parameters object with the issuer, audience, and signing key
            TokenValidationParameters validationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["JwtConfig:Issuer"],
                ValidAudience = configuration["JwtConfig:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtConfig:Secret"]))
            };

            // Create a token handler and validate the token
            JwtSecurityTokenHandler tokenHandler = new();
            ClaimsPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

            // Return the user ID from the validated token
            return Convert.ToInt32(principal.FindFirst("id").Value);
        }
    }
}
