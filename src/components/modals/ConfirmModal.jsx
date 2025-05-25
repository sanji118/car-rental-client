import React from 'react'

const ConfirmModal = ({handleCancelBooking, setShowCancelModal, showCancelModal}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          Are you sure you want to cancel this booking?
        </h3>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowCancelModal(null)}
            className="px-4 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            No
          </button>
          <button
            onClick={() => handleCancelBooking(showCancelModal._id)}
            className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal