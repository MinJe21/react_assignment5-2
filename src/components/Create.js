import React from 'react'
import {useState} from 'react'
import {useRef} from 'react'
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Create() {
  const phoneNameRef = useRef(null);
  const companyRef = useRef(null);
  const priceRef = useRef(null);
  const capacityRef = useRef(null);

  const defaultList = {
    id: "",
    phone_name: "",
    company: "",
    price: "",
    capacity: "",
  };

  const [tempList, setTempList] = useState(defaultList);
  const [errors, setErrors] = useState({
    phone_name: "",
    company: "",
    price: "",
    capacity: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!tempList.phone_name) {
      newErrors.phone_name = "Please enter a phone name.";
    }
    if (!tempList.company) {
      newErrors.company = "Please enter a company.";
    }
    if (!tempList.price) {
      newErrors.price = "Please enter a price.";
    }
    if (!tempList.capacity) {
      newErrors.capacity = "Please enter a capacity.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const postList = () => {
    if (!validate()) {
      return;
    }

    axios
      .post("https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone", {
        id: tempList.id,
        phone_name: tempList.phone_name,
        company: tempList.company,
        price: tempList.price,
        capacity: tempList.capacity,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("등록 성공!");
          setTempList(defaultList);
          setErrors({});
        }
      })
      .catch((error) => console.error("Error creating data:", error));
  };

  const handleInputChange = (e) => {
    setTempList({ ...tempList, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  return (
    <div className="container mt-5">
      <h2>Create New Phone Data</h2>
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
          ref={phoneNameRef}
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
          ref={companyRef}
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
          ref={priceRef}
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
          ref={capacityRef}
        />
        {errors.capacity && (
          <div className="invalid-feedback">{errors.capacity}</div>
        )}
      </div>

      <button type="button" className="btn btn-primary" onClick={postList}>
        Submit
      </button>
    </div>
  );
}
