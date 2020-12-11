using GO5.Scheepvaart.Business.Exceptions;
using System.Collections;
using System.Collections.Generic;

namespace GO5.Scheepvaart.Business
{
    public class Vloot : IEnumerable<Schip>
    {
        private Dictionary<string, Schip> _schepen; // Dict: zoekperformantie + uniek
        public string Naam { get; set; }

        public Vloot(string naam)
        {
            if (naam == "") throw new VlootException("Naam van een vloot moet minstens 1 letter bevatten.");
            Naam = naam;
            _schepen = new Dictionary<string, Schip>();
        }

        public IEnumerator<Schip> GetEnumerator()   // Impliciete implementatie
        {
            return _schepen.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()     // Expliciete implementatie
        {
            return this.GetEnumerator();
        }
        public void VoegSchipToe(Schip schip)
        {
            if (_schepen.ContainsKey(schip.Naam)) throw new VlootException("Schip is reeds aanwezig in de vloot.");
            _schepen.Add(schip.Naam, schip);
        }
        public void VerwijderSchip(Schip schip)
        {
            if (!_schepen.ContainsKey(schip.Naam)) throw new VlootException("Schip bevindt zich niet in de vloot.");
            _schepen.Remove(schip.Naam);
            // of if (!_schepen.Remove(schip.Naam)) throw new VlootException("Schip bevindt zich niet in de vloot.");
        }

        public bool BevatSchip(string naamSchip)
        {
            return _schepen.ContainsKey(naamSchip);
        }

        public Schip ZoekSchip(string naamSchip)
        {
            if (!BevatSchip(naamSchip)) return null;
            else return _schepen[naamSchip];
        }
    }
}
