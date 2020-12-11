using System;

namespace GO5.Scheepvaart.Business.Exceptions
{
    public class SchipException : Exception
    {
        public SchipException()
        {
        }

        public SchipException(string message) : base(message)
        {
        }

        public SchipException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
