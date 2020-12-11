using GO5.Scheepvaart.Business.Exceptions;
using System.Collections.Generic;

namespace GO5.Scheepvaart.Business
{
    public class Traject
    {
        private List<Haven> _havens;

        public Traject()
        {
            _havens = new List<Haven>();
        }
        public Traject(List<Haven> havens)
        {
            if (havens == null) throw new TrajectException("Lijst van havens mag niet null zijn");
            _havens = havens;
        }
        public Haven this[int index] => _havens[index];
        public int Count => _havens.Count;
        public void VoegToe(Haven haven) => _havens.Add(haven);
        public void Verwijder(Haven haven) => _havens.Remove(haven);
    }
}
