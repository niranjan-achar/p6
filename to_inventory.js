import React, { useState, useEffect } from "react";

import axios from "axios";

function Display_Inventory({ refresh }) {
  const [res, setres] = useState([]);
  
  useEffect(() => {
    const resp = async () => {
      const response = await axios.get("http://localhost:8000");
      console.log("asdfasdf", response.data)
      setres(response.data);
    }
    resp();
  }, [refresh]);
  
  return (
    <div>
      <h1>Inventory Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {res.map((inventory) => (
            <tr key={inventory.id}>
              <td>{inventory.id}</td>
              <td>{inventory.prodname}</td>
              <td>{inventory.qty}</td>
              <td>{inventory.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddInventory() {
  // const [ id, setId ] = useState("");
  const [ name, setName ] = useState("");
  const [ qty, setQty ] = useState("");
  const [ price, setPrice ] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState("");
  
  const SubmitEvent = () => {
    // Validate all fields are filled
    if (!name || !qty || !price) {
      setError("Please fill all the fields before you Submit!");
      return;
    }
    setError("");
    
    const fo = { "prodname": name, "qty":qty, "price":price };
    console.log("fo", fo);
    const resp = async () => {
      const response = await axios.post("http://localhost:8000/add", fo);
      console.log(response.data)
      setRefresh(prev => prev + 1);
      // Clear input fields after submit
      setName("");
      setQty("");
      setPrice("");
    }
    resp();
  }
    
  return (
    <div>
      <h1>Inventory Management</h1>

      <table>      
        <tbody>          
          <tr><td>Product Name</td><td><input type="text"
              name="prodname"
              value={name}
              onChange={(e) => setName(e.target.value)} required/></td>
          </tr>
          <tr><td>Quantity</td><td><input type="number"
              name="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)} required /></td>
          </tr>
          <tr><td>Price</td><td><input type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)} required /></td></tr>
        </tbody>
      </table>
      {error && <p style={{color: 'red', fontWeight: 'bold'}}>{error}</p>}
      <button onClick={SubmitEvent}>Submit</button>
      <Display_Inventory refresh={refresh} />
    </div>
  );
}

export { Display_Inventory, AddInventory };
