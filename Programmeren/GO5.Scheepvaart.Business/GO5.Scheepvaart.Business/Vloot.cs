using System;
using System.Collections;
using System.Collections.Generic;

namespace GO5.Scheepvaart.Business
{
    public class Vloot : IEnumerable<Schip>
    {
        private Dictionary<string, Schip> _schepen;
        public string Naam { get; set; }

        public Vloot(string naam)
        {
            if (naam == "") throw new ArgumentException("Naam van een vloot moet minstens 1 letter bevatten.");
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
            if (_schepen.ContainsKey(schip.Naam)) throw new ArgumentOutOfRangeException("Schip is reeds aanwezig in de vloot.");
            _schepen.Add(schip.Naam, schip);
        }
        public void VerwijderSchip(Schip schip)
        {
            if (!_schepen.ContainsKey(schip.Naam)) throw new ArgumentOutOfRangeException("Schip bevindt zich niet in de vloot.");
            _schepen.Remove(schip.Naam);
            // of if (!_schepen.Remove(schip.Naam)) throw new ArgumentOutOfRangeException("Schip bevindt zich niet in de vloot.");
        }

        public bool BevatSchip(string naamSchip)
        {
            return _schepen.ContainsKey(naamSchip);
        }

        public Schip ZoekSchip(string naamSchip)
        {
            return _schepen[naamSchip];
        }

        public void VerplaatsSchip(string naamSchip, Vloot doelVloot)
        {
            Schip s = ZoekSchip(naamSchip);
            doelVloot.VoegSchipToe(s);
            VerwijderSchip(s);
        }
    }
}
