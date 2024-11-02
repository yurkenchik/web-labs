import React, { useState } from 'react';
import "./CatalogFilterPanel.css";
import SortSelect from "../SortSelect/SortSelect";

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

                <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} />
            </div>
        </div>
    );
};

export default CatalogFilterPanel;
