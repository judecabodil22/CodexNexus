import react, { useEffect } from 'react';

// Use 'VITE_GEMINI_API_KEY' if your bundler (like Vite) prefixes env variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function RecipeList({ recipes, onSelectRecipe, searchTerm, onSearchTermChange }) {

    const [apiResults, setApiResults] = react.useState([]);
    const [loading, setLoading] = react.useState(false); // Corrected spelling
    const [error, setError] = react.useState(null);

    // ... (Your state declarations: apiResults, loading, error, combinedResults) ...
    const [combinedResults, setCombinedResults] = react.useState([]);

    // 💡 NEW: Initialize combinedResults with all local recipes when component mounts
    react.useEffect(() => {
        // Map recipes to include the 'source' tag for consistency
        const initialRecipes = recipes.map(recipe => ({
            ...recipe,
            source: 'local'
        }));
        setCombinedResults(initialRecipes);
    }, [recipes]); // Dependency array: Re-run if the main 'recipes' prop changes.

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(recipe => ({
        ...recipe,
        source: 'local' // 💡 FIX: Tag local recipes
    }));

    const fetchRecipesFromApi = async (query) => {
        if (!API_KEY) {
            setError('API key is missing. Please set the GEMINI_API_KEY environment variable.');
            return;
        }

        // 1. Corrected state setter and initial state (use [])
        setLoading(true);
        setError(null);
        setApiResults([]);

        setCombinedResults(filteredRecipes);

        const prompt = `Based on the following user input: "${query}". 
Return a list of 3 popular recipes that use that input as the main ingredient. 
Format your entire response as a single, valid JSON object with the following structure: 
{ "query": "${query}", "results": [{ "name": "Recipe Name", "description": "Short description" }] }`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        try {
            const response = await fetch(url, {
                // ... (Your POST request config) ...
                // 💡 RESTORED POST REQUEST CONFIGURATION 💡
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        role: 'user',
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        maxOutputTokens: 500,
                    },
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            // The JSON content is inside data.candidates[0].content.parts[0].text


            // 💡 NEW CHECK: Look for prompt feedback indicating a block
            if (data.promptFeedback && data.promptFeedback.blockReason) {
                const reason = data.promptFeedback.blockReason;
                const safetyRatings = data.promptFeedback.safetyRatings.map(r =>
                    `${r.category.split('_').pop()}: ${r.probability}`
                ).join(', ');

                // Set a clear error message based on the block reason
                setError(`API request blocked. Reason: ${reason}. Ratings: ${safetyRatings}`);
                setCombinedResults(filteredRecipes); // Show only local recipes
                return; // Exit the function gracefully
            }

            // Proceed only if the response was not blocked and might contain content
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (rawText) {
                try {
                    // Use your robust JSON extraction logic
                    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

                    if (jsonMatch) {
                        const jsonString = jsonMatch[0];
                        const parsedData = JSON.parse(jsonString);

                        // ... (rest of your successful parsing and state update logic) ...
                        const newApiResults = parsedData.results || [];

                        const taggedApiResults = newApiResults.map(result => ({
                            id: `api-${result.name}`,
                            name: result.name || 'Untitled API Recipe',
                            summary: result.summary || result.description || 'Details unavailable',
                            ingredients: result.ingredients || ['API sourced'],
                            steps: result.steps || [],
                            source: 'api'
                        }));

                        setApiResults(taggedApiResults);
                        setCombinedResults([...filteredRecipes, ...taggedApiResults]);

                    } else {
                        setError('API response did not contain a recognizable JSON object.');
                        setCombinedResults(filteredRecipes);
                        console.error("Raw API Text (could not parse JSON):", rawText);
                    }
                } catch (parseError) {
                    setError(`Failed to parse API response as JSON: ${parseError.message}`);
                    setCombinedResults(filteredRecipes);
                    console.error("Parse Error:", parseError);
                }
            } else {
                // This original error path now only triggers if 'rawText' is truly missing 
                // without a clear safety block reason (less likely, but possible).
                setError('API response did not contain valid content (no candidate text found).');
                setCombinedResults(filteredRecipes);
                console.error("API Data (no raw text):", data);
            }
        } catch (err) {
            console.error("API Call Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(`Searching for recipes matching: ${data.recipe}`);

        fetchRecipesFromApi(data.recipe);
    }

    return (
        <div className="main-search-container">

            {/* 1. APP HEADER */}
            <div className="app-header">
                <h1>RECIPE DATA TERMINAL</h1>
            </div>

            {/* 2. SEARCH FORM (RESTORED) */}
            <form onSubmit={handleSubmit}>
                <div className="input-section">
                    <input
                        id="recipe"
                        name="recipe"
                        type="text"
                        className="terminal-input"
                        placeholder="ENTER RECIPE NAME..."
                        value={searchTerm}
                        onChange={(e) => onSearchTermChange(e.target.value)}
                    />
                    <button className="search-button" type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Search for Recipes'}
                    </button>
                </div>
            </form>

            {/* 3. UNIFIED RESULTS DISPLAY */}
            <h2 className="section-header">[[ UNIFIED COOKING DATA ]]</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>ERROR: {error}</p>}
            {loading && <p style={{ textAlign: 'center' }}>ACCESSING REMOTE DATABASE...</p>}

            {combinedResults.length > 0 ? (
                <ul className="recipe-list">
                    {combinedResults.map(recipe => (
                        // Use a key that combines ID and source for uniqueness
                        <li
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
                // Only show "No Matching Data Found" if not loading
                !loading && <p className="recipe-file-metadata" style={{ textAlign: 'center' }}>NO MATCHING DATA FOUND.</p>
            )}

        </div>
    );
};

