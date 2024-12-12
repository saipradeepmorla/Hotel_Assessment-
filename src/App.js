import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import HotelList from "./components/HotelList";
import BookingModal from "./components/BookingModal";
import useHotelStore from "./store/hotelStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  const { selectedHotel } = useHotelStore();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-primary text-white p-4">
          <h1 className="text-3xl font-bold text-center">MAA Booking</h1>
        </header>

        <main>
          <HotelList />
          {selectedHotel && <BookingModal />}
        </main>
      </div>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
