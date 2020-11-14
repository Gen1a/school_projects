using BusinessLayer;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BusinessLayer.Tests
{
    [TestClass]
    public class KlantTests
    {
        [TestMethod]
        public void MaakNieuweKlant()
        {
            var naam = "Jef";
            var klant = new Klant(naam);
            Assert.AreEqual(klant.Naam, naam);
        }
    }
}