using System;

namespace GO5.Scheepvaart.Business
{
    public class Haven
    {
        public string Naam { get; set; }
        public Haven(string naam)
        {
            if (naam == "") throw new ArgumentOutOfRangeException("Haven moet een naam hebben van minstens 1 letter.");
            Naam = naam;
        }
    }
}
