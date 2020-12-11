using System;
using System.Runtime.Serialization;

namespace GO5.Scheepvaart.Business.Exceptions
{
    public class TrajectException : Exception
    {
        public TrajectException()
        {
        }

        public TrajectException(string message) : base(message)
        {
        }

        public TrajectException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
