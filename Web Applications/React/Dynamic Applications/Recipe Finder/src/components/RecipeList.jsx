import react, { useEffect } from 'react';


export default function RecipeList({ recipes, onSelectRecipe, searchTerm, onSearchTermChange }) {


    const [error, setError] = react.useState(null);
    const [combinedResults, setCombinedResults] = react.useState([]);


    react.useEffect(() => {
        const taggedRecipes = recipes.map(recipe => ({
            ...recipe,
            source: 'local'
        }));

        const filteredList = taggedRecipes.filter(recipe =>
            recipe.name && recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCombinedResults(filteredList);

        setError(null);
    }, [recipes, searchTerm]);



    function handleSubmit(e) {

        e.preventDefault();

        console.log(`Searching locally for recipes matching: ${searchTerm}`);
    }

    return (
        <div className="main-search-container">


            <div className="app-header">
                <h1>RECIPE DATA TERMINAL</h1>
            </div>


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

                    <button className="search-button" type="submit">
                        Search Local Recipes
                    </button>
                </div>
            </form>

            <h2 className="section-header">[[ LOCAL COOKING DATA ]]</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>ERROR: {error}</p>}

            {combinedResults.length > 0 ? (
                <ul className="recipe-list scrollable-list-container">
                    {combinedResults.map(recipe => (
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
                <p className="recipe-file-metadata" style={{ textAlign: 'center' }}>NO MATCHING DATA FOUND.</p>
            )}

        </div>
    );
};