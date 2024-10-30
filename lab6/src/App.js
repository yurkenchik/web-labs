import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";
import MainBanner from "./components/MainBanner/MainBanner";

function App() {
    return (
        <div className="app-container">
            <Header />
            <MainBanner />
            <ProductList />
            <Feedback/>
            <Footer />
        </div>
    );
}

export default App;
