using System;
using Opdracht_Linq;

namespace ConsoleApp
{
    class Program
    {
        static void Main()
        {
            AdressenInfo app = new AdressenInfo();
            app.Initialize();
            app.GetProvincesAlphabetically();
            Console.ReadLine();
            app.GetStreetsForCity("Gent");
            Console.ReadLine();
            app.GetMostCommonStreet();
            Console.ReadLine();
            app.GetXAmountOfMostCommonStreet(52);
            Console.ReadLine();
            app.GetCommonStreetsForCities("Gent", "Wellen");
            Console.ReadLine();
            app.GetUniqueStreetsForCity("Brakel");
            Console.ReadLine();
            app.GetCityWithHighestAmountOfStreets();
            Console.ReadLine();
            app.GetLongestStreet();
            Console.ReadLine();
            app.GetUniqueStreets();
        }
    }
}
