using GO5.Scheepvaart.Business.Exceptions;
using System.Collections;
using System.Collections.Generic;

namespace GO5.Scheepvaart.Business
{
    public class Rederij : IEnumerable<Vloot> // IEnumerable<Vloot> maakt het mogelijk om over vloten in rederij te enumereren
    {
        private Dictionary<string, Vloot> _vloten;
        private SortedList<string, Haven> _actieveHavens;
        public Rederij()
        {
            _vloten = new Dictionary<string, Vloot>();
            _actieveHavens = new SortedList<string, Haven>();
        }

        public IEnumerator<Vloot> GetEnumerator()   // Impliciete implementatie
        {
            return _vloten.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()     // Expliciete implementatie
        {
            return this.GetEnumerator();
        }

        public void VoegVlootToe(Vloot vloot)
        {
            if (_vloten.ContainsKey(vloot.Naam)) throw new RederijException("Vloot is reeds aanwezig in de rederij.");
            _vloten.Add(vloot.Naam, vloot);
        }

        public void VerwijderVloot(Vloot vloot)
        {
            if (!_vloten.ContainsKey(vloot.Naam)) throw new RederijException("Vloot bevindt zich niet in de rederij.");
            _vloten.Remove(vloot.Naam);
            // of if (!_vloten.Remove(vloot.Naam)) throw new ArgumentOutOfRangeException("Vloot bevindt zich niet in de rederij.");
        }

        //public Vloot ZoekVloot(string naamVloot)
        //{
        //    if (!_vloten.ContainsKey(naamVloot)) throw new RederijException("Vloot bevindt zich niet in de rederij.");
        //    return _vloten[naamVloot];
        //}

        public void VoegHavenToe(string naamHaven)
        {
            if (_actieveHavens.ContainsKey(naamHaven)) throw new RederijException("Haven bestaat reeds in de lijst van actieve havens.");
            Haven nieuweHaven = new Haven(naamHaven);
            _actieveHavens.Add(naamHaven, nieuweHaven);
        }

        public void VerwijderHaven(string naamHaven)
        {
            if (!_actieveHavens.ContainsKey(naamHaven)) throw new RederijException("Haven bevindt zich niet in actieve havens.");
            _actieveHavens.Remove(naamHaven);
        }

        public Schip GeefInfoSchip(string naam)
        {
            foreach (KeyValuePair<string, Vloot> vloot in _vloten)
            {
                if (vloot.Value.BevatSchip(naam))
                {
                    return vloot.Value.ZoekSchip(naam);
                }
            }
            return null;
        }

        public void VerplaatsSchip(string schipNaam, string vlootNaam)
        {
            Schip s;
            foreach (Vloot v in _vloten.Values)
            {
                s = v.ZoekSchip(schipNaam);
                if (s != null)
                {
                    v.VerwijderSchip(s);
                    _vloten[vlootNaam].VoegSchipToe(s);
                }
            }
        }

        public decimal GeefTotaleCargowaarde()
        {
            decimal totaal = 0m;
            foreach (KeyValuePair<string, Vloot> vloot in _vloten)
            {
                foreach (Schip s in vloot.Value)
                {
                    if (s is Vrachtschip vrachtschip)
                    {
                        totaal += vrachtschip.Cargowaarde;
                    }
                }
            }
            return totaal;
        }

        public int GeefTotaalAantalPassagiers()
        {
            int totaal = 0;
            foreach (KeyValuePair<string, Vloot> vloot in _vloten)
            {
                foreach (Schip s in vloot.Value)
                {
                    if (s is Passagierschip passagierschip)
                    {
                        totaal += passagierschip.AantalPassagiers;
                    }
                }
            }
            return totaal;
        }

        public SortedDictionary<double, List<Vloot>> GeefTonnagePerVloot()
        {
            // SortedDict sorteert op key
            // List<Vloot> aangezien vloten identieke tonnage kunnen hebben
            SortedDictionary<double, List<Vloot>> output = new SortedDictionary<double, List<Vloot>>();
            if (_vloten.Count == 0) throw new RederijException("Geen vloten aanwezig in de rederij");
            foreach (Vloot v in _vloten.Values)
            {
                double tonnage = 0.0;
                foreach (Schip s in v)
                {
                    tonnage += s.Tonnage;
                    if (output.ContainsKey(tonnage)) output[tonnage].Add(v);    // check indien vloten zelfde tonnage hebben
                    else { output.Add(tonnage, new List<Vloot>() { v }); }
                }
            }
            return output;
        }

        public double GeefTotaalVolumeTankers()
        {
            double totaalVolume = 0.0;
            foreach (KeyValuePair<string, Vloot> vloot in _vloten)
            {
                foreach (Schip s in vloot.Value)
                {
                    if (s is Tanker tanker)
                    {
                        totaalVolume += tanker.Volume;
                    }
                }
            }
            return totaalVolume;
        }

        public List<Sleepboot> GeefBeschikbareSleepboten()
        {
            List<Sleepboot> sleepboten = new List<Sleepboot>();
            foreach (KeyValuePair<string, Vloot> vloot in _vloten)
            {
                foreach (Schip s in vloot.Value)
                {
                    if (s is Sleepboot sleepboot)
                    {
                        sleepboten.Add((Sleepboot)s);
                    }
                }
            }
            return sleepboten;
        }
    }
}
