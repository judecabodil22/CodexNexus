import React from "react";
import { useEffect } from "react";

export default function IngredientDisplay({ ingredients, onComplete }) {
    useEffect(() => {
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
                        style={{ '--item-delay': `${index * 0.2 + 0.5}s` }}
                    >
                        {`> LOADING ASSET ${item.name}... [OK]`}
                    </li>
                ))}
            </ul>
        </div>
    );
};