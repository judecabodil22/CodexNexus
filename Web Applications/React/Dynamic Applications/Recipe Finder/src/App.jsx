import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/footer';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import IngredientDisplay from './components/IngredientDisplay';
import recipes from './recipesData.js';
// --- MOCK DATA ---
const MOCK_RECIPES = [
    { id: 1, name: "NUKA-COLA QUANTUM MIX", ingredients: ["Nuka-Cola", "Rad-X"], steps: ["Mix one part Nuka-Cola with one part Rad-X.", "Shake vigorously.", "Consume to gain temporary energy boost."] },
    { id: 2, name: "BLAMCO MAC & CHEESE", ingredients: ["Blamco Mac & Cheese", "Purified Water"], steps: ["Add purified water to Blamco Mac & Cheese container.", "Heat until warm.", "Stir and serve hot."] },
    { id: 3, name: "DEATHCLAW STEAK (RAW)", ingredients: ["Deathclaw Meat", "Salt"], steps: ["Slice Deathclaw meat into thick steaks.", "Apply minimal salt for preservation.", "Warning: Consume at your own risk. Radiation exposure imminent."] },
    { id: 4, name: "TARBERRY JUICE", ingredients: ["Tarberry", "Sugar Bombs"], steps: ["Boil Tarberries for 10 minutes.", "Strain and mix with crushed Sugar Bombs.", "Refrigerate before serving."] },
    { id: 5, name: "INSTANT NOODLES (VILE)", ingredients: ["Instant Noodles", "Stagnant Water"], steps: ["Combine instant noodles with stagnant water.", "DO NOT HEAT.", "Wait 3 minutes.", "Dispose of safely. Consumption not advised."] },
];

const MOCK_INGREDIENTS = [
    { "id": 1, "name": "ALL-PURPOSE FLOUR" },
    { "id": 2, "name": "BROWN SUGAR" },
    { "id": 3, "name": "GARLIC CLOVES" },
    { "id": 4, "name": "EXTRA VIRGIN OLIVE OIL" },
    { "id": 5, "name": "CHICKEN BREAST" }
];

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
                recipes={recipes}
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