# Calculator Application (WPF)

## Project Description
The **Calculator Application** is a desktop application built using C\# and Windows Presentation Foundation (WPF). It functions as a standard, basic calculator, allowing users to perform arithmetic operations. A key feature is the maintenance of an **Operation History**, which tracks and displays previous calculations.

## Current Functionality

The application currently supports the following key features:

### 1. Basic Arithmetic Operations
The calculator correctly handles the four basic binary operations using a state-based approach:
* **Addition** (`+`)
* **Subtraction** (`-`)
* **Multiplication** (`*`)
* **Division** (`/`)
* **Modulo** (`%`)

### 2. Unary and Advanced Operations
The following single-number and more advanced functions are implemented:
* **Reciprocal** ($\frac{1}{x}$) (Operation `5`)
* **Square** ($x^2$) (Operation `6`)
* **Square Root** ($\sqrt{x}$) (Operation `7`)

### 3. User Input and Control
* **Number Entry:** Digits (0-9) are entered via dedicated button click handlers (`One_Btn_Click` through `Zero_Btn_Click`).
* **Decimal Support:** The `Decimal_Btn_Click` handler ensures a decimal point (`.`) is added only if one doesn't already exist in the display.
* **Clear Functions:**
    * **Clear All (CE/C):** The `ClearAll_Btn_Click` and `ClearEntry_Btn_Click` handlers reset the display to `"0"`.
    * **Backspace:** The `ClearLast_Btn_Click` handler removes the last digit entered, resetting to `"0"` if only one digit remains.

### 4. State Management and History
* **Operation State:** Private variables (`firstOperation`, `secondOperation`, `inOperation`, `operation`) are used to track the current calculation state (e.g., whether the first operand has been entered and which operation is pending).
* **Operation History:** An **`ObservableCollection<string>`** named `operationsHistory` is used to store the string representation of completed calculations, which is correctly bound to a `ListBox` (`HistoryList`) for display.

---

## Identified Bugs and Areas for Improvement

### 🐞 Bugs and Critical Fixes

| Function | Issue | Detail |
| :--- | :--- | :--- |
| **Clear Functions** | **Duplicate Functionality** | Both `ClearAll_Btn_Click` and `ClearEntry_Btn_Click` currently set the display to `"0"`. In a standard calculator, **Clear Entry (CE)** should only clear the current number, while **Clear All (C)** should clear the current number, the stored `firstOperation`, and reset the `inOperation` flag. You need to differentiate their functionality and use C to reset the entire state. |
| **Unary Operations** | **State Reset/Chain** | For unary operations (Reciprocal, Square, Square Root), the result is immediately calculated and displayed. However, the `inOperation` flag is set to `true`, and the operation is added to history **before** the final result is set, leading to confusing state management. The `inOperation` flag should be immediately reset to `false` after the calculation, and the result should replace the `firstOperation` if you intend to chain operations. |
| **Division by Zero** | **Missing Exception Handling** | The `Operations` function lacks a `try-catch` block or an explicit check for **division by zero** when `operation == 4` (Divide) or `operation == 5` (Reciprocal). If `secondOperation` (or `firstOperation` for Reciprocal) is zero, the application will crash or produce an unexpected result. |
| **Modulo Operation** | **Decimal Modulo** | While C\# supports the `%` operator for decimals, it typically returns a non-integer remainder, which is not the standard mathematical modulo often used for integer-based calculators. Furthermore, the `Operations` function calculates `firstOperation % secondOperation` but the click handler clears the screen, suggesting it's intended to be a **binary** operation, which is inconsistent with how unary operations (like $\sqrt{x}$) are handled. |

---

### 🚀 Future Improvements

| Area | Recommended Action |
| :--- | :--- |
| **Operation Chaining** | Implement continuous operation logic. For example, pressing `5`, then `+`, then `3`, then `*`, should immediately calculate $5+3=8$ and then prepare to multiply $8$ by the next number. Currently, only pressing `=` executes the calculation. |
| **Code Refactoring** | The `Operations` function uses a single integer (`operation`) and a large `if-else if` block. This approach is prone to errors. Consider using an **`enum`** for operation types (`ADD`, `SUBTRACT`, etc.) instead of magic numbers (`1`, `2`, `3`). Even better, refactor `Operations` to use a `switch` statement or a dictionary of delegates/functions to map the operation code to the calculation logic. |
| **Sign Change** | Add a button to **change the sign** ($\pm$) of the current number in the display. This is a standard calculator feature. |
| **State Reset Consistency** | Ensure that all subsequent number button clicks after an `=` or a unary operation **clear the current result** and start a new number entry, rather than appending to the answer. |
| **User Experience (UX)** | For the unary operations (Reciprocal, Square, Root), the display of the partial operation in `Operation_Text.Text` is inconsistent. For example, $\sqrt{x}$ and $\frac{1}{x}$ are calculated immediately, but the display of the full equation in the history should be more readable, perhaps using superscripts or better formatting. |
| **Input Parsing** | Add a `try-catch` block around `Decimal.Parse(TextBoxAnswer_Btn.Text)` in all operation handlers to gracefully handle situations where the user might enter invalid characters or an empty string, instead of relying on the WPF input mask (if any). |