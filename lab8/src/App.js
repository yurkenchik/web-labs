import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";
import MainBanner from "./components/MainBanner/MainBanner";
import { Route, Routes } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";

function App() {
    return (
        <ProductProvider>
            <Header />
            <Routes>
                <Route path="/" element={
                    <>
                        <MainBanner />
                        <ProductList />
                        <Feedback />
                    </>
                } />
                <Route path="/catalog" element={<ProductList />} />
            </Routes>
            <Footer />
        </ProductProvider>
    );
}

export default App;
