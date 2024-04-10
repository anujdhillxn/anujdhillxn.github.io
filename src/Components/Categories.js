import React from "react";

const shouldHighlight = (text, categories, selectedCategories) => {
    if (categories.length === selectedCategories.length) {
        return text === "All";
    } else {
        return selectedCategories.includes(text);
    }
};

const Categories = ({ filter, categories, selectedCategories }) => {
    return (
        <div className="buttons">
            {categories.map((cat, i) => {
                return (
                    <button
                        type="button"
                        className={`btn-port ${
                            shouldHighlight(cat, categories, selectedCategories)
                                ? "active-btn-port"
                                : ""
                        }`}
                        onClick={() => filter(cat)}
                        key={i}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
};
export default Categories;
