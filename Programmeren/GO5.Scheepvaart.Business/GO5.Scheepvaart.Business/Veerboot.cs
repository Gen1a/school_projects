using GO5.Scheepvaart.Business.Exceptions;

namespace GO5.Scheepvaart.Business
{
    public class Veerboot : Passagierschip
    {
        public Veerboot(string naam, double lengte, double breedte, double tonnage, int aantalPassagiers, Traject traject) :
            base(naam, lengte, breedte, tonnage, aantalPassagiers)
        {
            if (traject.Count != 2) throw new SchipException("Traject moet een vast traject tussen 2 havens zijn.");
            Traject = traject;
        }
    }
}
