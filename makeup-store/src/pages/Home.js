import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [reviews, setReviews] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [receiptsForEmployee, setReceiptsForEmployee] = useState([]);
    const [notaMinima, setNotaMinima] = useState(0);
    const [categorieSelectata, setCategorieSelectata] = useState("");
    const [products, setProducts] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [departmentManager, setDepartmentManager] = useState([]);
    const [numberOfReviews, setNumberOfReviews] = useState([]);
    const [receiptByDate, setReceiptByDate] = useState([]);
    const [brand,setBrand] = useState([]);

    const fetchReviews = () => {
        fetch('http://localhost:5000/customer-reviews')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReviews(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea recenziilor:', error);
            });
    };

    const fetchEmployeesByDepartment = () => {
        fetch('http://localhost:5000/employees-by-department')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setEmployees(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea angajatilor:', error);
            });
    };

    const fetchBiggestReceipts = () => {
        fetch('http://localhost:5000/biggest-receipts')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReceipts(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea bonurilor:', error);
            });
    };

    const fetchBiggestReceiptsForEmployee = () => {
        fetch('http://localhost:5000/biggest-receipts-for-employee')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReceiptsForEmployee(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea bonurilor angajatilor:', error);
            });
    };

    const fetchProductsByMinimumRating = () => {
        fetch(`http://localhost:5000/products-by-minimum-rating/${notaMinima}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data); // 
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const fetchProductsByCategory = () => {
        fetch(`http://localhost:5000/products-by-category/${categorieSelectata}`)
            .then(response => response.json())
            .then(data => {
                setProducts2(data); // 
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const fetchDepartmentManager = () => {
        fetch('http://localhost:5000/department-manager')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDepartmentManager(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea bonurilor:', error);
            });
    };

    const fetchAllReviews = () => {
        fetch('http://localhost:5000/product-reviews')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setNumberOfReviews(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea numarului de recenzii:', error);
            });
    };

    const fetchReceiptsByDate = () => {
        fetch('http://localhost:5000/receipt-by-date')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReceiptByDate(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea bonurilor:', error);
            });
    };

    const fetchBiggestBrand = () => {
        fetch('http://localhost:5000/biggest-brand')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBrand(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea brandului:', error);
            });
    };

    return (
       <div>
            <div>
                <p>Afisati numele și prenumele clienților împreună cu numele și prețul produselor pe care le-au evaluat.</p>
                <button onClick={() => fetchReviews()}>Afișează Recenziile Clienților</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nume Client</th>
                            <th>Prenume Client</th>
                            <th>Nume Produs</th>
                            <th>Preț Produs</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, index) => (
                            <tr key={index}>
                                <td>{review.NumeClient}</td>
                                <td>{review.PrenumeClient}</td>
                                <td>{review.NumeProdus}</td>
                                <td>{review.Pret}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <p>Afisati numele și prenumele angajaților și numele departamentelor lor, dar numai pentru acei angajați care au un salariu mai mare decât salariul mediu al tuturor angajaților.</p>
                <button onClick={() => fetchEmployeesByDepartment()}>Afișează Angajatii</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Prenume</th>
                            <th>Nume Departament</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.Nume}</td>
                                <td>{employee.Prenume}</td>
                                <td>{employee.NumeDepartament}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <p>Calculează totalul de pe fiecare bon, sumând produsele cumpărate înmulțite cu prețul lor. Filtreaza bonurile astfel încât să includă numai acele bonuri unde totalul este mai mare decât media totalurilor tuturor bonurilor.</p>
                <button onClick={() => fetchBiggestReceipts()}>Afișează Bonurile</button>
                <table>
                    <thead>
                        <tr>
                            <th>Numar de Bon</th>
                            <th>Suma Bonului</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts.map((receipts, index) => (
                            <tr key={index}>
                                <td>{receipts.NumarDeBon}</td>
                                <td>{receipts.TotalPret}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <p>Afiseaza numele și prenumele tuturor angajaților și bonul cu suma cea mai mare emis de fiecare angajat.</p>
                <button onClick={() => fetchBiggestReceiptsForEmployee()}>Afișează cele mai mari bonuri pentru fiecare angajat</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Prenume</th>
                            <th>Suma Bon</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {receiptsForEmployee.map((receiptsEmployee, index) => (
                            <tr key={index}>
                                <td>{receiptsEmployee.Nume}</td>
                                <td>{receiptsEmployee.Prenume}</td>
                                <td>{receiptsEmployee.SumaMaximaBon}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
            <p>Afiseaza numele, brand-ul si culoarea produselor care au nota mai mare sau egala cu o nota minima, selectata din interfata grafica.</p>             
            <input type="number"  value={notaMinima} onChange={e => setNotaMinima(e.target.value)} />
            <button onClick={fetchProductsByMinimumRating}>Afiseaza produsele</button>
            <table>
            <thead>
                <tr>
                    <th>Nume Produs</th>
                    <th>Nume Brand</th>
                    <th>Culoare</th>
                            
                </tr>
            </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.NumeProdus}</td>
                            <td>{product.NumeBrand}</td>
                            <td>{product.Culoare}</td>
                        </tr>
                    ))}
                </tbody>
            </table>               
        </div>

        <div>
            <p>Afiseaza numele, culoarea și categoria produselor disponibile in stoc, precum și numele brandului asociat, dar numai pentru produsele care aparțin unei categorii specifice selectate din interfața grafică.</p>             
            <input type="text" placeholder='ex:Ten' value={categorieSelectata} onChange={e => setCategorieSelectata(e.target.value)} />
            <button onClick={fetchProductsByCategory}>Afiseaza produsele</button>
            <table>
            <thead>
                <tr>
                    <th>Nume Produs</th>
                    <th>Culoare</th>
                    <th>Categorie</th>
                    <th>Nume Brand</th>
                    
                            
                </tr>
            </thead>
                <tbody>
                    {products2.map((product2, index) => (
                        <tr key={index}>
                            <td>{product2.NumeProdus}</td>
                            <td>{product2.Culoare}</td>
                            <td>{product2.Categorie}</td>
                            <td>{product2.NumeBrand}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>               
        </div>
                    
        <div>
                <p>Afisati departamentele si numele managerului fiecarui department.</p>
                <button onClick={() => fetchDepartmentManager()}>Afișează numele managerilor</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nume Departament</th>
                            <th>Nume Manager</th>
                            <th>Prenume Manager</th>
                
                            
                        </tr>
                    </thead>
                    <tbody>
                        {departmentManager.map((departmentManager, index) => (
                            <tr key={index}>
                                <td>{departmentManager.NumeDepartament}</td>
                                <td>{departmentManager.ManagerNume}</td>
                                <td>{departmentManager.ManagerPrenume}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>      

            <div>
                <p>Afișați pentru fiecare produs numele, prețul, numele brandului și numărul total de recenzii primite de la clienți.</p>
                <button onClick={() => fetchAllReviews()}>Afișează Recenziile Clienților</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nume Produs</th>
                            <th>Preț</th>
                            <th>Nume Brand</th>
                            <th>Numar Recenzii</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {numberOfReviews.map((numberOfReviews, index) => (
                            <tr key={index}>
                                <td>{numberOfReviews.NumeProdus}</td>
                                <td>{numberOfReviews.Pret}</td>
                                <td>{numberOfReviews.NumeBrand}</td>
                                <td>{numberOfReviews.NumarRecenzii}</td>
                        
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            <div>
                <p>Afișați bonurile emise în perioada 1 Ianuarie-10 Februarie 2023, împreună cu numele clientului care a efectuat achiziția și numărul de produse de pe fiecare bon.</p>
                <button onClick={() => fetchReceiptsByDate()}>Afișează Bonurile</button>
                <table>
                    <thead>
                        <tr>
                            <th>Numar de Bon</th>
                            <th>Data</th>
                            <th>Nume Client</th>
                            <th>Prenume Client</th>
                            <th>Numar Produse pe Bon</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {receiptByDate.map((receiptByDate, index) => (
                            <tr key={index}>
                                <td>{receiptByDate.NumarDeBon}</td>
                                <td>{receiptByDate.Data}</td>
                                <td>{receiptByDate.NumeClient}</td>
                                <td>{receiptByDate.PrenumeClient}</td>
                                <td>{receiptByDate.NumarProduse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <p>Afisati numele brandului care are cele mai multe produse asociate, alaturi de numarul de produse.</p>
                <button onClick={() => fetchBiggestBrand()}>Afișează Brandul</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nume Brand</th>
                            <th>Numar Total de Produse</th>
            
                        </tr>
                    </thead>
                    <tbody>
                        {brand.map((brand, index) => (
                            <tr key={index}>
                                <td>{brand.NumeBrand}</td>
                                <td>{brand.NumarProduse}</td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default Home;
