using Newtonsoft.Json;
using System;

namespace Covid19
{
    public class Case
    {
        [JsonProperty("NIS5")]
        public string NISCode { get; set; } // alfanumerieke code voor geografisch gebied in België
        [JsonProperty("DATE")]
        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime Date { get; set; }
        [JsonProperty("TX_DESCR_NL")]
        public string Municipality_NL { get; set; }
        [JsonProperty("TX_DESCR_FR")]
        public string Municipality_FR { get; set; }
        [JsonProperty("TX_ADM_DSTR_DESCR_NL")]
        public string AdministrativeDistrict_NL { get; set; }
        [JsonProperty("TX_ADM_DSTR_DESCR_FR")]
        public string AdministrativeDistrict_FR { get; set; }
        [JsonProperty("PROVINCE")]
        public string Province { get; set; }
        [JsonProperty("REGION")]
        public string Region { get; set; }
        [JsonProperty("CASES")]
        [JsonConverter(typeof(CustomCasesConverter))]
        public int NumberOfCases { get; set; }

        // Override Equals and GetHashCode as we're trying to Assert equality of List<Case> in Unit test
        public override bool Equals(object obj)
        {
            return obj is Case @case &&
                   NISCode == @case.NISCode &&
                   Date == @case.Date &&
                   Municipality_NL == @case.Municipality_NL &&
                   Municipality_FR == @case.Municipality_FR &&
                   AdministrativeDistrict_NL == @case.AdministrativeDistrict_NL &&
                   AdministrativeDistrict_FR == @case.AdministrativeDistrict_FR &&
                   Province == @case.Province &&
                   Region == @case.Region &&
                   NumberOfCases == @case.NumberOfCases;
        }

        public override int GetHashCode()
        {
            HashCode hash = new HashCode();
            hash.Add(NISCode);
            hash.Add(Date);
            hash.Add(Municipality_NL);
            hash.Add(Municipality_FR);
            hash.Add(AdministrativeDistrict_NL);
            hash.Add(AdministrativeDistrict_FR);
            hash.Add(Province);
            hash.Add(Region);
            hash.Add(NumberOfCases);
            return hash.ToHashCode();
        }
    }
}