using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Opdracht_Linq
{
    public class AdressenInfo
    {
        private string _file;
        private List<Adres> _adressenData;
        public void Initialize()
        {
            string dataPath = @"C:\Users\frede\source\repos\Graduaat\Programmeren\Opdracht_Linq\adresInfo.txt";
            _file = dataPath;
            ConvertDataToObjects();
        }

        private void ConvertDataToObjects()
        {
            _adressenData = new List<Adres>();
            using (StreamReader sr = new StreamReader(_file))
            {
                string line = "";
                while ((line = sr.ReadLine()) != null)
                {
                    string[] adres = line.Split(',');
                    Adres a = new Adres()
                    {
                        Provincie = adres[0],
                        Gemeente = adres[1],
                        Straat = adres[2]
                    };
                    _adressenData.Add(a);
                }
            }
        }

        //public string GetFileAsText()
        //{
        //    string output = "";

        //    if (File.Exists(_file))
        //    {
        //        output = File.ReadAllText(_file);
        //    }
        //    // return data or empty string if file doesn't exist
        //    return output;
        //}

        public void GetProvincesAlphabetically()
        {
            var output = _adressenData.GroupBy(x => x.Provincie).OrderBy(x => x.Key);
            Console.WriteLine("Lijst met de provincienamen, alfabetisch gesorteerd:");
            foreach (var adres in output)
            {
                Console.WriteLine("    - " + adres.Key);
            }
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetStreetsForCity(string city)
        {
            // convert string to right format
            city = ConvertToValidFormat(city);
            var output = _adressenData.Where(x => x.Gemeente == city);
            Console.WriteLine($"Lijst van straatnamen voor {city}:");
            foreach (var adres in output)
            {
                Console.WriteLine("    - " + adres.Straat);
            }
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetMostCommonStreet()
        {
            var street = _adressenData
                .GroupBy(x => x.Straat)
                .Select((x, straat) => new
                {
                    aantal = x.Count(),
                    straat = x.Key
                })
                .OrderByDescending(x => x.aantal).First().straat;
            var occurences = _adressenData.Where(x => x.Straat == street).OrderBy(x => x.Provincie).ThenBy(x => x.Gemeente);
            Console.WriteLine($"Meest voorkomende straatnaam: {street}");
            Console.WriteLine("Komt voor in volgende gemeenten:");
            foreach (var item in occurences)
            {
                Console.WriteLine($"    - {item.Provincie} - {item.Gemeente} - {item.Straat}");
            }
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetXAmountOfMostCommonStreet(int aantal)
        {
            var query = _adressenData
                .GroupBy(x => x.Straat)
                .Select((x, straat) => new
                {
                    aantal = x.Count(),
                    straat = x.Key
                })
                .Where(x => x.aantal == aantal);
            if (query.Count() == 0)
            {
                Console.WriteLine($"Geen straatnaam gevonden die {aantal} keer voorkomt.");                
            }
            else
            {
                Console.WriteLine($"{(query.Count() <= 1 ? "Straat" : "Straten")} die {aantal} keer {(query.Count() <= 1 ? "voorkomt" : "voorkomen")}:");
                foreach (var street in query)
                {
                    Console.WriteLine($"    - {street.straat}");
                }
            }
            
            // Print overview
            if (query.Count() != 0)
            {
                Console.WriteLine("\nGedetailleerd overzicht:");
                foreach (var item in query)
                {
                    var occurences = _adressenData.Where(x => x.Straat == item.straat).OrderBy(x => x.Provincie).ThenBy(x => x.Gemeente);
                    foreach (var adres in occurences)
                    {
                        Console.WriteLine($"    - {adres.Provincie} - {adres.Gemeente} - {adres.Straat}");
                    }
                }
            }
            Console.WriteLine("----------------------------------------------------");
        }
        
        public void GetCommonStreetsForCities(string city1, string city2)
        {
            // convert string to right format
            city1 = ConvertToValidFormat(city1);
            city2 = ConvertToValidFormat(city2);

            var streets1 = _adressenData.Where(x => x.Gemeente == city1);
            var streets2 = _adressenData.Where(x => x.Gemeente == city2);
            var commonStreets = streets1.Select(x => x.Straat).Intersect(streets2.Select(x => x.Straat));
            Console.WriteLine($"Gemeenschappelijke straten voor {city1} en {city2}:");
            foreach (string s in commonStreets)
            {
                Console.WriteLine("    - " + s);
            }
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetUniqueStreetsForCity(string city)
        {
            // convert string to right format
            city = ConvertToValidFormat(city);
            var streets = _adressenData.Where(x => x.Gemeente == city).Select(x => x.Straat);
            var unique = streets.Except(_adressenData.Where(x => x.Gemeente != city).Select(x => x.Straat));
            Console.WriteLine($"Unieke straten in {city}:");
            foreach (var s in unique)
            {
                Console.WriteLine("    - " + s);
            }
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetCityWithHighestAmountOfStreets()
        {
            var query = _adressenData
                .GroupBy(x => x.Gemeente)
                .Select((x, adres) => new
                {
                    aantal = x.Count(),
                    gemeente = x.Key
                })
                .OrderByDescending(x => x.aantal)
                .First().gemeente;
            Console.WriteLine($"Gemeente met grootste aantal straten: {query}");
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetLongestStreet()
        {
            var query = _adressenData.OrderByDescending(x => x.Straat.Length).First();
            Console.WriteLine($"Langste straatnaam: {query.Straat}");
            Console.WriteLine($"Gelegen in {query.Gemeente} ({query.Provincie})");
            Console.WriteLine("----------------------------------------------------");
        }

        public void GetUniqueStreets()
        {
            var uniqueStreets = _adressenData
                .GroupBy(x => x.Straat)
                .Select((x, straat) => new
                {
                    aantal = x.Count(),
                    straat = x.Key
                })
                .Where(x => x.aantal == 1);
            Console.WriteLine(uniqueStreets.Count());
            Console.WriteLine("Lijst met unieke straatnamen:");
            foreach (var street in uniqueStreets)
            {
                var adres = _adressenData.Where(x => x.Straat == street.straat).First();
                Console.WriteLine($"    - {adres.Provincie} - {adres.Gemeente} - {adres.Straat}");
            }
            Console.WriteLine("----------------------------------------------------");
        }

        static string ConvertToValidFormat(string s)
        {
            return s.First().ToString().ToUpper() + s.Substring(1).ToLower();
        }
    }
}
