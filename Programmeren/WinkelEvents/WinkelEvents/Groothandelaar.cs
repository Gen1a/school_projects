using System;
using System.Collections.Generic;
using WinkelEvents.EventArgs;

namespace WinkelEvents
{
    public class Groothandelaar
    {
        public event EventHandler<StockbeheerEventArgs> BestellingGeplaatst;    // Event
        private List<Bestelling> bestellingen;

        public Groothandelaar()
        {
            bestellingen = new List<Bestelling>();
        }

        public void onStockOnderMinimum(object sender, StockbeheerEventArgs args)
        {
            Bestelling b = new Bestelling(args.Type, args.Aantal);
            bestellingen.Add(b);
            onBestellingGeplaatst(b);
        }

        protected virtual void onBestellingGeplaatst(Bestelling b)
        {
            BestellingGeplaatst?.Invoke(this, new StockbeheerEventArgs(b.ProductType, b.Aantal));
        }

        public void ShowLaatsteBestelling()
        {
            Console.WriteLine("--------------------------");
            Console.WriteLine("LAATSTE BESTELLING");
            if (bestellingen.Count == 0)
            {
                Console.WriteLine("Er zijn nog geen bestellingen geplaatst.");
            }
            else
            {
                Console.WriteLine($"Laatste bestelling: {bestellingen[^1].ProductType}, {bestellingen[^1].Aantal}");
            }
            Console.WriteLine("--------------------------");
        }

        public void ShowAlleBestellingen()
        {
            Console.WriteLine("--------------------------");
            Console.WriteLine("BESTELLINGEN GROOTHANDEL");
            if (bestellingen.Count == 0)
            {
                Console.WriteLine("Er zijn nog geen bestellingen geplaatst.");
            }
            foreach (var bestelling in bestellingen)
            {
                Console.WriteLine($"Voorraadbestelling: {bestelling.ProductType}, {bestelling.Aantal}");
            }
            Console.WriteLine("--------------------------");
        }
    }
}
