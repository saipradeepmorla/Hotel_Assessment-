import React, { useState } from "react";
import { useCreateBooking } from "../services/hotelServices";
import useHotelStore from "../store/hotelStore";
import { toast } from "react-toastify";
import { Calendar, User, Users } from "lucide-react";

const BookingModal = () => {
  const { selectedHotel, resetBooking } = useHotelStore();
  const createBookingMutation = useCreateBooking();

  const [bookingForm, setBookingForm] = useState({
    guestName: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!bookingForm.guestName.trim()) {
      toast.warning("Please enter guest name", "error");
      return;
    }

    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      toast.warning("Please select check-in and check-out dates", "error");
      return;
    }

    const checkInDate = new Date(bookingForm.checkIn);
    const checkOutDate = new Date(bookingForm.checkOut);

    if (checkInDate >= checkOutDate) {
      toast.warning("Check-out date must be after check-in date", "error");
      return;
    }

    const bookingPayload = {
      ...bookingForm,
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      status: "pending",
      totalPrice: calculateTotalPrice(),
    };

    createBookingMutation.mutate(bookingPayload, {
      onSuccess: () => {
        toast.success(`Booking confirmed for ${selectedHotel.name}`, "success");
        resetBooking();
      },
      onError: (error) => {
        toast.error("Failed to make booking. Please try again.", "error");
        console.error("Booking error:", error);
      },
    });
  };

  const calculateTotalPrice = () => {
    const checkInDate = new Date(bookingForm.checkIn);
    const checkOutDate = new Date(bookingForm.checkOut);
    const nights = Math.max(
      1,
      Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    );
    return nights * selectedHotel.pricePerNight * bookingForm.guests;
  };

  if (!selectedHotel) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Book {selectedHotel.name}
        </h2>

        <div className="mb-4 bg-blue-50 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Price per Night:</span>
            <span className="text-primary">${selectedHotel.pricePerNight}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Available Rooms:</span>
            <span
              className={`
              font-bold
              ${
                selectedHotel.availableRooms > 5
                  ? "text-green-600"
                  : selectedHotel.availableRooms > 0
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            `}
            >
              {selectedHotel.availableRooms}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmitBooking}>
          <div className="mb-4">
            <label className="block mb-2 flex items-center">
              <User className="mr-2 text-gray-600" />
              Guest Name
            </label>
            <input
              type="text"
              name="guestName"
              value={bookingForm.guestName}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              placeholder="Enter guest name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 flex items-center">
              <Calendar className="mr-2 text-gray-600" />
              Check-in Date
            </label>
            <input
              type="date"
              name="checkIn"
              value={bookingForm.checkIn}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 flex items-center">
              <Calendar className="mr-2 text-gray-600" />
              Check-out Date
            </label>
            <input
              type="date"
              name="checkOut"
              value={bookingForm.checkOut}
              onChange={handleInputChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 flex items-center">
              <Users className="mr-2 text-gray-600" />
              Number of Guests
            </label>
            <input
              type="number"
              name="guests"
              value={bookingForm.guests}
              onChange={handleInputChange}
              min="1"
              max="10"
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="mb-4 bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span className="font-bold text-primary">
                ${calculateTotalPrice().toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={resetBooking}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
