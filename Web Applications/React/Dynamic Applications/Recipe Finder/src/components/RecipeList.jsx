import react, { useEffect } from 'react';
// 🚫 REMOVED: import recipes from '../recipesData.js'; (This should be handled by the parent component)
// 🚫 REMOVED: const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

export default function RecipeList({ recipes, onSelectRecipe, searchTerm, onSearchTermChange }) {

    // 💡 Simplified State: We only need state related to display and errors, 
    // but we can eliminate apiResults and loading since there are no network calls.
    // Keeping error for filtering edge cases.
    const [error, setError] = react.useState(null);
    const [combinedResults, setCombinedResults] = react.useState([]);

    // --- Core Logic: Filtering and State Management ---

    // 1. Tag and Filter Local Recipes: This function runs whenever `recipes` or `searchTerm` changes.
    // It creates a single list that the UI displays.
    react.useEffect(() => {
        // Tag all local recipes with 'source: local' for consistent data structure
        const taggedRecipes = recipes.map(recipe => ({
            ...recipe,
            source: 'local'
        }));

        // Filter the tagged recipes based on the current search term
        const filteredList = taggedRecipes.filter(recipe =>
            recipe.name && recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Update the displayed list
        setCombinedResults(filteredList);

        // Clear any previous error messages when a new filter is applied
        setError(null);
    }, [recipes, searchTerm]); // Dependency array now manages all data/search updates.

    // 🚫 REMOVED: fetchRecipesFromApi function (No longer needed)

    // --- Event Handler ---

    function handleSubmit(e) {
        // 💡 Now that there is no API call, the search happens instantly 
        // via the useEffect hook when 'searchTerm' is updated.
        e.preventDefault();

        // The core work (filtering) is already done by the useEffect hook above
        // whenever `searchTerm` changes through the input's onChange handler.
        console.log(`Searching locally for recipes matching: ${searchTerm}`);
    }

    // --- Render Block ---

    return (
        <div className="main-search-container">

            {/* 1. APP HEADER */}
            <div className="app-header">
                <h1>RECIPE DATA TERMINAL</h1>
            </div>

            {/* 2. SEARCH FORM */}
            <form onSubmit={handleSubmit}>
                <div className="input-section">
                    <input
                        id="recipe"
                        name="recipe"
                        type="text"
                        className="terminal-input"
                        placeholder="ENTER RECIPE NAME..."
                        value={searchTerm}
                        // The filter is triggered immediately on every keystroke
                        onChange={(e) => onSearchTermChange(e.target.value)}
                    />
                    {/* The search button is now just for form submission (or decorative), 
                        but it still works with the existing `handleSubmit` function */}
                    <button className="search-button" type="submit">
                        Search Local Recipes
                    </button>
                </div>
            </form>

            {/* 3. UNIFIED RESULTS DISPLAY */}
            <h2 className="section-header">[[ LOCAL COOKING DATA ]]</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>ERROR: {error}</p>}

            {/* Since we removed loading, we only check for results count */}
            {combinedResults.length > 0 ? (
                <ul className="recipe-list scrollable-list-container">
                    {combinedResults.map(recipe => (
                        <li
                            // Key is now just recipe.id since all sources are 'local'
                            key={`${recipe.id}-${recipe.source}`}
                            className={`recipe-item ${recipe.source === 'api' ? 'api-result' : 'local-result'}`}
                            onClick={() => onSelectRecipe(recipe)}
                        >
                            <div className="recipe-file-name">
                                **{recipe.name}** ({recipe.source === 'api' ? 'API' : 'Local'})
                            </div>
                            <div className="recipe-file-metadata">
                                {recipe.steps && recipe.steps.length > 0
                                    ? `STEPS: ${recipe.steps.join(' | ')}`
                                    : `INGREDIENTS: ${recipe.ingredients.join(', ')}`
                                }
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                // Now only show this message if the filtered list is empty
                <p className="recipe-file-metadata" style={{ textAlign: 'center' }}>NO MATCHING DATA FOUND.</p>
            )}

        </div>
    );
};