using System;
using System.Collections.Generic;

namespace GO5.RentABoat
{
    public class NachtKorting
    {
        public string Naam { get; }
        public List<int> AantalNachten = new List<int>();
        public List<double> Kortingen = new List<double>();
        public int MaximumAantalNachten { get; set; }

        public NachtKorting(string naam)
        {
            if (naam == "") throw new ArgumentException("Naam moet minstens 1 letter bevatten.");
            if (naam == null) throw new ArgumentNullException("Naam mag niet null zijn.");
            // Nachtkorting "Geen" bevat geen nachtkortingen
            if (naam == "Geen")
            {
                AantalNachten.Add(0);
                Kortingen.Add(0.0);
            }
            Naam = naam;
            MaximumAantalNachten = 21;
        }

        public void VoegNachtKortingToe(int aantal, double korting)
        {
            if (aantal <= 0) throw new ArgumentOutOfRangeException("Aantal moet groter zijn dan 0.");
            if (aantal > MaximumAantalNachten) throw new ArgumentOutOfRangeException(
                "Aantal nachten moet kleiner zijn dan " + MaximumAantalNachten + ".");
            if (AantalNachten.Contains(aantal)) throw new ArgumentOutOfRangeException(
                "Korting voor " + aantal + " nachten bestaat reeds.");
            if (korting <= 0 || korting > 100) throw new ArgumentOutOfRangeException(
                "Korting moet tussen 0 en 100% liggen.");
            if (AantalNachten.Count >= 1)
            {
                ValideerKorting(aantal, korting);
            }
            AantalNachten.Add(aantal);
            AantalNachten.Sort();
            Kortingen.Add(korting);
            Kortingen.Sort();
        }

        public void VerwijderNachtKorting(int aantal, double korting)
        {
            if (!AantalNachten.Contains(aantal)) throw new ArgumentOutOfRangeException(
                aantal + "aantal nachten is niet aanwezig in lijst met aantallen.");
            if (!Kortingen.Contains(korting)) throw new ArgumentOutOfRangeException(
                "Korting" + korting + "is niet aanwezig in lijst met kortingen.");
            AantalNachten.Remove(aantal);
            Kortingen.Remove(korting);
        }

        public double KortingVoorAantal(int aantalNachten)
        {
            if (aantalNachten == 0)
                return 0.0;
            int index = AantalNachten.IndexOf(aantalNachten);
            return Kortingen[index];
        }

        private Boolean ValideerKorting(int aantal, double korting)
        {
            // Verifieer op welke index nieuwe aantal terecht moet komen
            int indexNieuwAantal = 0;
            for (int i = 0; i < AantalNachten.Count; i++)
            {
                if (aantal > AantalNachten[i])
                {
                    indexNieuwAantal++;
                }
                // Loop breken om running time te verkorten
                else
                    break;
            }
            // Indien nachtkortingenlijst slechts 1 item bevat
            if (AantalNachten.Count == 1)
            {
                if (indexNieuwAantal == 0 && korting >= Kortingen[0])
                    throw new ArgumentException("Ingegeven korting moet kleiner zijn dan " + Kortingen[0] + ".");
                else if (indexNieuwAantal == 1 && korting <= Kortingen[0])
                    throw new ArgumentException("Ingegeven korting moet groter zijn dan " + Kortingen[0] + ".");
                else
                    return true;
            }
            // Indien nachtkortingenlijst meer dan 1 item bevat
            // Corner case: begin lijst
            if (indexNieuwAantal == 0)
            {
                if (korting >= Kortingen[indexNieuwAantal + 1]) throw new ArgumentException(
                    "Ingegeven korting moet kleiner zijn dan " + Kortingen[indexNieuwAantal + 1] + ").");
            }
            // Corner case: einde lijst
            else if (indexNieuwAantal == AantalNachten.Count - 1)
            {
                if (korting <= Kortingen[indexNieuwAantal - 1]) throw new ArgumentException(
                    "Ingegeven korting is moet groter zijn dan " + Kortingen[indexNieuwAantal - 1] + ").");
            }
            // Midden in lijst
            else if (korting >= Kortingen[indexNieuwAantal])
            {
                throw new ArgumentException("Ingegeven korting is moet kleiner zijn dan " + Kortingen[indexNieuwAantal] + ".");
            }
            else if (korting <= Kortingen[indexNieuwAantal - 1])
            {
                throw new ArgumentException("Ingegeven korting is moet groter zijn dan " + Kortingen[indexNieuwAantal - 1] + ".");
            }
            return true;
        }
    }
}
