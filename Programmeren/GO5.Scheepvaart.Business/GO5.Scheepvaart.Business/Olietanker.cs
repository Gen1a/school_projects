namespace GO5.Scheepvaart.Business
{
    public class Olietanker : Tanker
    {
        public enum OlietankerLading
        {
            olie, benzeen, diesel, nafta
        }
        public OlietankerLading Lading { get; set; }
        public Olietanker(string naam, double lengte, double breedte, double tonnage, decimal cargowaarde, double volume, OlietankerLading lading) :
            base(naam, lengte, breedte, tonnage, cargowaarde, volume)
        {
            Lading = lading;
        }
    }
}
