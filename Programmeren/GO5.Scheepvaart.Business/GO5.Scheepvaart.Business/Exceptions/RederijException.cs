using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace GO5.Scheepvaart.Business.Exceptions
{
    public class RederijException : Exception
    {
        public RederijException()
        {
        }

        public RederijException(string message) : base(message)
        {
        }

        public RederijException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
