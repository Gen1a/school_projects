﻿using System;

namespace BusinessLayer.Exceptions
{
    class KlantException : Exception
    {
        public KlantException()
        {
        }

        public KlantException(string message) : base(message)
        {
        }

        public KlantException(string message, Exception inner) : base(message, inner)
        {
        }
    }
}
