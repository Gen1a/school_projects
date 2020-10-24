
namespace WinkelEvents.EventArgs
{
    public class WinkelEventArgs
    {
        public Bestelling bestelling { get; set; }
        public WinkelEventArgs(Bestelling b)
        {
            bestelling = b;
        }
    }
}
