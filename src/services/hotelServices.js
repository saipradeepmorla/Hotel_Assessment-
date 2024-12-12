import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/axiosConfig";

// Fetch Hotels
export const useFetchHotels = () => {
  return useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      const response = await api.get("/hotels");
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create Booking
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      // Validate available rooms before booking
      const hotelResponse = await api.get(`/hotels/${bookingData.hotelId}`);
      const hotel = hotelResponse.data;

      if (hotel.availableRooms <= 0) {
        throw new Error("No rooms available");
      }

      // Create booking
      const bookingResponse = await api.post("/bookings", bookingData);

      // Update hotel's available rooms
      await api.patch(`/hotels/${bookingData.hotelId}`, {
        availableRooms: hotel.availableRooms - 1,
      });

      return bookingResponse.data;
    },
    onSuccess: () => {
      // Invalidate and refetch hotels and bookings
      queryClient.invalidateQueries(["hotels"]);
      queryClient.invalidateQueries(["bookings"]);
    },
  });
};
