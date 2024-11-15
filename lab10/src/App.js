// App.js
import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";
import MainBanner from "./components/MainBanner/MainBanner";
import { Route, Routes } from "react-router-dom";
import CarList from "./components/CarsList/CarList";
import { CarProvider } from "./context/CarContext";
import CarDetail from "./components/CarDetail/CarDetail";

function App() {
    return (
        <CarProvider>
            <Header />
            <Routes>
                <Route path="/" element={
                    <>
                        <MainBanner />
                        <CarList />
                        <Feedback />
                    </>
                } />
                <Route path="/catalog" element={<CarList />} />
                <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
            <Footer />
        </CarProvider>
    );
}

export default App;
