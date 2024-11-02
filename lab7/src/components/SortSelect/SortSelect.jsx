import React from 'react';

const SortSelect = ({ sortOrder, onSortChange }) => {
    return (
        <div className="sort-select">
            <label htmlFor="sortOrder">Sort by Price: </label>
            <select id="sortOrder" value={sortOrder} onChange={onSortChange}>
                <option value="asc">Lowest to Highest</option>
                <option value="desc">Highest to Lowest</option>
            </select>
        </div>
    );
};

export default SortSelect;