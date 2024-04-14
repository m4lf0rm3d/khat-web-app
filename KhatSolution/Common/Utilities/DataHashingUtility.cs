using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utilities
{
    public static class DataHashingUtility
    {
        private static readonly IConfiguration _configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        private  const int MAX_ITERATION = 10;

        // Method to generate a hash for a given password, salt, and iteration count
        public static string GenerateHash(string password, string salt,  int? iteration = MAX_ITERATION)
        {
            // If the iteration count is less than 1, return the original password
            if (iteration < 1) return password;

            // Using SHA256 hashing algorithm
            using (var sha256 = SHA256.Create())
            {
                // Combine the password, salt, and pepper for hashing
                string pepper = _configuration["PasswordHashConfig:Pepper"];
                string passwordWithSaltPepper = $"{password}{salt}{pepper}";

                // Convert the combined string to bytes
                var byteValue = Encoding.UTF8.GetBytes(passwordWithSaltPepper);

                // Compute the hash of the combined bytes
                var byteHash = sha256.ComputeHash(byteValue);

                // Convert the hash bytes to a Base64 string
                var hash = Convert.ToBase64String(byteHash);

                // Recursively generate hash with the new hash, salt, and decreased iteration count
                return GenerateHash(hash, salt, iteration - 1);
            }
        }
    }
}
