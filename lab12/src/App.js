import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Feedback from "./components/Feedback/Feedback";
import MainBanner from "./components/MainBanner/MainBanner";
import { Route, Routes } from "react-router-dom";
import CarList from "./components/CarsList/CarList";
import { CarProvider } from "./context/CarContext";
import CarDetail from "./components/CarDetail/CarDetail";
import Bucket from "./components/Bucket/Bucket";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
    // Mock authentication state. Replace with your actual logic.
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <CarProvider>
            <Header />
            <Routes>
                {/* Public Routes */}
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />

                {/* Private Route for main page */}
                <Route
                    path="/"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <>
                                <MainBanner />
                                <CarList />
                                <Feedback />
                            </>
                        </PrivateRoute>
                    }
                />

                {/* Private Route for bucket */}
                <Route
                    path="/bucket"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Bucket />
                        </PrivateRoute>
                    }
                />

                {/* Public Route */}
                <Route path="/catalog" element={<CarList />} />
                <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
            <Footer />
        </CarProvider>
    );
}

export default App;
