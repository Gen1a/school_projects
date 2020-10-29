using Newtonsoft.Json;
using System;

namespace Covid19
{
    public class CustomCasesConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return (objectType == (typeof(string)));
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.String)
            {
                if ((string)reader.Value == "<5")
                {
                    return 2;
                }
                else
                {
                    return int.Parse((string)reader.Value);
                }
            }
            throw new JsonSerializationException("Aantal cases kon niet gedeserializeerd worden.");
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            int aantal = (int)value;
            if (aantal == 2)
            {
                writer.WriteValue("<5");
            }
            else
            {
                writer.WriteValue(aantal.ToString());
            }
        }
    }
}
