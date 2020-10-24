using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace GO5.Scheepvaart.Business.Test
{
    [TestClass]
    public class SchipTest
    {
        private Schip schip;
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakContainerschipAantalContainersKleinerDanNul()
        {
            schip = new Containerschip("Test", 1.0, 1.0, 1.0, -1, 1m);
        }
        [TestMethod]
        public void MaakContainerschipAantalContainersNul()
        {
            schip = new Containerschip("Test", 1.0, 1.0, 1.0, 0, 1m);
            Assert.AreEqual(0, ((Containerschip)schip).AantalContainers);
        }
        [TestMethod]
        public void MaakContainerschipAantalContainersGroterDanNul()
        {
            schip = new Containerschip("Test", 1.0, 1.0, 1.0, 10, 1m);
            Assert.AreEqual(10, ((Containerschip)schip).AantalContainers);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakContainerschipCargowaardeKleinerDanNul()
        {
            schip = new Containerschip("Test", 1.0, 1.0, 1.0, 0, -1m);
        }
        [TestMethod]
        public void MaakContainerschipCargowaardeNul()
        {
            schip = new Containerschip("Test", 1.0, 1.0, 1.0, 0, 0m);
            Assert.AreEqual(0, ((Containerschip)schip).Cargowaarde);
        }
        [TestMethod]
        public void MaakContainerschipCargowaardeGroterDanNul()
        {
            schip = new Containerschip("Test", 1.0, 1.0, 1.0, 0, 1m);
            Assert.AreEqual(1m, ((Containerschip)schip).Cargowaarde);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakRoRoschipAantalAutosKleinerDanNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, -1, 1, 1m);
        }
        [TestMethod]
        public void MaakRoRoschipAantalAutosNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 0, 1, 1m);
            Assert.AreEqual(0, ((RoRoschip)schip).AantalAutos);
        }
        [TestMethod]
        public void MaakRoRoschipAantalAutosGroterDanNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, 1, 1m);
            Assert.AreEqual(1, ((RoRoschip)schip).AantalAutos);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakRoRoschipAantalTrucksKleinerDanNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, -1, 1m);
        }
        [TestMethod]
        public void MaakRoRoschipAantalTrucksNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, 0, 1m);
            Assert.AreEqual(0, ((RoRoschip)schip).AantalTrucks);
        }
        [TestMethod]
        public void MaakRoRoschipAantalTrucksGroterDanNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, 1, 1m);
            Assert.AreEqual(1, ((RoRoschip)schip).AantalTrucks);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakRoRoschipCargowaardeKleinerDanNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, 1, -1m);
        }
        [TestMethod]
        public void MaakRoRoschipCargowaardeNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, 1, 0m);
            Assert.AreEqual(0, ((RoRoschip)schip).Cargowaarde);
        }
        [TestMethod]
        public void MaakRoRoschipCargowaardeGroterDanNul()
        {
            schip = new RoRoschip("Test", 1.0, 1.0, 1.0, 1, 1, 1m);
            Assert.AreEqual(1m, ((RoRoschip)schip).Cargowaarde);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakHavenGeenLegeNaam()
        {
            Haven haven = new Haven("");
        }
        [TestMethod]
        public void MaakHavenGentMaaktNieuweHaven()
        {
            Haven haven = new Haven("Gent");
            Assert.AreEqual("Gent", haven.Naam);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakCruiseschipGeenHavensInTraject()
        {
            Traject traject = new Traject();
            schip = new Cruiseschip("Test", 1.0, 1.0, 1.0, 1, traject);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakCruiseschipEenHavenInTraject()
        {
            Haven haven = new Haven("Gent");
            Traject traject = new Traject();
            traject.VoegToe(haven);
            schip = new Cruiseschip("Test", 1.0, 1.0, 1.0, 1, traject);
        }
        [TestMethod]
        public void MaakCruiseschipMeerdereHavensInTraject()
        {
            Haven haven = new Haven("Gent");
            Haven haven2 = new Haven("Antwerpen");
            Haven haven3 = new Haven("Oostende");
            Traject traject = new Traject();
            traject.VoegToe(haven);
            traject.VoegToe(haven2);
            traject.VoegToe(haven3);
            schip = new Cruiseschip("Test", 1.0, 1.0, 1.0, 1, traject);
            Assert.AreEqual(3, ((Cruiseschip)schip).Traject.Count);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakVeerbootGeenHavensInTraject()
        {
            Traject traject = new Traject();
            schip = new Veerboot("Test", 1.0, 1.0, 1.0, 1, traject);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakVeerbootEenHavenInTraject()
        {
            Haven haven = new Haven("Gent");
            Traject traject = new Traject();
            traject.VoegToe(haven);
            schip = new Veerboot("Test", 1.0, 1.0, 1.0, 1, traject);
        }
        [TestMethod, ExpectedException(typeof(ArgumentOutOfRangeException))]
        public void MaakVeerboot4HavensInTraject()
        {
            Haven haven = new Haven("Gent");
            Haven haven2 = new Haven("Antwerpen");
            Haven haven3 = new Haven("Oostende");
            Haven haven4 = new Haven("Zeebrugge");
            Traject traject = new Traject();
            traject.VoegToe(haven);
            traject.VoegToe(haven2);
            traject.VoegToe(haven3);
            traject.VoegToe(haven4);
            schip = new Veerboot("Test", 1.0, 1.0, 1.0, 1, traject);
        }
        [TestMethod]
        public void MaakVeerbootTweeHavensInTraject()
        {
            Haven haven = new Haven("Gent");
            Haven haven2 = new Haven("Antwerpen");
            Traject traject = new Traject();
            traject.VoegToe(haven);
            traject.VoegToe(haven2);
            schip = new Veerboot("Test", 1.0, 1.0, 1.0, 1, traject);
            Assert.AreEqual(2, ((Veerboot)schip).Traject.Count);
        }

        [TestMethod]
        public void MaakOlietankerMetLadingOlie()
        {
            schip = new Olietanker("Test", 1.0, 1.0, 1.0, 1m, 1.0, Olietanker.OlietankerLading.olie);
            Assert.AreEqual(Olietanker.OlietankerLading.olie, ((Olietanker)schip).Lading);
        }

        [TestMethod]
        public void MaakGastankerMetLadingLPG()
        {
            schip = new Gastanker("Test", 1.0, 1.0, 1.0, 1m, 1.0, Gastanker.GastankerLading.LPG);
            Assert.AreEqual(Gastanker.GastankerLading.LPG, ((Gastanker)schip).Lading);
        }
    }
}
