using System;
using System.Collections.Generic;
using WinkelEvents.EventArgs;
using System.Linq;

namespace WinkelEvents
{
    public class Sales
    {
        private Dictionary<string, List<Bestelling>> rapport;

        public Sales()
        {
            rapport = new Dictionary<string, List<Bestelling>>();
        }
        public void onProductVerkocht(object sender, WinkelEventArgs args)  // Event Handler
        {
            if (rapport.ContainsKey(args.bestelling.Adres))
            {
                rapport[args.bestelling.Adres].Add(args.bestelling);
            }
            else
            {
                List<Bestelling> bestellingen = new List<Bestelling> { args.bestelling };
                rapport[args.bestelling.Adres] = bestellingen;
            }
        }

        public void ShowRapport()
        {
            Console.WriteLine("--------------------------");
            Console.WriteLine("SALESRAPPORT");
            foreach (var verkoop in rapport)
            {
                Console.WriteLine(verkoop.Key);
                var query = verkoop.Value.GroupBy(
                    x => x.ProductType,
                    (type, bestelling) => new
                    {
                        Type = type,
                        Aantal = bestelling.Sum(x => x.Aantal)
                    });
                foreach (var bestelling in query)
                {
                    Console.WriteLine($"    {bestelling.Type}, {bestelling.Aantal}");
                }
            }
            Console.WriteLine("--------------------------");
        }
    }
}
