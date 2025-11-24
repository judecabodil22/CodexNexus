import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
// --- MOCK DATA ---
const MOCK_RECIPES = [
    { id: 1, name: "NUKA-COLA QUANTUM MIX", ingredients: ["Nuka-Cola", "Rad-X"], steps: ["Mix one part Nuka-Cola with one part Rad-X.", "Shake vigorously.", "Consume to gain temporary energy boost."] },
    { id: 2, name: "BLAMCO MAC & CHEESE", ingredients: ["Blamco Mac & Cheese", "Purified Water"], steps: ["Add purified water to Blamco Mac & Cheese container.", "Heat until warm.", "Stir and serve hot."] },
    { id: 3, name: "DEATHCLAW STEAK (RAW)", ingredients: ["Deathclaw Meat", "Salt"], steps: ["Slice Deathclaw meat into thick steaks.", "Apply minimal salt for preservation.", "Warning: Consume at your own risk. Radiation exposure imminent."] },
    { id: 4, name: "TARBERRY JUICE", ingredients: ["Tarberry", "Sugar Bombs"], steps: ["Boil Tarberries for 10 minutes.", "Strain and mix with crushed Sugar Bombs.", "Refrigerate before serving."] },
    { id: 5, name: "INSTANT NOODLES (VILE)", ingredients: ["Instant Noodles", "Stagnant Water"], steps: ["Combine instant noodles with stagnant water.", "DO NOT HEAT.", "Wait 3 minutes.", "Dispose of safely. Consumption not advised."] },
];

const MOCK_INGREDIENTS = [
    { id: 1, name: "MUTFRUIT" },
    { id: 2, name: "HUBFLOWER" },
    { id: 3, name: "TATO" },
    { id: 4, name: "BLOATFLY MEAT" },
    { id: 5, name: "NUKE COLA" },
];

// --- COMPONENTS ---

/**
 * Initial Screen Component
 * Displays mock ingredients and transitions to the main search view.
 */
const IngredientDisplay = ({ ingredients, onComplete }) => {
    useEffect(() => {
        // Set a timer to transition to the main search screen after 4 seconds
        const timer = setTimeout(() => {
            onComplete();
        }, 4000); 

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="initial-screen">
            <h1 className="initial-title">PIP-BOY TERMINAL V4.0</h1>
            <h2 className="section-header">[[ INVENTORY CHECK INITIATED ]]</h2>
            <ul className="ingredient-list">
                {ingredients.map((item, index) => (
                    <li 
                        key={item.id}
                        className="ingredient-list-item"
                        // Dynamic CSS variable for staggered fade-in
                        style={{'--item-delay': `${index * 0.2 + 0.5}s`}} 
                    >
                        {`> LOADING ASSET ${item.name}... [OK]`}
                    </li>
                ))}
            </ul>
        </div>
    );
};


/**
 * Recipe Details Component (EXECUTE Protocol)
 */
const RecipeDetails = ({ file, onBack }) => {
    return (
        <div className="recipe-decompiled-view">
            <button className="search-button" onClick={onBack} style={{ marginBottom: '20px' }}>
                &lt; BACK TO ITEM MENU
            </button>
            
            <h2>[DATA] RECIPE: {file.name}</h2>
            
            <h3 style={{color: 'var(--fallout-shadow)'}}>// REQUIRED ASSETS</h3>
            <p className="recipe-file-metadata">VERIFY ALL REQUIRED ASSETS ARE PRESENT IN INVENTORY.</p>
            
            <h3 style={{color: 'var(--fallout-shadow)'}}>// EXECUTION PROTOCOL</h3>
            <ol className="instructions-list">
                {file.steps.map((step, index) => (
                    <li 
                        key={index}
                        // Dynamic CSS Variables for Animation Delay & Duration
                        style={{
                            '--li-animation-delay': `${index * 0.1 + 0.5}s`, // Each item starts slightly later
                            '--li-animation-duration': `${step.length * 0.03}s` // Duration based on text length
                        }}
                    >
                        {step}
                    </li>
                ))}
            </ol>
        </div>
    );
};

/**
 * Main Recipe List/Search Component
 */
const RecipeList = ({ recipes, onSelectRecipe, searchTerm, onSearchTermChange }) => {
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-search-container">
            <div className="app-header">
                <h1>RECIPE DATA TERMINAL</h1>
            </div>

            <div className="input-section">
                <input
                    id ="recipe"
                    name="recipe"
                    type="text"
                    className="terminal-input"
                    placeholder="ENTER RECIPE NAME..."
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                />
            </div>

            <h2 className="section-header">[[ AVAILABLE COOKING DATA ]]</h2>
            
            {filteredRecipes.length > 0 ? (
                <ul className="recipe-list">
                    {filteredRecipes.map(recipe => (
                        <li key={recipe.id} className="recipe-item" onClick={() => onSelectRecipe(recipe)}>
                            <div className="recipe-file-name">{recipe.name}</div>
                            <div className="recipe-file-metadata">INGREDIENTS: {recipe.ingredients.join(', ')}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="recipe-file-metadata" style={{textAlign: 'center'}}>NO MATCHING DATA FOUND. CHECK SPELLING.</p>
            )}
        </div>
    );
};


/**
 * Main Application Component
 */
const App = () => {
    const [viewMode, setViewMode] = useState('INGREDIENT_LOAD'); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    let content = null;

    if (viewMode === 'INGREDIENT_LOAD') {
        content = (
            <IngredientDisplay 
                ingredients={MOCK_INGREDIENTS} 
                onComplete={() => setViewMode('SEARCH')} 
            />
        );
    } else if (selectedFile) {
        content = <RecipeDetails file={selectedFile} onBack={() => setSelectedFile(null)} />;
    } else {
        content = (
            <RecipeList 
                recipes={MOCK_RECIPES}
                onSelectRecipe={setSelectedFile}
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
            />
        );
    }
    
    return (
        <div id="root">
            {content}
           
            <Footer />
          
        </div>
    );
};

export default App;