using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Xml.Serialization;

namespace Covid19
{
    public class Importer
    {
        /// <summary>
        /// Deserializes a JSON string containing mortalities with date, age, sex and region 
        /// to List of custom type Mortality.
        /// </summary>
        /// <returns>List of Mortality objects</returns>
        public List<Mortality> GetMortality()
        {
            List<Mortality> jsonList;
            using (WebClient wc = new WebClient())
            {
                var json = wc.DownloadString("https://epistat.sciensano.be/Data/COVID19BE_MORT.json");
                jsonList = JsonConvert.DeserializeObject<List<Mortality>>(json);    
            }
            return jsonList;
        }

        public List<Mortality> ReadMortalityFromXmlFile(string fileName)
        {
            List<Mortality> mortalityList = null;
            XmlSerializer xmls = new XmlSerializer(typeof(List<Mortality>));
            using (StreamReader reader = new StreamReader(fileName))
            {
                mortalityList = (List<Mortality>)xmls.Deserialize(reader);
            }
            return mortalityList;
        }

        public List<Mortality> ReadMortalityFromJsonFile(string fileName)
        {
            List<Mortality> mortalityList;

            using (StreamReader file = File.OpenText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                mortalityList = (List<Mortality>)serializer.Deserialize(file, typeof(List<Mortality>));
            }
            return mortalityList;
        }

        /// <summary>
        /// Deserializes a JSON string containing cases with NISCode, date, municipality, district, province, 
        /// region and number of cases to List of custom type Case.
        /// </summary>
        /// <returns></returns>
        public List<Case> GetCasesByDateAndMunicipality()
        {
            List<Case> jsonList;
            using (WebClient wc = new WebClient())
            {
                var json = wc.DownloadString("https://epistat.sciensano.be/Data/COVID19BE_CASES_MUNI.json");
                jsonList = JsonConvert.DeserializeObject<List<Case>>(json);
            }
            return jsonList;
        }

        public List<Case> ReadCasesFromXmlFile(string fileName)
        {
            List<Case> caseList = null;
            XmlSerializer xmls = new XmlSerializer(typeof(List<Case>));
            using (StreamReader reader = new StreamReader(fileName))
            {
                caseList = (List<Case>)xmls.Deserialize(reader);
            }
            return caseList;
        }

        public List<Case> ReadCasesFromJsonFile(string fileName)
        {
            List<Case> caseList;

            using (StreamReader file = File.OpenText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                caseList = (List<Case>)serializer.Deserialize(file, typeof(List<Case>));
            }
            return caseList;
        }
    }
}
