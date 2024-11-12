import React from 'react';
import ProductList from "../ProductList/ProductList";
import CarList from "../CarsList/CarList";

const MainContent = () => {
    return (
        <main>
            <section>
                <h2>Featured Products</h2>
                <CarList />
            </section>
        </main>
    );
};

export default MainContent;