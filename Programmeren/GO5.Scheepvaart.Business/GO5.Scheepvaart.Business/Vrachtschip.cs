using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public abstract class Vrachtschip : Schip
    {
        public decimal Cargowaarde { get; set; }    // Waarde van de vracht uitgedrukt in euro
        public Vrachtschip(string naam, double lengte, double breedte, double tonnage, decimal cargowaarde) :
            base(naam, lengte, breedte, tonnage)
        {
            if (cargowaarde < 0m) throw new SchipException("Cargowaarde moet groter dan of gelijk aan 0 zijn.");
            Cargowaarde = cargowaarde;
        }
    }
}
