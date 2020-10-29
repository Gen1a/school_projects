using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace Covid19
{
    public class Mortality
    {
        [JsonProperty("DATE")]
        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime Date { get; set; }
        [JsonProperty("REGION")]
        public string Region { get; set; }
        [JsonProperty("AGEGROUP")]
        public string AgeGroup { get; set; }
        [JsonProperty("SEX")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Sex Sex { get; set; }
        [JsonProperty("DEATHS")]
        public int DeathCount { get; set; }

        // Override Equals and GetHashCode as we're trying to Assert equality of List<Mortality> in Unit test
        public override bool Equals(object obj)
        {
            return obj is Mortality mortality &&
                   Date == mortality.Date &&
                   Region == mortality.Region &&
                   AgeGroup == mortality.AgeGroup &&
                   Sex == mortality.Sex &&
                   DeathCount == mortality.DeathCount;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Date, Region, AgeGroup, Sex, DeathCount);
        }
    }
}