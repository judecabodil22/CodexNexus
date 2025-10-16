# File Organizer CLI

## RUN AT YOUR OWN RISK

## Project Description
The **File Organizer CLI** is a console application built in C# designed to help users manage and organize files within their local directories. It provides an interactive command-line interface to navigate folders and offers initial functionality for automatically sorting files based on their type. The project's goal is to simplify file management by providing organization options like sorting by type, date, or size.

## Current Functionality

The application currently supports the following key features:

### 1. Directory Navigation
* **Initial Path:** Starts navigation in the user's default `C:\Users\<username>\Pictures` folder.
* **Listing Directories:** Displays a numbered list of subdirectories in the current path.
* **Entering Subfolders:** Users can select a number to navigate into a subdirectory (implemented in `newPath`).
* **Going Back:** Users can navigate up to the parent directory using the "Back" option (implemented in `back`).

### 2. File Organization by Type
* **Existence Check:** Detects if files are present in the current directory and prompts the user to organize them.
* **Sorting Logic:** The `modifyFiles` function implements the core file sorting.
    * It defines a mapping of file extensions (e.g., `.pdf`, `.jpg`, `.mp4`) to corresponding target folders (e.g., `Documents`, `Images`, `Videos`).
    * **Folder Creation:** Automatically creates the target folders (`Documents`, `Images`, `Videos`, `Other`, etc.) if they don't exist.
    * **File Movement:** Moves files into their corresponding category folders.
    * **Handling Unmapped Files:** Any file with an extension not defined in the mapping is moved into an **`Other`** folder.
    * **Conflict Handling:** Uses a `try-catch` block to gracefully handle `IOException` if a file with the same name already exists in the destination folder, preventing the program from crashing.

### 3. Basic File Display (Partial/Non-functional)
* The `modifyFiles` function includes logic for displaying file details (**Name**, **Last Modified**, **Size (KB)**) under an option labeled **"5. Display the Files"**. *Note: This feature is currently nested incorrectly and doesn't execute as a separate menu option.*

---

## Identified Bugs and Areas for Improvement

### 🐞 Bugs and Critical Fixes

| Function | Issue | Detail |
| :--- | :--- | :--- |
| `fileChecking` | **Input Loop Logic** | The main organization loop: `while (input != "n")` and the nested menu loop: `while (input != "6")` are structured in a way that makes the program difficult to control. The inner loop expects to read input *after* displaying the menu but then reads input *again* when checking for "1. Organize by File Type", which will cause it to miss the actual input for other menu options (2, 3, 5, 6). The menu options **must** be implemented within the inner loop's `if/else if` structure, and input should only be read once per iteration. |
| `modifyFiles` | **Option 5 Misplacement** | The logic for displaying files (Option 5) is incorrectly nested *inside* the `if (input == "1")` block within `modifyFiles`. This means file display will only attempt to run *after* file organization by type has finished, and it uses a value of `input` that is not the menu choice. **It should be a separate `if (input == "5")` block in `fileChecking`.** |
| `fileChecking` | **File Selection Bypass** | If files *do* exist, the user is asked if they want to organize (`y/n`). If the user picks 'n', the code immediately tries to read directory selection input without allowing the user to view the initial directory list again, which is confusing. The logic for handling 'n' should be refined to better present the subfolder options. |
| `newPath` & `back` | **State Management** | When navigating (`newPath` and `back`), the methods correctly update the path and regenerate `DirectoryInfo` objects. However, they pass back the updated state through function arguments, but these changes are **not persisted** in the caller's scope (e.g., `Main` or `fileChecking`) because C# passes reference types by value (for the reference itself). **To fix this, the functions should return the new path, or the path variables should be passed with the `ref` keyword, or the state should be managed within a class/struct object.** |

---

### 🚀 Future Improvements

| Area | Recommended Action |
| :--- | :--- |
| **New Features** | Implement the missing organization options: **Organize by Date Modified** and **Organize by Size**. |
| **User Experience (UX)** | After any action (organizing, going back, etc.), the application should clear the console (`Console.Clear()`) and re-display the current directory listing/menu options for a cleaner interface. |
| **Error Handling** | Improve error handling for invalid input (non-integer when selecting folders) in `fileChecking`. The current `try-catch (IOException)` isn't ideal for parsing errors; a specific `try-catch (FormatException)` on `int.Parse(input)` is better. |
| **Directory Object ID** | The `directoryObject.folderId` is a `string`. For input validation, it would be more robust to make it an `int` and parse/compare against integers consistently. |
| **Code Structure** | Extract the file movement logic from `modifyFiles` into smaller, dedicated functions (e.g., `MoveFileToCategory`). This will improve readability and maintainability. |
| **Configuration** | The file category dictionary in `modifyFiles` is hardcoded. Consider moving this to an external configuration file (like JSON or a simple text file) to make it easier to update categories without recompiling the application. |