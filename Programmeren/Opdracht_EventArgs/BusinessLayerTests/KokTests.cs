using Microsoft.VisualStudio.TestTools.UnitTesting;
using BusinessLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Tests
{
    [TestClass()]
    public class KokTests
    {
        [TestMethod()]
        public void MaakNieuweKok()
        {
            var naam = "Jef";
            var kok = new Kok(naam);
            Assert.AreEqual(kok.Naam, naam);
        }
    }
}