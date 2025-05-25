import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditCarModal = ({ editingBooking, setEditingBooking, startDate, setStartDate, endDate, setEndDate, handleModifyDate }) => {
  
  const onConfirm = () => {
    if (startDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }
    handleModifyDate(editingBooking._id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Modify Booking Dates</h3>

        <label className="block mb-2 font-medium">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          className="border p-2 rounded w-full"
        />

        <label className="block mb-2 font-medium mt-4">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="yyyy-MM-dd"
          className="border p-2 rounded w-full"
        />

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setEditingBooking(null)}
            className="px-4 py-2 rounded border border-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCarModal;
