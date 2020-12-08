using BusinessLayer.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayerTests
{
    [TestClass]
    public class KlantTests
    {
        [TestMethod]
        public void MaakKlantNaamEnAdresValide()
        {
            string naam = "Piet";
            string adres = "Kerkstraat 10, 9000 Gent";
            Klant actual = new Klant(naam, adres);
            Assert.IsNotNull(actual);
        }
    }
}
