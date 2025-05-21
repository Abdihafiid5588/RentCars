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

import Downlod from "./pages/Downlod"
import Footer from "./pages/Footer"
import AdminDashboard from './pages/AdminDashboard';
import AdminAddCar from './components/AdminAddCar';
import AdminManageCars from './pages/AdminManageCars';
import EditCar from './components/EditCarAdmin';
import UserBookings from './components/UserBookings';
import AdminBookingsPage from './pages/AdminBookingsPage';
import PromoteUserPage from './components/PromoteUserPage';
import UserBookingSummary from './pages/UserBookingSummary';
import AdminSummaryPage from './pages/AdminSummaryPage';
import ManualPaymentWrapper from "./pages/ManualPaymentWrapper";
import Adminpayments from "./pages/AdminPaymentApproval";
import ProfilePage from './pages/ProfilePage';
import DemoPaymentPage from './pages/DemoPaymentPage';
import ChatBotHelper from './components/FloatingHelper';


function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <ClientLogos />
      <WhyChooseUs />
      <PopularRental />
      <Downlod/>
      <Footer/>
      <ChatBotHelper/>
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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/add-car" element={<AdminAddCar />} />
      <Route path="/admin/manage-cars" element={<AdminManageCars />} />
      <Route path="/admin/edit-car/:id" element={<EditCar />} />
      <Route path="/my-bookings" element={<UserBookings />} />
      <Route path="/admin/bookings" element={<AdminBookingsPage />} />
      <Route path="/admin/promote" element={<PromoteUserPage />} />
      <Route path="/summary" element={<UserBookingSummary />} />
      <Route path="/admin/summary" element={<AdminSummaryPage />} />
      <Route path="/payment/:bookingId" element={<ManualPaymentWrapper />} />
      <Route path="admin/payments" element={<Adminpayments />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/pay" element={<DemoPaymentPage />} />

    </Routes>
  );
}

export default App;
