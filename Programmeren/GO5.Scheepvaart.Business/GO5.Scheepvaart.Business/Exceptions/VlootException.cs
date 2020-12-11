using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace GO5.Scheepvaart.Business.Exceptions
{
    public class VlootException : Exception
    {
        public VlootException()
        {
        }

        public VlootException(string message) : base(message)
        {
        }

        public VlootException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
