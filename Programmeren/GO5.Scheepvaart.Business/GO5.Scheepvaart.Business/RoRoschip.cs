using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public class RoRoschip : Vrachtschip // Roll-on-roll-offschip
    {
        public int AantalAutos { get; set; }
        public int AantalTrucks { get; set; }
        public RoRoschip(string naam, double lengte, double breedte, double tonnage, int aantalAutos, int aantalTrucks, decimal cargowaarde) :
            base(naam, lengte, breedte, tonnage, cargowaarde)
        {
            if (aantalAutos < 0) throw new SchipException("Aantal auto's moet groter zijn dan of gelijk aan 0.");
            if (aantalTrucks < 0) throw new SchipException("Aantal trucks moet groter zijn dan of gelijk aan 0.");
            AantalAutos = aantalAutos;
            AantalTrucks = aantalTrucks;
        }
    }
}
