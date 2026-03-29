import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval } from "date-fns";
import { FaArrowRight, FaCalendarAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const BookingModal = ({
  isOpen,
  onClose,
  vehicle,
  users,
  instanceAxios,
  finalPrice,
}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  // ওই গাড়ির বুকড ডেটগুলো সার্ভার থেকে আনা
  useEffect(() => {
    if (isOpen && vehicle._id) {
      instanceAxios.get(`/vehicle-booked-dates/${vehicle._id}`).then((res) => {
        const dates = res.data.flatMap((b) =>
          eachDayOfInterval({
            start: new Date(b.startDate),
            end: new Date(b.endDate),
          })
        );
        setBookedDates(dates);
      });
    }
  }, [isOpen, vehicle._id, instanceAxios]);

  const totalDays =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1
      : 0;
  const totalPrice = totalDays * finalPrice;

  const handleConfirm = async () => {
    if (!startDate || !endDate)
      return Swal.fire("Error", "Please select a date range", "error");

    setLoading(true);
    try {
      const bookingData = {
        vehicleId: vehicle._id,
        vehicleName: vehicle.vehicleName,
        price: finalPrice, // পার ডে প্রাইস
        totalPrice: totalPrice, // মোট প্রাইস
        startDate,
        endDate,
        userEmail: users.email,
        userName: users.displayName,
        hostEmail: vehicle.userEmail,
        image: vehicle.coverImage,
      };

      await instanceAxios.post("/bookings", bookingData);
      Swal.fire("Success", "Booking request sent to host!", "success");
      onClose();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Booking failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center  p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--card-bg)]  border border-[var(--primary)]/20 w-full max-w-[95%] lg:max-w-3xl rounded-2xl overflow-hidden shadow-md animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b  border-[var(--primary)]/10 flex justify-between items-center bg-[var(--bg-main)]">
          <h3 className="text-xl font-bold text-gradient-gold uppercase">
            Select Rental Dates
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--text-main)] opacity-50 hover:opacity-100 transition-opacity"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex justify-center custom-datepicker">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              excludeDates={bookedDates}
              minDate={new Date()}
              inline
              calendarClassName="main-calendar"
            />
          </div>

          <div className="w-full lg:w-64 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h4 className="font-bold text-[var(--primary)] uppercase text-xs tracking-widest">
                Booking Summary
              </h4>
              <div className="bg-[var(--bg-main)] p-5 rounded-2xl border border-[var(--primary)]/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Duration:</span>
                  <span className="font-bold">{totalDays} Days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Rate:</span>
                  <span className="font-bold">${finalPrice}/d</span>
                </div>
                <div className="pt-3 border-t border-[var(--primary)]/10 mt-2">
                  <span className="block text-[10px] opacity-50 uppercase font-bold">
                    Total Est.
                  </span>
                  <span className="text-3xl font-black text-[var(--text-main)]">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!endDate || loading}
              className="btn-gradient w-full py-4 rounded-xl font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Confirm{" "}
                  <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
