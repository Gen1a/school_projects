
namespace WinkelEvents.EventArgs
{
    public class StockbeheerEventArgs
    {
        public ProductType Type { get; set; }
        public int Aantal { get; set; }
        public StockbeheerEventArgs(ProductType type, int aantal)
        {
            Type = type;
            Aantal = aantal;
        }
    }
}
