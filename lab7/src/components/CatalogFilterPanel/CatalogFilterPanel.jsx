import React, { useState } from 'react';
import "./CatalogFilterPanel.css";

const CatalogFilterPanel = ({ onSortChange, onSearchChange }) => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        onSortChange(value);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    return (
        <div className="catalog-filter-panel">
            <div className="filter-controls">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="sort-select">
                    <label htmlFor="sortOrder">Sort by Price: </label>
                    <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                        <option value="asc">Lowest to Highest</option>
                        <option value="desc">Highest to Lowest</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CatalogFilterPanel;
