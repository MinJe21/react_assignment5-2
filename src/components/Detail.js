import React from 'react'
import {useState} from 'react'
import {useRef} from 'react'
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Detail() {
  const detailInputRef = useRef(null);
  const [itemId, setItemId] = useState("");

  const deleteItem = () => {
    if (!itemId) {
      alert("삭제할 아이템 ID를 입력하세요!");
      return;
    }

    axios
      .delete(`https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone/${itemId}`)
      .then((response) => {
        if (response.status === 200) {
          alert("삭제가 성공적으로 완료되었습니다!");
          setItemId("");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleInputChange = (e) => {
    setItemId(e.target.value);
  };

  return (
    <div className="container mt-5">
      <h2>Detail Page</h2>
      <div className="mb-3">
        <label htmlFor="itemId" className="form-label">
          Enter Item ID to Delete
        </label>
        <input
          type="text"
          id="itemId"
          className="form-control"
          placeholder="Enter item ID"
          value={itemId}
          onChange={handleInputChange}
          ref={detailInputRef}
        />
      </div>

      <button type="button" className="btn btn-danger" onClick={deleteItem}>
        Delete
      </button>
      
    </div>
  );
}
