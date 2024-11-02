import React from 'react';
import ProductList from "../ProductList/ProductList";

const MainContent = () => {
    return (
        <main>
            <section>
                <h2>Featured Products</h2>
                <ProductList />
            </section>
        </main>
    );
};

export default MainContent;