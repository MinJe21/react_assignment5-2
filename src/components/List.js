import React from 'react';
import { useState } from 'react';
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";

export default function List() {

  let defaultList = [];
  const [tempList, setTempList] = useState(defaultList);

  const getList = () => { 
    axios.get("https://672818a9270bd0b975544f0f.mockapi.io/api/v1/phone") 
    .then((response) => { 
        console.log(JSON.stringify(response.data)); 
        setTempList(response.data);
    }) 
    .catch((error) => { 
        console.log(error);
    }) 
  }
  getList();

  return (
    <div className="container">
      <h3 className="mt-3">Phone Data List</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Phone Name</th>
            <th>Company</th>
            <th>Price</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {tempList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.phone_name}</td>
              <td>{item.company}</td>
              <td>{item.price}</td>
              <td>{item.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}