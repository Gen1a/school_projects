using System.Collections.Generic;

namespace GO5.Scheepvaart.Business
{
    public class Traject
    {
        private List<Haven> _havens = new List<Haven>();
        public Haven this[int index] => _havens[index];
        public int Count => _havens.Count;
        public void VoegToe(Haven haven) => _havens.Add(haven);
        public void Verwijder(Haven haven) => _havens.Remove(haven);
    }
}
