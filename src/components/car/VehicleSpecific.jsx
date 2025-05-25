import React from 'react'

const VehicleSpecific = ({car}) => {
  return (
    <div className="card  border border-gray-200">
        <div className="card-body">
            <h2 className="card-title">Vehicle Specifications</h2>
            <div className="space-y-2">
            <p><strong>Model:</strong> {car.carModel}</p>
            <p><strong>Registration:</strong> {car.vehicleRegistrationNumber}</p>
            <p><strong>Features:</strong> {car.features.join(', ')}</p>
            <p><strong>Description:</strong> {car.description}</p>
            </div>
        </div>
    </div>
  )
}

export default VehicleSpecific