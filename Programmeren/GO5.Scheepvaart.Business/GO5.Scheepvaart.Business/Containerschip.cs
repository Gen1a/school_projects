using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public class Containerschip : Vrachtschip
    {
        public int AantalContainers { get; set; }
        public Containerschip(string naam, double lengte, double breedte, double tonnage, int aantalContainers, decimal cargowaarde) :
            base(naam, lengte, breedte, tonnage, cargowaarde)
        {
            if (aantalContainers < 0) throw new SchipException("Aantal containers moet groter dan of gelijk aan 0 zijn.");
            AantalContainers = aantalContainers;
        }
    }
}
