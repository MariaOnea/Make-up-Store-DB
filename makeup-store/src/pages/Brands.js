import '../App.css';
import React, { useState, useEffect } from 'react'
function Brands() {
    const [returnedData, setReturnedData] = useState([]);
    const [Brand_ID, setBrand_ID] = useState("");
    const [NumeBrand, setNumeBrand] = useState("");
    const [Contact, setContact] = useState("");
    const [editingBrand, setEditingBrand] = useState(null);
    const [showFormSubmit, setShowFormSubmit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const toggleFormSubmit = () => {    
       
      setShowFormSubmit(!showFormSubmit);   
      
      };
    
    const handleSubmit = async(event) => {
      event.preventDefault();
      const newBrand = {
        Brand_ID : Brand_ID,
        NumeBrand : NumeBrand,
        Contact : Contact
        
      }

      console.log(newBrand);
      const url = isEditing ? `http://localhost:5000/updatebrands/${Brand_ID}`: 'http://localhost:5000/insertbrands';
      const method = isEditing ? 'PUT' : 'POST';
      try {
        const response = await fetch(url,{
          method:method,
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(newBrand) 
        });
  
      if(!response.ok) {
        throw new Error("server responded with an error");
      }
      else {
        await getData();
      }
  
      }
  
      catch(error) {
        console.log(error);
      }
      setShowFormSubmit(false);
      if (isEditing) {
        setIsEditing(false);
      }
    }

  
    const handleDelete = async (Brand_ID) => {
      try {
          const response = await fetch(`http://localhost:5000/deletebrands/${Brand_ID}`, { 
            method: 'DELETE' });
          
            if (response.ok) {
              
              getData();
          } else {
              throw new Error('Eroare la ștergerea brandului');
          }
      } catch (error) {
          console.error(error);
      }
  };
  
  
  const handleEdit = (brand) => {
    setEditingBrand(brand);
    toggleFormSubmit();
    setIsEditing(true);
      setBrand_ID(brand.Brand_ID);
      setNumeBrand(brand.NumeBrand);
      setContact(brand.Contact);
    
    {showFormSubmit && (
      <form onSubmit={handleSubmit}>
        
        < input type = "text"
              placeholder="NumeBrand"
              value={NumeBrand}
              onChange={(e) => setNumeBrand(e.target.value)}>
            </input>            
  
            < input type = "text"
              placeholder="Contact"
              value={Contact}
              onChange={(e) => setContact(e.target.value)}>
            </input>

            <button type='submit'>{isEditing ? 'Salvează Modificările' : 'Submit'}</button>
      </form>
    )}
    
  };
  
  async function getData() {
    try {
      const response = await fetch('http://localhost:5000/brand');
      const data = await response.json();
      setReturnedData(data);
      console.log(data, "results");
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
    useEffect(() => {
      
  
      getData();
    }, []);
   
    return (
      <div className="App">
        
        
      
      <div>
      <button onClick={toggleFormSubmit}>Insert</button>{" "}
        {showFormSubmit && (
          
          <form onSubmit={handleSubmit}>
            < input type = "number"
              placeholder="Brand_ID"
              value={Brand_ID}
              onChange={(e) => setBrand_ID(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="NumeBrand"
              value={NumeBrand}
              onChange={(e) => setNumeBrand(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="Contact"
              value={Contact}
              onChange={(e) => setContact(e.target.value)}>
            </input>            
  
            <button type='submit'>{isEditing ? 'Salvează Modificările' : 'Submit'}</button>
          </form>
          )}
        </div>
      <h1>Branduri</h1>
  
      <div className="table-container">
        <table border="1">
           <thead>
             <tr>
               
               <th>NumeBrand</th>
               <th>Contact</th>
              <th>Stergere</th>
              <th>Editare</th>
            </tr>
           </thead>
           <tbody>
        {returnedData.map((brand, index) => (
            <tr key={index}>
               <td>{brand.NumeBrand}</td>
               <td>{brand.Contact}</td>
              <td><button onClick={() => handleDelete(brand.Brand_ID)}>Șterge</button></td>
              <td><button onClick={() => handleEdit(brand)}>Editeaza</button></td>
            </tr>
            ))}
          </tbody>
         </table>
         </div>
        
        
    
        
      </div>
    ); 
       }
  
  
  export default Brands;