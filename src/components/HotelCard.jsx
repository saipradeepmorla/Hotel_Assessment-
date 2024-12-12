import { Star, MapPin, Hotel } from "lucide-react";

const HotelCard = ({ hotel, isSelected, onSelect }) => {
  return (
    <div
      className={`
          relative group border rounded-xl overflow-hidden shadow-lg 
          transition-all duration-300 transform hover:scale-105
          ${
            isSelected
              ? "border-primary ring-4 ring-primary/30"
              : "border-gray-200 hover:border-primary/50"
          }
        `}
      onClick={() => onSelect(hotel)}
    >
      {/* Hotel Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Hotel Details */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {hotel.name}
          </h3>
          <div className="flex items-center text-yellow-500">
            <Star className="w-5 h-5 fill-current" />
            <span className="ml-1 font-semibold">{hotel.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{hotel.location}</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-primary font-bold text-lg">
              ${hotel.pricePerNight}
            </span>
            <span className="text-gray-500 ml-1">/ night</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-700">
            <Hotel className="w-5 h-5" />
            <span className="text-sm">{hotel.availableRooms} Rooms</span>
          </div>
        </div>
      </div>

      {/* Availability Indicator */}
      <div
        className={`
          absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
          ${
            hotel.availableRooms > 5
              ? "bg-green-500 text-white"
              : hotel.availableRooms > 0
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          }
        `}
      >
        {hotel.availableRooms > 5
          ? "Plenty of Rooms"
          : hotel.availableRooms > 0
          ? "Limited Rooms"
          : "No Rooms"}
      </div>
    </div>
  );
};

export default HotelCard;
