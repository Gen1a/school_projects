using System;

namespace GO5.Scheepvaart.Business
{
    public abstract class Schip
    {
        public string Naam { get; set; }
        public double Lengte { get; set; }
        public double Breedte { get; set; }
        public double Tonnage { get; set; }  // Volume van het schip
        public Schip(string naam, double lengte, double breedte, double tonnage)
        {
            if (naam == "") throw new ArgumentException("Naam van een schip moet minstens 1 letter bevatten.");
            if (lengte <= 0.0 || breedte <= 0.0) throw new ArgumentOutOfRangeException("Lengte en breedte moeten groter zijn dan 0.");
            if (tonnage <= 0.0) throw new ArgumentOutOfRangeException("Tonnage moeten groter zijn dan 0.");
            Naam = naam;
            Lengte = lengte;
            Breedte = breedte;
            Tonnage = tonnage;
        }
    } 
}
