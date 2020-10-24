using System;
using WinkelEvents.EventArgs;

namespace WinkelEvents
{
    public class Winkel
    {
        public event EventHandler<WinkelEventArgs> ProductVerkocht; // Event

        public void VerkoopProduct(Bestelling b)
        {
            onProductVerkocht(b);
        }

        protected virtual void onProductVerkocht(Bestelling b)
        {
            ProductVerkocht?.Invoke(this, new WinkelEventArgs(b));
        }
    }
}
