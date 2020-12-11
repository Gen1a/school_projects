using System;

namespace GO5.Scheepvaart.Business.Exceptions
{
    public class HavenException : Exception
    {
        public HavenException()
        {
        }

        public HavenException(string message) : base(message)
        {
        }

        public HavenException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
