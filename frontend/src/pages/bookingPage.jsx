import Sidenav from '../components/sideNav';
import BookingForm from '../components/BookingForm';

function BookingPage() {
  const handleSearch = (filters) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <div className="w-[20%] min-h-screen bg-white shadow-md">
        <Sidenav />
      </div>

      {/* Booking Form on the right */}
      <div className="w-[80%] p-6">
        <BookingForm onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default BookingPage;
