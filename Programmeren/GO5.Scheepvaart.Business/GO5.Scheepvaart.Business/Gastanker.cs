namespace GO5.Scheepvaart.Business
{
    public class Gastanker : Tanker
    {
        public enum GastankerLading
        {
            LPG, LNG, amoniak
        }
        public GastankerLading Lading { get; set; }
        public Gastanker(string naam, double lengte, double breedte, double tonnage, decimal cargowaarde, double volume, GastankerLading lading) :
            base(naam, lengte, breedte, tonnage, cargowaarde, volume)
        {
            Lading = lading;
        }

    }
}
