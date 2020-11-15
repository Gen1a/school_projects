using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;

namespace Opdracht_FileIO
{
    class Program
    {
        static void Main(string[] args)
        {
            // Check args length
            if (args.Length != 5)
            {
                Console.WriteLine("Error");
                Console.WriteLine("Usage: <path of zip file> <path extraction folder> <name extraction folder> " +
                    "<path results folder> <name results folder>");
                // Terminate process
                Environment.Exit(1);
            }

            // Check args validity
            string zipPath = "", inputPath = "", outputPath = "";
            try
            {
                zipPath = Path.GetFullPath(args[0]);
                inputPath = Path.GetFullPath(args[1]);
                outputPath = Path.GetFullPath(args[3]);
                // Check if directory exists
                if (!Directory.Exists(inputPath))
                {
                    Console.WriteLine("Error: input path doesn't exist yet. Please try again with an already existing path.");
                }
                if (!Directory.Exists(outputPath))
                {
                    Console.WriteLine("Error: output path doesn't exist yet. Please try again with an already existing path.");
                }
                // Create input folder
                inputPath = Path.Join(inputPath, args[2]);
                Directory.CreateDirectory(inputPath);
                // Create results output folder
                outputPath = Path.Join(outputPath, args[4]);
                Directory.CreateDirectory(outputPath);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
                // Terminate process
                Environment.Exit(1);
            }

            // Extract zip file to specified input folder
            ZipFile.ExtractToDirectory(zipPath, inputPath, true);
            // Check if directory contains .cs files
            string[] csFiles = null;
            try
            {
                csFiles = Directory.GetFiles(inputPath, "*.cs");
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                // Terminate process
                Environment.Exit(1);
            }
            if (csFiles.Length == 0)
            {
                // block which will enumerate over folders inside input folder
                List<string> dirs = new List<string>(Directory.EnumerateDirectories(inputPath));
                // Enumerate over directories inside input folder
                foreach (string dir in dirs)
                {
                    csFiles = Directory.GetFiles(dir, "*.cs");
                    // Enumerate over .cs files inside folder
                    foreach (string file in csFiles)
                    {
                        // Perform CodeFileInfo tasks
                        FileInfo fi = new FileInfo(file);
                        CodeFileInfo cfi = new CodeFileInfo();
                        cfi.WriteCodeFileInfo(zipPath, outputPath, cfi.GetCodeFileInfo(fi));
                        // Perform ClassInfo tasks
                        ClassInfo ci = new ClassInfo();
                        string code = ci.ConvertFileToString(fi);
                        ci = ci.GetClassInfo(code);
                        ci.PrintToConsole();
                        ci.WriteClassInfo(zipPath, outputPath);
                    }
                }
            }
            else
            {
                // block which will enumerate .cs files directly inside input folder
                csFiles = Directory.GetFiles(inputPath, "*.cs");
                // Enumerate over .cs files inside folder
                foreach (string file in csFiles)
                {
                    // Perform CodeFileInfo tasks
                    FileInfo fi = new FileInfo(file);
                    CodeFileInfo cfi = new CodeFileInfo();
                    cfi.WriteCodeFileInfo(zipPath, outputPath, cfi.GetCodeFileInfo(fi));
                    // Perform ClassInfo tasks
                    ClassInfo ci = new ClassInfo();
                    string code = ci.ConvertFileToString(fi);
                    ci = ci.GetClassInfo(code);
                    ci.PrintToConsole();
                    ci.WriteClassInfo(zipPath, outputPath);
                }
            }
        }
    }
}