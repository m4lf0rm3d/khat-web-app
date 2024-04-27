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

        // Khat Controller Routes
        public const string KHAT_ROOT = "/api/Khat/";
        public const string ADD_MESSAGE_TO_KHAT = "AddMessage";
        public const string GET_SELF_KHAT = "GetSelf";
        public const string GET_KHAT_BY_COMPANION_ID = "GetKhatByCompanionId";
        public const string GET_KHAT_CONTENT = "GetKhatContent";
    }
}
