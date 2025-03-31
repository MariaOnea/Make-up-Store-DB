import '../App.css';
import React, { useState, useEffect } from 'react'
function Produse() {
    const [returnedData, setReturnedData] = useState([]);
    const [Produs_ID, setProdus_ID] = useState("");
    const [Brand_ID, setBrand_ID] = useState("");
    const [NumeProdus, setNumeProdus] = useState("");
    const [Pret, setPret] = useState("");
    const [Cantitate, setCantitate] = useState("");
    const [Categorie, setCategorie] = useState("");
    const [Culoare, setCuloare] = useState("");
    const [UnitateDeMasura, setUnitateDeMasura] = useState("");
    const [StocDisponibil, setStocDisponibil] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [showFormSubmit, setShowFormSubmit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const toggleFormSubmit = () => {    
       
      setShowFormSubmit(!showFormSubmit);   
      
      };
    
    const handleSubmit = async(event) => {
      event.preventDefault();
      const newProduct = {
        Produs_ID : Produs_ID,
        Brand_ID : Brand_ID,
        NumeProdus : NumeProdus,
        Pret : Pret,
        Cantitate : Cantitate,
        Categorie : Categorie,
        Culoare : Culoare,
        UnitateDeMasura : UnitateDeMasura,
        StocDisponibil : StocDisponibil
      }
      console.log(newProduct);
      const url = isEditing ? `http://localhost:5000/update/${Produs_ID}`: 'http://localhost:5000/insertproducts';
      const method = isEditing ? 'PUT' : 'POST';
      try {
        const response = await fetch(url,{
          method:method,
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(newProduct) 
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
    }
  
    const handleDelete = async (Produs_ID) => {
      try {
          const response = await fetch(`http://localhost:5000/deleteproducts/${Produs_ID}`, { 
            method: 'DELETE' });
          
            if (response.ok) {
              
              getData();
          } else {
              throw new Error('Eroare la ștergerea produsului');
          }
      } catch (error) {
          console.error(error);
      }
  };
  
  
  const handleEdit = (product) => {
    setEditingProduct(product);
    toggleFormSubmit();
    setIsEditing(true);
    setProdus_ID(product.Produs_ID);
      setBrand_ID(product.Brand_ID);
      setNumeProdus(product.NumeProdus);
      setPret(product.Pret);
      setCantitate(product.Cantitate);
      setCategorie(product.Categorie);
      setCuloare(product.Culoare);
      setUnitateDeMasura(product.UnitateDeMasura);
      setStocDisponibil(product.StocDisponibil);
    {showFormSubmit && (
      <form onSubmit={handleSubmit}>
        
        < input type = "text"
              placeholder="NumeProdus"
              value={NumeProdus}
              onChange={(e) => setNumeProdus(e.target.value)}>
            </input>            
  
            < input type = "number"
              placeholder="Pret"
              value={Pret}
              onChange={(e) => setPret(e.target.value)}>
            </input>
  
            < input type = "number"
              placeholder="Cantitate"
              value={Cantitate}
              onChange={(e) => setCantitate(e.target.value)}>
            </input>
            
            < input type = "text"
              placeholder="Categorie"
              value={Categorie}
              onChange={(e) => setCategorie(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="Culoare"
              value={Culoare}
              onChange={(e) => setCuloare(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="Unitate de Masura"
              value={UnitateDeMasura}
              onChange={(e) => setUnitateDeMasura(e.target.value)}>
            </input>
  
              < input type = "number"
              placeholder="Stoc Disponibil"
              value={StocDisponibil}
              onChange={(e) => setStocDisponibil(e.target.value)}>
            </input>
        
        <button type="submit">Salvează Modificările</button>
      </form>
    )}
    
  };
  
  async function getData() {
    try {
      const response = await fetch('http://localhost:5000/product');
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
              placeholder="Produs_ID"
              value={Produs_ID}
              onChange={(e) => setProdus_ID(e.target.value)}>
            </input>
  
            < input type = "number"
              placeholder="Brand_ID"
              value={Brand_ID}
              onChange={(e) => setBrand_ID(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="NumeProdus"
              value={NumeProdus}
              onChange={(e) => setNumeProdus(e.target.value)}>
            </input>            
  
            < input type = "number"
              placeholder="Pret"
              value={Pret}
              onChange={(e) => setPret(e.target.value)}>
            </input>
  
            < input type = "number"
              placeholder="Cantitate"
              value={Cantitate}
              onChange={(e) => setCantitate(e.target.value)}>
            </input>
            
            < input type = "text"
              placeholder="Categorie"
              value={Categorie}
              onChange={(e) => setCategorie(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="Culoare"
              value={Culoare}
              onChange={(e) => setCuloare(e.target.value)}>
            </input>
  
            < input type = "text"
              placeholder="Unitate de Masura"
              value={UnitateDeMasura}
              onChange={(e) => setUnitateDeMasura(e.target.value)}>
            </input>
  
              < input type = "number"
              placeholder="Stoc Disponibil"
              value={StocDisponibil}
              onChange={(e) => setStocDisponibil(e.target.value)}>
            </input>
            <button type='submit'>Submit</button>
          </form>
          )}
        </div>
      <h1>Produse</h1>
  
      <div className="table-container">
        <table border="1">
           <thead>
             <tr>
               
               <th>NumeProdus</th>
               <th>Pret</th>
               <th>Cantitate</th>
              <th>Categorie</th>
              <th>Culoare</th>
              <th>UnitateDeMasura</th>
              <th>StocDisponibil</th>
              <th>Stergere</th>
              <th>Editare</th>
            </tr>
           </thead>
           <tbody>
        {returnedData.map((produse, index) => (
            <tr key={index}>
  
               
               <td>{produse.NumeProdus}</td>
               <td>{produse.Pret}</td>
               <td>{produse.Cantitate}</td>
               <td>{produse.Categorie}</td>
              <td>{produse.Culoare}</td>
              <td>{produse.UnitateDeMasura}</td>
              <td>{produse.StocDisponibil}</td>
              <td><button onClick={() => handleDelete(produse.Produs_ID)}>Șterge</button></td>
              <td><button onClick={() => handleEdit(produse)}>Editeaza</button></td>
            </tr>
            ))}
          </tbody>
         </table>
         </div>
        
        
    
        
      </div>
    ); 
       }
  
  
  export default Produse;