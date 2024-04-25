using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Constants
{
    public static class ControllerRoutes
    {
        //Authentication Controller Routes

        // Auth Controller Routes
        public const string AUTH_ROOT = "/api/Auth/";
        public const string AUTH_LOGIN = "Login";
        public const string AUTH_SIGNUP = "Signup";

        // Companion Controller Routes
        public const string COMPANION_ROOT = "/api/Companion/";
        public const string GET_COMPANIONS_LIST = "GetCompanionsList";
        public const string SEND_COMPANION_INVITE = "SendCompanionInvite";
        public const string ACCEPT_COMPANION_INVITE = "AcceptCompanionInvite";
    }
}
