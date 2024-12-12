import { useState } from "react";
import { useFetchHotels } from "../services/hotelServices";
import useHotelStore from "../store/hotelStore";
import { Users } from "lucide-react";
import HotelCard from "./HotelCard";

const HotelList = () => {
  const { data: hotels, isLoading, error } = useFetchHotels();
  const { setSelectedHotel } = useHotelStore();
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
        <p>Unable to fetch hotels. Please try again later.</p>
      </div>
    );

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setSelectedHotelId(hotel.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Discover Our Hotels
        </h2>
        <div className="flex items-center text-gray-600">
          <Users className="mr-2" />
          <span>{hotels.length} Hotels Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            isSelected={selectedHotelId === hotel.id}
            onSelect={handleHotelSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;
