using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace File_Organizer
{
    internal class Program
    {
        public class directoryObject
        {
            public string folderId { get; set; }
            public string folderName { get; set; }
        }
        static void Main(string[] args)
        {

            string name = Environment.UserName;
            string initial_path = $"C:\\Users\\{name}\\";

            Console.WriteLine("Welcome to the File Organizer CLI\n");
            Console.WriteLine("Here are the directories in your user folder\nOr pick a number to go inside that folder:\n");

            DirectoryInfo dir = new DirectoryInfo(initial_path);
            DirectoryInfo[] dirs = dir.GetDirectories();
            List<directoryObject> directoryList = new List<directoryObject>();

            generateDirectoryList(dirs, directoryList);
            printDirectory(directoryList);

            fileChecking(directoryList, initial_path, dir, dirs);

        }

        public static void fileChecking(List<directoryObject> directoryList, string initial_path, DirectoryInfo dir, DirectoryInfo[] dirs)
        {
            bool filesExist = false;
            string current_path = initial_path;
            //File Checking if it exists in the current directory
            filesExist = Directory.EnumerateFiles(current_path).Any();
            if (filesExist)
            {
                Console.WriteLine("\nFiles exist in the current directory. Do you want to organize the files in this current directory instead? (y/n).\n");
                string input = "";

                while (input != "n")
                {
                    input = Console.ReadLine();
                    if (input == "y")
                    {
                        while (input != "6")
                        {
                            Console.WriteLine("Options:");
                            Console.WriteLine("1. Organize by File Type");
                            Console.WriteLine("2. Organize by Date Modified");
                            Console.WriteLine("3. Organize by Size");
                            Console.WriteLine("5. Display the Files");
                            Console.WriteLine("6. Exit");

                            if (input == "1")
                            {
                                modifyFiles(initial_path, input);
                            }

                            input = Console.ReadLine();
                        }


                        //getFiles(current_path);
                    }
                    else if (input == "n")
                    {
                        if (Directory.EnumerateDirectories(current_path).Any())
                        {
                            Console.WriteLine("\nPlease pick a folder instead\n");
                            printDirectory(directoryList);
                            Console.WriteLine(directoryList.Count() + 1 + ". Back");

                            int[] IDs = new int[directoryList.Count];

                            input = Console.ReadLine();

                            try
                            {
                                if (int.Parse(input) == directoryList.Count() + 1)
                                {
                                    back(initial_path, dir, dirs, directoryList);
                                }
                                else
                                {
                                    foreach (var directory in directoryList)
                                    {
                                        if (directory.folderId == input)
                                        {
                                            newPath(directoryList, input, initial_path, dir, dirs);
                                        }
                                    }
                                }
                            }
                            catch (IOException)
                            {

                                Console.WriteLine("Invalid input");
                            }

                        }

                        else
                        {
                            Console.WriteLine("No other folders inside this directory.\n");
                            Console.WriteLine("Scanning for files...\n");
                            Console.WriteLine(directoryList.Count() + 1 + ". Back");

                            input = Console.ReadLine();
                            if (int.Parse(input) == directoryList.Count() + 1)
                            {
                                back(initial_path, dir, dirs, directoryList);
                            }
                            else
                            {
                                fileChecking(directoryList, initial_path, dir, dirs);
                            }

                        }
                    }
                }
            }
            else
            {
                Console.WriteLine("\nNo other files exist in the current directory");
            }

        }

        public static void printDirectory(List<directoryObject> directoryList)
        {
            foreach (directoryObject folder in directoryList)
            {
                Console.WriteLine($"{folder.folderId}. " + folder.folderName);
            }
        }

        public static void generateDirectoryList(DirectoryInfo[] dirs, List<directoryObject> directoryList)
        {
            //directoryList = new List<directoryObject>();

            int folderId = 1;
            foreach (DirectoryInfo d in dirs)
            {
                if (!d.Name.StartsWith("."))
                {
                    directoryList.Add(new directoryObject { folderId = folderId.ToString(), folderName = d.Name });
                    folderId++;
                }
            }

        }

        public static void newPath(List<directoryObject> directoryList, string input, string initial_path, DirectoryInfo dir, DirectoryInfo[] dirs)
        {

            foreach (var id in directoryList)
            {
                //IDs[int.Parse(id)-1] = int.Parse(id);

                if (id.folderId == input)
                {
                    Console.WriteLine("Entering folder: " + id.folderName + "\n");

                    initial_path = Path.Combine(initial_path, id.folderName);
                    dir = new DirectoryInfo(initial_path);
                    dirs = dir.GetDirectories();
                    directoryList = new List<directoryObject>();

                    generateDirectories(directoryList, dirs);
                    fileChecking(directoryList, initial_path, dir, dirs);

                }

                // Console.WriteLine(directoryList[0].folderName);
            }
        }

        public static void generateDirectories(List<directoryObject> directoryList, DirectoryInfo[] dirs)
        {
            generateDirectoryList(dirs, directoryList);
            printDirectory(directoryList);
            Console.WriteLine(directoryList.Count() + 1 + ". Back");
        }

        public static void back(string initial_path, DirectoryInfo dir, DirectoryInfo[] dirs, List<directoryObject> directoryList)
        {

            DirectoryInfo subfolder = new DirectoryInfo(initial_path);

            initial_path = Path.GetDirectoryName(initial_path);
            dir = new DirectoryInfo(initial_path);
            dirs = dir.GetDirectories();
            directoryList = new List<directoryObject>();

            generateDirectories(directoryList, dirs);
            fileChecking(directoryList, initial_path, dir, dirs);

        }

        public static void modifyFiles(string initial_path, string input)
        {

            string[] files = Directory.GetFiles(initial_path);

            Dictionary<string, string> categories = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
            {
                 // Documents
                { ".pdf", "Documents" },
                { ".docx", "Documents" },
                { ".xlsx", "Documents" },
                // Images
                { ".jpg", "Images" },
                { ".png", "Images" },
                { ".gif", "Images" },
                // Media
                { ".mp4", "Videos" },
                { ".mov", "Videos" },
                { ".mp3", "Music" },
                // Compressed
                { ".zip", "Archives" },
                { ".rar", "Archives" }
            };



            if (input == "1")
            {
                foreach (var category in categories.Values.Distinct())
                {
                    string categoryPath = Path.Combine(initial_path, category);

                    if (!Directory.Exists(categoryPath))
                    {
                        Directory.CreateDirectory(categoryPath);
                        Console.WriteLine("Folders have been created");
                    }

                }

                foreach (string file in files)
                {
                    string extension = Path.GetExtension(file);
                    string fileName = Path.GetFileName(file);

                    if (categories.TryGetValue(extension, out string category))
                    {
                        string destinationFolder = Path.Combine(initial_path, category);
                        string destinationFile = Path.Combine(destinationFolder, fileName);

                        try
                        {

                            File.Move(file, destinationFile);
                            Console.WriteLine($"Moved: {fileName} to {category}/");

                        }

                        catch (IOException)
                        {
                            Console.WriteLine($"File {fileName} already exists in {category}/. Skipping...");
                        }
                    }
                    else
                    {
                        string otherFolder = Path.Combine(initial_path, "Other");
                        Directory.CreateDirectory(otherFolder);

                        string destinationFile = Path.Combine(otherFolder, fileName);

                        File.Move(file, destinationFile);
                        Console.WriteLine($"Moved: {fileName} to Other/");

                    }
                }

                if (input == "5")
                {
                    Console.WriteLine($"{"Name",-30} | {"Last Modified",-20} | {"Size (KB)",10}");

                    foreach (string file in files)
                    {

                        FileInfo info = new FileInfo(file);
                        string fileName = info.Name;
                        DateTime filelastModified = info.LastWriteTime;

                        double sizeInKB = info.Length / 1024.0;

                        Console.WriteLine(new string('-', 64));

                        Console.WriteLine(
                        $"{fileName,-30} | " +
                        $"{filelastModified,-20} | " +
                        $"{sizeInKB,10:N2}"

                    );

                    }
                }

            }

        }
    }
}