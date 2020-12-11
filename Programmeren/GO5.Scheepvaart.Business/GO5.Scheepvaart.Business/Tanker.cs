using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public abstract class Tanker : Vrachtschip
    {
        public double Volume { get; set; } // in liters
        public Tanker(string naam, double lengte, double breedte, double tonnage, decimal cargowaarde, double volume) :
            base(naam, lengte, breedte, tonnage, cargowaarde)
        {
            if (volume < 0) throw new SchipException("Volume moet groter zijn of gelijk aan 0.");
            Volume = volume;
        }
    }
}
