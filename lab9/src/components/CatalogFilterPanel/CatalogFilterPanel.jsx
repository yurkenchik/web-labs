import React, { useContext } from 'react';
import "./CatalogFilterPanel.css";
import {CarContext} from "../../context/CarContext";

const CatalogFilterPanel = () => {
    const { setSortOrder, setSearchTerm, sortOrder, searchTerm } = useContext(CarContext);

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
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
