import React, { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
    const [instructions, setInstructions] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/recipes/", {
                instructions: instructions,
            })
            .then((response) => {
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Instructions:</label>
                    <textarea
                        className="form-control"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="addRecipe">
                    Add Recipe
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;
