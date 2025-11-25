import react from 'react';

export default function RecipeDetails({ file, onBack }) {
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