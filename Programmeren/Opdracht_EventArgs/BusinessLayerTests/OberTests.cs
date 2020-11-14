using Microsoft.VisualStudio.TestTools.UnitTesting;
using BusinessLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Tests
{
    [TestClass()]
    public class OberTests
    {
        [TestMethod]
        public void MaakNieuweOber()
        {
            var naam = "Jacques";
            var ober = new Ober(naam);
            Assert.AreEqual(ober.Naam, naam);
        }
    }
}