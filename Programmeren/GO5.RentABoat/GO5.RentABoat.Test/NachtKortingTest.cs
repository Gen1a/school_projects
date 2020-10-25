using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace GO5.RentABoat.Test
{
    [TestClass]
    public class NachtKortingTest
    {
        private NachtKorting nachtkorting; // Arrange


        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void MaakNachtKortingZonderNaam()
        {
            string naam = "";
            nachtkorting = new NachtKorting(naam);
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void MaakNachtKortingMetNaamNull()
        {
            nachtkorting = new NachtKorting(null);
        }

        [TestMethod]
        public void NachtKortingBevatLijstMetAantallen()
        {
            nachtkorting = new NachtKorting("Test");
            Assert.IsNotNull(nachtkorting.AantalNachten);
        }

        [TestMethod]
        public void NachtKortingBevatLijstMetKortingen()
        {
            nachtkorting = new NachtKorting("Test");
            Assert.IsNotNull(nachtkorting.Kortingen);
        }

        [TestMethod]
        public void NachtKortingGeenBevatGeenItems()
        {
            nachtkorting = new NachtKorting("Geen");
            Assert.AreEqual(0.0, nachtkorting.KortingVoorAantal(0));
        }

        [TestMethod]
        public void VoegNachtKortingToeMaaktNachtKorting()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal = 7;
            double korting = 10.0;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            Assert.AreEqual(nachtkorting.AantalNachten[0], aantal);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeAantalNachtenKleinderDanNul()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal = -2;
            double korting = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeAantalNachtenNul()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal = 0;
            double korting = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeAantalNachtenToeGroterDanMaximumAantalNachten()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal = nachtkorting.MaximumAantalNachten * 2;
            double korting = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeAantalNachtenIsDuplicaat()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal = 10;
            double korting = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeKortingKleinderDanNul()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = -2.00;
            int aantal = 7;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeKortingKortingNul()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 0;
            int aantal = 7;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VoegNachtKortingToeKortingGroterDanHonderd()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 110.00;
            int aantal = 7;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
        }

        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void VoegNachtKortingToeAantalNachtenGroterKortingIdem()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal1 = 4;
            double korting1 = 10.00;
            int aantal2 = 10;
            double korting2 = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal1, korting1);
            nachtkorting.VoegNachtKortingToe(aantal2, korting2);
        }

        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void VoegNachtKortingToeAantalNachtenGroterKortingTeKlein()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal1 = 4;
            double korting1 = 10.00;
            int aantal2 = 10;
            double korting2 = 9.00;
            nachtkorting.VoegNachtKortingToe(aantal1, korting1);
            nachtkorting.VoegNachtKortingToe(aantal2, korting2);
        }

        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void VoegNachtKortingToeAantalNachtenKleinerKortingIdem()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal1 = 10;
            double korting1 = 10.00;
            int aantal2 = 4;
            double korting2 = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal1, korting1);
            nachtkorting.VoegNachtKortingToe(aantal2, korting2);
        }

        [TestMethod, ExpectedException(typeof(ArgumentException))]
        public void VoegNachtKortingToeAantalNachtenKleinerKortingTeGroot()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal1 = 10;
            double korting1 = 10.00;
            int aantal2 = 4;
            double korting2 = 15.00;
            nachtkorting.VoegNachtKortingToe(aantal1, korting1);
            nachtkorting.VoegNachtKortingToe(aantal2, korting2);
        }

        [TestMethod]
        public void KortingenVanKleinNaarGroot()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 10.00;
            int aantal = 8;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            nachtkorting.VoegNachtKortingToe(aantal / 2, korting / 2);
            Assert.AreEqual(nachtkorting.Kortingen[0], korting / 2);
        }

        [TestMethod]
        public void AantallenVanKleinNaarGroot()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 10.00;
            int aantal = 8;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            nachtkorting.VoegNachtKortingToe(aantal / 2, korting / 2);
            Assert.AreEqual(nachtkorting.AantalNachten[0], aantal / 2);
        }

        [TestMethod]
        public void VerwijderNachtKortingAantalVerwijderdUitLijst()
        {
            nachtkorting = new NachtKorting("Test");
            int aantal = 10;
            double korting = 10.00;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            //nachtkorting.VoegNachtKortingToe(aantal * 2, korting * 2);
            nachtkorting.VerwijderNachtKorting(aantal, korting);
            Assert.IsFalse(nachtkorting.AantalNachten.Contains(aantal));
        }

        [TestMethod]
        public void VerwijderNachtKortingKortingVerwijderdUitLijst()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 10.00;
            int aantal = 7;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            nachtkorting.VoegNachtKortingToe(aantal * 2, korting * 2);
            nachtkorting.VerwijderNachtKorting(aantal, korting);
            Assert.IsFalse(nachtkorting.Kortingen.Contains(korting));
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VerwijderNachtKortingAantalNietInAantallen()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 10.00;
            int aantal = 7;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            nachtkorting.VerwijderNachtKorting(8, 10.00);
        }

        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void VerwijderNachtKortingKortingNietInKortingen()
        {
            nachtkorting = new NachtKorting("Test");
            double korting = 10.00;
            int aantal = 7;
            nachtkorting.VoegNachtKortingToe(aantal, korting);
            nachtkorting.VerwijderNachtKorting(7, 11.00);
        }

        [TestMethod]
        public void AantalGeeftCorrecteKorting()
        {
            nachtkorting = new NachtKorting("Test");
            nachtkorting.AantalNachten.Add(7);
            nachtkorting.AantalNachten.Add(10);
            nachtkorting.Kortingen.Add(10.00);
            nachtkorting.Kortingen.Add(12.50);
            Assert.AreEqual(10.00, nachtkorting.KortingVoorAantal(7));
        }
    }
}
