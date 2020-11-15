using System;
using System.IO;
using System.Linq;

namespace Opdracht_FileIO
{
    public class CodeFileInfo
    {
        public CodeFileInfo()
        {
            IsClass = false;
            IsInterface = false;
            LinesOfCode = 0;
            ClassCount = 0;
            InterfaceCount = 0;
        }
        public bool IsClass { get; set; }
        public bool IsInterface { get; set; }
        public string Name { get; set; }
        public string Namespace { get; set; }
        public int LinesOfCode { get; set; }
        public int ClassCount { get; set; }
        public int InterfaceCount { get; set; }
        public FileInfo FileInfo { get; set; }  // holds FileInfo, which acts as a wrapper for a file path
        public override string ToString()
        {
            string s = "";
            if (IsClass) s += "(Class)\n";
            if (IsInterface) s += "(Interface)\n";
            s += $"Namespace: {Namespace}\n" + $"Name: {Name}\n" + $"Lines of Code: {LinesOfCode}\n";
            if (ClassCount > 1 || InterfaceCount > 1)
            {
                s += "Warning: each interface and/or class should be placed in its own seperate file!\n";
            }
            s += "-------------------------------";
            return s;
        }
        public CodeFileInfo GetCodeFileInfo(FileInfo path)
        {
            using (StreamReader sr = path.OpenText())
            {
                CodeFileInfo cfi = new CodeFileInfo();
                cfi.FileInfo = path;
                string line;
                // Read and display lines from the file until the end of the file is reached
                while ((line = sr.ReadLine()) != null)
                {
                    if (line.Trim().Length > 0) cfi.LinesOfCode++;
                    if (line.Contains(" class "))
                    {
                        cfi.IsClass = true;
                        cfi.ClassCount++;
                        if (cfi.ClassCount == 1)
                        {
                            cfi.Name = line
                                .Substring(line.IndexOf("class") + 6)
                                .Trim()
                                .Split(new char[] { ' ', ':', ';', '{' }, StringSplitOptions.None)[0];
                        }
                    }
                    if (line.Contains(" interface "))
                    {
                        cfi.IsInterface = true;
                        cfi.InterfaceCount++;
                        if (cfi.InterfaceCount == 1)
                        {
                            cfi.Name = line
                                .Substring(line.IndexOf("interface") + 10)
                                .Trim()
                                .Split(new char[] { ' ', ':', ';', '{' }, StringSplitOptions.None)[0];
                        }
                    }
                    if (line.Contains("namespace "))
                    {
                        if (line.IndexOf("namespace") != 0)
                        {
                            if (line.ElementAt(line.IndexOf("namespace") - 1) == ' ')
                            {
                                cfi.Namespace = line.Substring(line.IndexOf("namespace") + 10).Trim();
                            }
                        }
                        else
                        {
                            cfi.Namespace = line.Substring(line.IndexOf("namespace") + 10).Trim();
                        }
                    }
                }
                return cfi;
            }
        }

        public void WriteCodeFileInfo(string zipPath, string outputPath, CodeFileInfo cfi)
        {
            string resultFile = $@"{outputPath}\Analyse{Path.GetFileNameWithoutExtension(zipPath)}.txt";
            using (StreamWriter sw = new StreamWriter(resultFile, true))   // false => creates new file or overwrites file if it exists
            {
                string info = cfi.ToString();
                sw.WriteLine(info);
            }
        }
    }
}
