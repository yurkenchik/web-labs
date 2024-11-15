import React, { useContext } from 'react';
import './ProductList.css';
import { ProductContext } from "../../context/ProductContext";
import CatalogFilterPanel from './../CatalogFilterPanel/CatalogFilterPanel';
import ProductItem from "../ProductItem/ProductItem";

function ProductList() {
    const { filteredProducts } = useContext(ProductContext);

    return (
        <section className="product-list-section">
            <h2>Products</h2>
            <CatalogFilterPanel />
            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products match your criteria.</p>
                )}
            </div>
        </section>
    );
}

export default ProductList;
