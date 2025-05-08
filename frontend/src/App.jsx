import React from 'react';
import Header from "./pages/Header";
import Hero from "./pages/Hero";
import HowItWorks from './components/HowItWoeks';
import ClientLogos from './components/ourClients';
import WhyChooseUs from './pages/whyChooseUs';
import PopularRental from './pages/PopularRentalSection';
import Login from './pages/login';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import BookingPage from './pages/bookingPage';

function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <ClientLogos />
      <WhyChooseUs />
      <PopularRental />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
