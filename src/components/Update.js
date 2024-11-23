import React from 'react'
import {useState} from 'react'
import {useRef} from 'react'
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Update() {
  const createInputRef = useRef(null);
  const defaultList = {
    id: "",
    phone_name: "",
    company: "",
    price: "",
    capacity: "",
  };

  const [tempList, setTempList] = useState(defaultList);
  const [editCount, setEditCount] = useState(0);
  const [errors, setErrors] = useState({
    id: "",
    phone_name: "",
    company: "",
    price: "",
    capacity: "",
  });

  const validateField = (field, value) => {
    switch (field) {
      case "id":
        return value.trim() === "" ? "ID is required." : "";
      case "phone_name":
        return value.trim() === "" ? "Phone name is required." : "";
      case "company":
        return value.trim() === "" ? "Company name is required." : "";
      case "price":
        return value.trim() === "" ? "Price is required." : "";
      case "capacity":
        return value.trim() === "" ? "Capacity is required." : "";
      default:
        return "";
    }
  };

  const updateField = (field, value) => {
    const error = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));

    if (error) {
      console.warn(`Validation failed for field "${field}": ${error}`);
      return;
    }

    const updatedList = { ...tempList, [field]: value };
    setTempList(updatedList);

    if (field === "id" || tempList.id) {
      axios
        .put(
          `https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone/${updatedList.id}`,
          updatedList
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(`Field "${field}" updated successfully`);
            setEditCount((prev) => prev + 1);
          }
        })
        .catch((error) => {
          console.error("Error updating field:", error);
        });
    } else {
      console.warn("ID is missing. PUT request aborted.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    updateField(id, value);
  };

  return (
    <div className="container mt-5">
      <h2>Update Phone Data</h2>

      <p>Total Updates: {editCount}</p>

      <div className="mb-3">
        <label htmlFor="id" className="form-label">
          ID
        </label>
        <input
          type="text"
          id="id"
          className={`form-control ${errors.id ? "is-invalid" : ""}`}
          value={tempList.id}
          onChange={handleInputChange}
          placeholder="Enter phone ID"
        />
        {errors.id && <div className="invalid-feedback">{errors.id}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="phone_name" className="form-label">
          Phone Name
        </label>
        <input
          type="text"
          id="phone_name"
          className={`form-control ${errors.phone_name ? "is-invalid" : ""}`}
          value={tempList.phone_name}
          onChange={handleInputChange}
          placeholder="Enter phone name"
          ref={createInputRef}
        />
        {errors.phone_name && (
          <div className="invalid-feedback">{errors.phone_name}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="company" className="form-label">
          Company
        </label>
        <input
          type="text"
          id="company"
          className={`form-control ${errors.company ? "is-invalid" : ""}`}
          value={tempList.company}
          onChange={handleInputChange}
          placeholder="Enter company name"
          ref={createInputRef}
        />
        {errors.company && (
          <div className="invalid-feedback">{errors.company}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="text"
          id="price"
          className={`form-control ${errors.price ? "is-invalid" : ""}`}
          value={tempList.price}
          onChange={handleInputChange}
          placeholder="Enter price"
          ref={createInputRef}
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="capacity" className="form-label">
          Capacity
        </label>
        <input
          type="text"
          id="capacity"
          className={`form-control ${errors.capacity ? "is-invalid" : ""}`}
          value={tempList.capacity}
          onChange={handleInputChange}
          placeholder="Enter capacity"
          ref={createInputRef}
        />
        {errors.capacity && (
          <div className="invalid-feedback">{errors.capacity}</div>
        )}
      </div>
    </div>
  );
}
