import React from 'react';

export default function RecipeDetails({ file, onBack }) {
    return (
        <div className="recipe-decompiled-view">
            <button className="search-button" onClick={onBack} style={{ marginBottom: '20px' }}>
                &lt; BACK TO ITEM MENU
            </button>

            <h2>[DATA] RECIPE: {file.name}</h2>

            <h3 style={{ color: 'var(--fallout-shadow)' }}>// REQUIRED ASSETS</h3>
            <ul className="instructions-list">
                {file.ingredients && file.ingredients.map((ingredient, index) => (
                    <li
                        key={index}
                        style={{
                            '--li-animation-delay': `${index * 0.05}s`,
                            '--li-animation-duration': `${ingredient.length * 0.03}s`
                        }}
                    >
                        {ingredient}
                    </li>
                ))}
            </ul>

            <h3 style={{ color: 'var(--fallout-shadow)' }}>// EXECUTION PROTOCOL</h3>
            <ol className="instructions-list">
                {file.steps.map((step, index) => (
                    <li
                        key={index}
                        style={{
                            '--li-animation-delay': `${(index * 0.1) + 1}s`,
                            '--li-animation-duration': `${step.length * 0.03}s`
                        }}
                    >
                        {step}
                    </li>
                ))}
            </ol>
        </div>
    );
};