using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Xml.Serialization;

namespace Covid19.Tests
{
    public class Exporter
    {
        /// <summary>
        /// Serializes a List of Mortality objects and writes them to XML file with default encoding and buffer size.
        /// </summary>
        /// <param name="collection"></param>
        /// <param name="fileName"></param>
        public void WriteXmlFile(List<Mortality> collection, string fileName)
        {
            XmlSerializer xmls = new XmlSerializer(typeof(List<Mortality>));
            using (TextWriter writer = new StreamWriter(fileName))
            {
                xmls.Serialize(writer, collection);
            }
        }

        /// <summary>
        /// Serializes a List of Mortality objects and writes them to JSON file in utf-8 encoded text.
        /// </summary>
        /// <param name="collection"></param>
        /// <param name="fileName"></param>
        public void WriteJsonFile(List<Mortality> collection, string fileName)
        {
            using (StreamWriter writer = File.CreateText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(writer, collection);
            }
        }

        /// <summary>
        /// Serializes a List of Case objects and writes them to XML file with default encoding and buffer size.
        /// </summary>
        /// <param name="collection"></param>
        /// <param name="fileName"></param>
        public void WriteXmlFile(List<Case> collection, string fileName)
        {
            XmlSerializer xmls = new XmlSerializer(typeof(List<Case>));
            using (TextWriter writer = new StreamWriter(fileName))
            {
                xmls.Serialize(writer, collection);
            }
        }

        /// <summary>
        /// Serializes a List of Case objects and writes them to JSON file in utf-8 encoded text.
        /// </summary>
        /// <param name="collection"></param>
        /// <param name="fileName"></param>
        public void WriteJsonFile(List<Case> collection, string fileName)
        {
            using (StreamWriter writer = File.CreateText(fileName))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(writer, collection);
            }
        }
    }
}