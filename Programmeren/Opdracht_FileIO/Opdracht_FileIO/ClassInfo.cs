using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Opdracht_FileIO
{
    public class ClassInfo
    {
        public string Name { get; set; }
        public string NameSpace { get; set; }
        public List<string> Usings { get; set; } = new List<string>();
        public List<string> Constructors { get; set; } = new List<string>();
        public List<string> Methods { get; set; } = new List<string>();
        public List<string> Properties { get; set; } = new List<string>();
        public List<string> Variables { get; set; } = new List<string>();
        public List<string> Inherits { get; set; } = new List<string>();    // inherited classes/interfaces
        public string ConvertFileToString(FileInfo fi)
        {
            string code = "";
            using (StreamReader sr = fi.OpenText())
            {
                code = sr.ReadToEnd().Replace('\r', ' ').Replace('\n', ' ');
            }
            return code;
        }
        public ClassInfo GetClassInfo(string code)
        {
            ClassInfo ci = new ClassInfo();
            // Read using statements
            if (code.Contains("using"))
            {
                while (code.Contains("using"))
                {
                    int startIndex = code.IndexOf("using");
                    int endIndex = code.IndexOf(";");
                    int length = endIndex - startIndex + 1 - 6;
                    ci.Usings.Add(code.Substring(startIndex + 6, length - 1));
                    code = code.Remove(0, (endIndex - startIndex + 1)).Trim();
                }
            }
            // Read namespace
            ci.NameSpace = code.Substring(code.IndexOf("namespace") + 10, (code.IndexOf("{") - 1 - 10));
            code = code.Remove(0, code.IndexOf("{") + 1).Trim();
            // Read class name
            ci.Name = code.Substring(code.IndexOf("class") + 6).Split(' ')[0];
            code = code.Remove(0, code.IndexOf(ci.Name) + ci.Name.Length + 1).Trim();
            // Read inherits, if any
            if (code.StartsWith(":"))
            {
                string[] inher = code.Substring(1, code.IndexOf("{") - 2).Split(",");
                foreach (string s in inher)
                {
                    ci.Inherits.Add(s.Trim());
                }
                code = code.Remove(0, (code.IndexOf(inher[inher.Length - 1]) + inher[inher.Length - 1].Length)).Trim();
            }
            else
            {
                code = code.Remove(0, 1).Trim(); // removes { if no inherit
            }
            // Read code blocks (variables, properties, methods)
            while (code.Contains(';') || code.Contains('{') ||code.Contains('('))
            {
                // ; => variable, { => property, ( => method
                int[] indexes = new int[] { code.IndexOf(";"), code.IndexOf("{", 1), code.IndexOf("(") };
                /* Check if variable is of the format 'private List<Klant> _klanten = new List<Klant>();'
                 * which will result in wrong evaluation
                 */
                if (code.ElementAt(indexes[2] + 1) == ')')
                {
                    // set other indexes to maxValue
                    indexes[1] = int.MaxValue;
                    indexes[2] = int.MaxValue;
                }
                int minimum = indexes.Min();
                // if its a variable
                if (Array.IndexOf(indexes, minimum) == 0)
                {
                    string tempVar = code.Substring(0, indexes[0]).Split(' ').Last();
                    ci.Variables.Add(tempVar);
                    code = code.Remove(0, indexes[0] + 1).Trim();
                }
                // if its a property
                else if (Array.IndexOf(indexes, minimum) == 1)
                {
                    string tempProp = code.Substring(0, indexes[1]).Split(' ', StringSplitOptions.RemoveEmptyEntries).Last();
                    ci.Properties.Add(tempProp);
                    code = ci.ReadUntilNextMatchingBrace(code);
                }
                // if its a method
                else if (Array.IndexOf(indexes, minimum) == 2)
                {
                    string tempMeth = code.Substring(0, indexes[2]).Split(' ', StringSplitOptions.RemoveEmptyEntries).Last();
                    // Check if constructor
                    if (ci.Name == tempMeth)
                    {
                        int indexCtor = code.IndexOf(tempMeth);
                        ci.Constructors.Add(code.Substring(indexCtor, (code.IndexOf(")") - indexCtor) + 1));
                        code = ci.ReadUntilNextMatchingBrace(code);
                    }
                    // if normal method
                    else
                    {
                        int indexMeth = code.IndexOf(tempMeth);
                        ci.Methods.Add(code.Substring(indexMeth, (code.IndexOf(")") - indexMeth) + 1));
                        code = ci.ReadUntilNextMatchingBrace(code);
                    }
                }
            }
            return ci;
        }

        // Method which removes code from string, from opening bracket until matching closing bracket
        private string ReadUntilNextMatchingBrace(string code)
        {
            int nOpen = 0;
            int indexOpen;
            int indexClose;
            do
            {
                indexOpen = code.IndexOf("{");
                if (indexOpen == -1) indexOpen = code.Length;
                indexClose = code.IndexOf("}");
                if (indexOpen < indexClose)
                {
                    nOpen++;
                    code = code.Substring(indexOpen + 1);
                }
                if (indexOpen > indexClose)
                {
                    nOpen--;
                    code = code.Substring(indexClose + 1);
                }
            } while (nOpen > 0);

            return code;
        }

        public override string ToString()
        {
            string s = "";
            s += $"Namespace: {NameSpace}\nNaam: {Name}\n";
            foreach (string c in Usings) s += $"Using: using {c}\n";
            foreach (string c in Inherits) s += $"Inherit: {c}\n";
            foreach(string c in Variables) s += $"Variable: {c}\n";
            foreach(string c in Properties) s += $"Property: {c}\n";
            foreach (string c in Constructors) s += $"Constructor: {c}\n";
            foreach (string c in Methods) s += $"Method: {c}\n";
            s += "------------------------------------------------------------";
            return s;
        }

        public void PrintToConsole()
        {
            Console.WriteLine(this.ToString());
        }
        public void WriteClassInfo(string zipPath, string outputPath)
        {
            string resultFile = $@"{outputPath}\ClassInfo{Path.GetFileNameWithoutExtension(zipPath)}.txt";
            using (StreamWriter sw = new StreamWriter(resultFile, true))   // false => creates new file or overwrites file if it exists
            {
                string info = this.ToString();
                sw.WriteLine(info);
            }
        }
    }
}
