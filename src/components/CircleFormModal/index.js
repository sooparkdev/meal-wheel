import React, { useState } from "react";
import SearchableDropdown from "../SearchableDropdown";

const neighborhoodsList = ["Downtown", "Midtown", "Uptown", "Suburb", "Rural"];

const CircleFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    circleName: "",
    description: "",
    neighborhood: "",
    cuisineType: "",
    dietaryAccommodations: [],
    costSharing: "",
    attendancePolicy: "",
    cancellationPolicy: "",
    weekdays: [],
    memberLimit: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: formData[name].includes(value)
          ? formData[name].filter((v) => v !== value)
          : [...formData[name], value],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onClose(); // Close the modal on form submit
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Create a New Circle
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Circle Name
              </label>
              <input
                className="border py-2 px-3 text-grey-800"
                type="text"
                name="circleName"
                onChange={handleChange}
              />
            </div>
            {/* Description */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Description
              </label>
              <textarea
                className="border py-2 px-3 text-grey-800"
                name="description"
                onChange={handleChange}
              ></textarea>
            </div>
            Dietary Preferences:
            <SearchableDropdown
              options={neighborhoodsList}
              selectedOptions={formData.neighborhoods}
              onSelectionChange={(newSelection) =>
                setFormData({ ...formData, "neighborhoods": newSelection })
              }
            />
            {/* Typical Cuisine Type */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Typical Cuisine Type
              </label>
              <input
                className="border py-2 px-3 text-grey-800"
                type="text"
                name="cuisineType"
                onChange={handleChange}
              />
            </div>
            {/* Dietary Accommodations */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Dietary Accommodations
              </label>
              <div className="flex flex-wrap">
                {[
                  "Vegetarian-Friendly",
                  "Vegan-Friendly",
                  "Gluten-Free Options",
                  "Nut-Free Environment",
                  "Halal/Kosher Options",
                  "Dairy-Free Choices",
                  "Low-Carb/Low-Sugar",
                ].map((item) => (
                  <label
                    key={item}
                    className="inline-flex items-center mr-2 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="dietaryAccommodations"
                      value={item}
                      onChange={handleChange}
                    />
                    <span className="ml-2">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Cost Sharing Arrangement */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Cost Sharing Arrangement
              </label>
              <select
                className="border py-2 px-3 text-grey-800"
                name="costSharing"
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Split equally">Split equally</option>
                <option value="Host covers cost">Host covers cost</option>
                <option value="Guest contribute a fixed amount">
                  Guest contribute a fixed amount
                </option>
              </select>
            </div>
            {/* Attendance Policy */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Attendance Policy
              </label>
              <select
                className="border py-2 px-3 text-grey-800"
                name="attendancePolicy"
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Mandatory">Mandatory</option>
                <option value="Flexible RSVP">Flexible RSVP</option>
              </select>
            </div>
            {/* Cancellation Policy */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Cancellation Policy
              </label>
              <select
                className="border py-2 px-3 text-grey-800"
                name="cancellationPolicy"
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="Notify 48 hours in advance">
                  Notify 48 hours in advance
                </option>
                <option value="Last-minute cancellations allowed">
                  Last-minute cancellations allowed
                </option>
              </select>
            </div>
            {/* Weekdays */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Weekdays
              </label>
              <div className="flex flex-wrap">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <label
                    key={day}
                    className="inline-flex items-center mr-2 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="weekdays"
                      value={day}
                      onChange={handleChange}
                    />
                    <span className="ml-2">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Member Limit */}
            <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900">
                Member Limit
              </label>
              <input
                className="border py-2 px-3 text-grey-800"
                type="number"
                name="memberLimit"
                onChange={handleChange}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded ml-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CircleFormModal;
