// components/CatalogFilterPanel.js
import React from 'react';

const CatalogFilterPanel = ({ onSearchChange, onSortChange, searchTerm, sortOrder }) => (
    <div className="filter-panel">
        <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search cars..."
        />
        <select value={sortOrder} onChange={onSortChange}>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
        </select>
    </div>
);

export default CatalogFilterPanel;
