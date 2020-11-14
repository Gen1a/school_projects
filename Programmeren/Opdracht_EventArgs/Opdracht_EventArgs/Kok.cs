using BusinessLayer.Events;
using System;

namespace BusinessLayer
{
    public class Kok
    {
        #region Properties
        public string Naam { get; set; }
        private BestellingsSysteem _bestellingsSysteem;
        public BestellingsSysteem BestellingsSysteem
        {
            get
            {
                return BestellingsSysteem;
            }
            set
            {
                // Check indien reeds ingeschreven op event
                if (_bestellingsSysteem != null) _bestellingsSysteem.BestellingEvent -= BestellingOntvangen;
                _bestellingsSysteem = value;
                _bestellingsSysteem.BestellingEvent += BestellingOntvangen;
            }
        }
        public Bel Bel { get; set; }
        #endregion
        #region Ctor
        public Kok(string naamKok)
        {
            this.Naam = naamKok;
        }
        #endregion
        #region Methods
        public void BestellingOntvangen(object sender, BestelEventArgs args)
        {
            if (args == null || string.IsNullOrWhiteSpace(args.Product)) return;

            Console.WriteLine($"{args.Product} in voorbereiding...");
            System.Threading.Thread.Sleep(5000);
            Bel.Ring(args);
        }
        #endregion
    }
}
