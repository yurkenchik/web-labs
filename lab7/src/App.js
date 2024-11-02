import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";
import MainBanner from "./components/MainBanner/MainBanner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatalogFilterPanel from "./components/CatalogFilterPanel/CatalogFilterPanel";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={
                    <>
                        <MainBanner />
                        <ProductList />
                        <Feedback />
                    </>
                } />
                <Route path="/catalog" element={<ProductList/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
