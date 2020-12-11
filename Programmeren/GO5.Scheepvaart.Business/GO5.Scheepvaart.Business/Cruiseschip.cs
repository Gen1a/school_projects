using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public class Cruiseschip : Passagierschip
    {
        public Cruiseschip(string naam, double lengte, double breedte, double tonnage, int aantalPassagiers, Traject traject) :
            base(naam, lengte, breedte, tonnage, aantalPassagiers)
        {
            if (traject.Count <= 1) throw new SchipException("Traject moet meer dan 1 haven bevatten.");
            Traject = traject;
        }
    }
}
