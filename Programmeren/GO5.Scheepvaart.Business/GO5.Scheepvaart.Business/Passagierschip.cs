using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public abstract class Passagierschip : Schip
    {
        public int AantalPassagiers { get; set; }
        public Traject Traject { get; set; }
        public Passagierschip(string naam, double lengte, double breedte, double tonnage, int aantalPassagiers) :
            base(naam, lengte, breedte, tonnage)
        {
            if (aantalPassagiers < 0) throw new SchipException("Aantal passagiers moet groter zijn dan of gelijk aan 0.");
            AantalPassagiers = aantalPassagiers;
        }
    }
}
