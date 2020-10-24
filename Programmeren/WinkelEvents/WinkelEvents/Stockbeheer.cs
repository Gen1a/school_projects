using System;
using System.Collections.Generic;
using WinkelEvents.EventArgs;

namespace WinkelEvents
{
    public class Stockbeheer
    {
        private const int MINIMUM_AANTAL = 25;  // grens minimum stock
        private const int MAXIMUM_AANTAL = 100; // grens maximum stock
        public event EventHandler<StockbeheerEventArgs> StockOnderMinimum;  // Event
        private Dictionary<ProductType, int> stock;
        public Stockbeheer()
        {
            stock = new Dictionary<ProductType, int>();
            foreach (ProductType type in Enum.GetValues(typeof(ProductType)))
            {
                stock[type] = 100;
            }
        }

        public void onProductVerkocht(object sender, WinkelEventArgs args)  // Event Handler
        {
            stock[args.bestelling.ProductType] -= args.bestelling.Aantal;
            if (stock[args.bestelling.ProductType] < MINIMUM_AANTAL)
            {
                int teBestellen = MAXIMUM_AANTAL - stock[args.bestelling.ProductType];
                onStockOnderMinimum(args.bestelling.ProductType, teBestellen);
            }
        }

        public void onBestellingGeplaatst(object sender, StockbeheerEventArgs args)  // Event Handler
        {
            stock[args.Type] += args.Aantal;
        }

        protected virtual void onStockOnderMinimum(ProductType type, int aantal)    // Event Init
        {
            StockOnderMinimum?.Invoke(this, new StockbeheerEventArgs(type, aantal));
        }

        public void ShowStock()
        {
            Console.WriteLine("--------------------------");
            Console.WriteLine("STOCKOVERZICHT");
            foreach (var item in stock)
            {
                Console.WriteLine($"Stock: {item.Key}, {item.Value}");
            }
            Console.WriteLine("--------------------------");
        }
    }
}
