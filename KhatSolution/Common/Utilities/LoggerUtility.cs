using System;
using log4net;
using log4net.Config;

namespace Common.Utilities
{
    public static class LoggerUtility
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(LoggerUtility));

        static LoggerUtility()
        {
            // Assuming log4net.config is in the application root directory and set to 'Copy Always' or 'Copy if newer' because it will not require restarting system again and again.
            var log4NetConfigFilePath = AppDomain.CurrentDomain.BaseDirectory + "log4net.config";
            XmlConfigurator.ConfigureAndWatch(new System.IO.FileInfo(log4NetConfigFilePath));
        }

        public static void LogDebug(string message)
        {
            if (log.IsDebugEnabled)
            {
                log.Debug(message);
            }
        }

        public static void LogInfo(string message)
        {
            if (log.IsInfoEnabled)
            {
                log.Info(message);
            }
        }

        public static void LogWarn(string message)
        {
            if (log.IsWarnEnabled)
            {
                log.Warn(message);
            }
        }

        public static void LogError(string message, Exception ex = null)
        {
            if (ex == null)
            {
                log.Error(message);
            }
            else
            {
                log.Error(message, ex);
            }
        }

        public static void LogFatal(string message, Exception ex = null)
        {
            if (ex == null)
            {
                log.Fatal(message);
            }
            else
            {
                log.Fatal(message, ex);
            }
        }
    }
}
