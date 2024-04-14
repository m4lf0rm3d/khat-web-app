using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Handlers
{
    public class ResponseHandler
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string? Token { get; set; }
        public object? Data { get; set; }
        public ResponseHandler(int statusCode, string message, string? token = null, object? data = null) 
        {
            StatusCode = statusCode;
            Message = message;
            Token = token;
            Data = data;
        }
    }
}
