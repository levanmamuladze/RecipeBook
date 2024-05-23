import React, { useState } from "react";
import axios from "axios";

const RecipeList = (props) => {
    const [activeRecipe, setActiveRecipe] = useState(null);

    const handleDelete = async (recipeId) => {
        try {
            await axios.delete(`http://localhost:8000/recipes/${recipeId}/`);
            props.refreshRecipes();
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };

    const handleRecipeClick = (recipeId) => {
        if (activeRecipe === recipeId) {
            setActiveRecipe(null);
        } else {
            setActiveRecipe(recipeId);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Recipes</h2>
            <ul className="list-group">
                {props.recipes.map((recipe) => (
                    <li key={recipe.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            <span
                                onClick={() => handleRecipeClick(recipe.id)}
                                style={{ cursor: "pointer" }}
                                className="recipe-name"
                            >
                                <b>{recipe.recipe_name}</b>
                            </span>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(recipe.id)}
                            >
                                Delete
                            </button>
                        </div>
                        {activeRecipe === recipe.id && (
                            <div className="mt-3" style={{ textAlign: "left" }}>
                                <strong
                                    style={{
                                        textDecoration: "underline",
                                        fontSize: "1.6rem",
                                    }}
                                >
                                    Ingredients:
                                </strong>
                                <p
                                    style={{
                                        marginLeft: "15px",
                                        fontSize: "1.2rem",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: recipe.ingredients.replace(
                                            /\n/g,
                                            "<br />"
                                        ),
                                    }}
                                ></p>
                                <strong
                                    style={{
                                        textDecoration: "underline",
                                        fontSize: "1.6rem",
                                    }}
                                >
                                    Instructions:
                                </strong>
                                <p
                                    style={{
                                        marginLeft: "15px",
                                        fontSize: "1.2rem",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: recipe.instructions.replace(
                                            /\n/g,
                                            "<br />"
                                        ),
                                    }}
                                ></p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
