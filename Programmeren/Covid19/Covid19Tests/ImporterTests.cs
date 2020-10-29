using Microsoft.VisualStudio.TestTools.UnitTesting;
using Covid19;
using System;
using System.Collections.Generic;
using System.Text;

namespace Covid19.Tests
{
    [TestClass()]
    public class ImporterTests
    {
        private Importer _importer;
        private Exporter _exporter;

        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            // Executes once before the test run. (Optional)
        }

        [ClassInitialize]
        public static void TestFixtureSetup(TestContext context)
        {
            // Executes once for the test class. (Optional)
        }

        [TestInitialize]
        public void Setup()
        {
            // Runs before each test. (Optional)
            _importer = new Importer();
            _exporter = new Exporter();
        }

        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            // Executes once after the test run. (Optional)
        }

        [ClassCleanup]
        public static void TestFixtureTearDown()
        {
            // Runs once after all tests in this class are executed. (Optional)
            // Not guaranteed that it executes instantly after all tests from the class.
        }

        [TestCleanup]
        public void TearDown()
        {
            // Runs after each test. (Optional)
        }
        [TestMethod()]
        public void GetMortalityTest()
        {
            // Act
            var expected = _importer.GetMortality();
            _exporter.WriteXmlFile(expected, @"mortality.xml");
            _exporter.WriteJsonFile(expected, @"mortality.json");
            var xmlActual = _importer.ReadMortalityFromXmlFile(@"mortality.xml");
            var jsonActual = _importer.ReadMortalityFromJsonFile(@"mortality.json");
            // Assert
            CollectionAssert.AreEquivalent(expected, xmlActual);
            CollectionAssert.AreEquivalent(expected, jsonActual);
        }

        [TestMethod]
        public void GetConfirmedCasesTest()
        {
            var expected = _importer.GetCasesByDateAndMunicipality();
            _exporter.WriteXmlFile(expected, @"cases.xml");
            _exporter.WriteJsonFile(expected, @"cases.json");
            var xmlActual = _importer.ReadCasesFromXmlFile(@"cases.xml");
            var jsonActual = _importer.ReadCasesFromJsonFile(@"cases.json");
            CollectionAssert.AreEquivalent(expected, xmlActual);
            CollectionAssert.AreEquivalent(expected, jsonActual);
        }
    }
}