using System;
using System.Collections.Generic;

namespace GO5.Scheepvaart.Business.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            //Sleepboot test = new Sleepboot("Sleepboot", 1.0, 1.0, 1.0);
            //Console.WriteLine(test.Naam);

            //Olietanker test2 = new Olietanker("Olietanker", 1.0, 1.0, 1.0, 1m, 1.0, Olietanker.OlietankerLading.olie);
            //Console.WriteLine(test2.Naam);

            Rederij rederij = new Rederij();
            Vloot vloot = new Vloot("Vloot");
            Vloot vloot1 = new Vloot("Vloot1");
            Vloot vloot2 = new Vloot("Vloot2");
            Vloot vloot3 = new Vloot("Vloot3");
            Schip schip = new Containerschip("Containerschip", 1.0, 1.0, 19.0, 1, 100m);
            Schip schip2 = new RoRoschip("RoRoschip", 1.0, 1.0, 15.0, 1, 1, 100m);
            Schip schip3 = new Olietanker("Olietanker", 1.0, 1.0, 10.0, 100m, 111.0, Olietanker.OlietankerLading.diesel);
            Schip schip4 = new Gastanker("Gastanker", 1.0, 1.0, 1.0, 100m, 1.0, Gastanker.GastankerLading.amoniak);
            vloot.VoegSchipToe(schip);
            vloot.VoegSchipToe(schip4);
            vloot1.VoegSchipToe(schip2);
            vloot2.VoegSchipToe(schip3);
            rederij.VoegVlootToe(vloot);
            rederij.VoegVlootToe(vloot1);
            rederij.VoegVlootToe(vloot2);
            List<double> tonnage = rederij.GeefTonnagePerVloot();
            foreach (double d in tonnage)
            {
                Console.WriteLine($"{d}");
            }
            double test = rederij.GeefTotaalVolumeTankers();
            Console.WriteLine(test);
            //Console.WriteLine(rederij.GeefTotaleCargowaarde());
            Schip sleepboot1 = new Sleepboot("Sleepboot", 1.0, 1.0, 19.0);
            Schip sleepboot2 = new Sleepboot("Sleepboot2", 1.0, 1.0, 19.0);
            Schip sleepboot3 = new Sleepboot("Sleepboot3", 1.0, 1.0, 19.0);
            vloot.VoegSchipToe(sleepboot1);
            vloot2.VoegSchipToe(sleepboot3);
            vloot1.VoegSchipToe(sleepboot2);
            List<Sleepboot> foo = rederij.GeefBeschikbareSleepboten();
            foreach (Sleepboot s in foo)
            {
                Console.WriteLine(s.Naam);
            }
        }
    }
}
