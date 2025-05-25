import React from 'react'
import DatePicker from 'react-datepicker'

const EditCarModal = ({newDate, editingBooking,setEditingBooking, handleModifyDate , setNewDate}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Modify Booking Date</h3>
        <DatePicker
          selected={newDate}
          onChange={(date) => setNewDate(date)}
          showTimeSelect
          dateFormat="Pp"
          className="border px-2 py-1 w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingBooking(null)}
            className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleModifyDate(editingBooking._id)}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCarModal