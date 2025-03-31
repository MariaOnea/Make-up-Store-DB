const config            = require('./dbConfig'),
   sql                  = require('mssql');

const getProducts = async() => {
    try {
      let pool = await sql.connect(config);
      let products = pool.request().query("SELECT * From Produse")
      console.log(products)
      return products;

    }
    catch(error) {
        console.log(error);
    }
}

const CreateProduct = async(Product) => {
  try {
    let pool = await sql.connect(config);
    let products = pool.request().query(`INSERT INTO Produse VALUES 
  (${Product.Produs_ID}, '${Product.Brand_ID}','${Product.NumeProdus}','${Product.Pret}','${Product.Cantitate}','${Product.Categorie}','${Product.Culoare}','${Product.UnitateDeMasura}','${Product.StocDisponibil}')
    `)
    return products;

  }
  catch(error) {
      console.log(error);
  }
}

const updateProduct = async (Produs_ID, Produse) => {
  try {
      let pool = await sql.connect(config);
      let updateQuery = `UPDATE Produse SET 
                         Brand_ID = '${Produse.Brand_ID}', 
                         NumeProdus = '${Produse.NumeProdus}', 
                         Pret = '${Produse.Pret}', 
                         Cantitate = '${Produse.Cantitate}', 
                         Categorie = '${Produse.Categorie}', 
                         Culoare = '${Produse.Culoare}',
                         UnitateDeMasura = '${Produse.UnitateDeMasura}', 
                         StocDisponibil = '${Produse.StocDisponibil}'
                         WHERE Produs_ID = '${Produs_ID}'`;
      await pool.request().query(updateQuery);
  } catch (error) {
      console.log(error);
  }
} 

const deleteProduct = async (Produs_ID) => {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`DELETE FROM Produse WHERE Produs_ID = '${Produs_ID}'`);
    console.log(`Produsul cu ID-ul ${Produs_ID} a fost șters`);
  } catch (error) {
    console.error('Eroare la ștergerea produsului:', error);
  }
};

const getBrands = async() => {
  try {
    let pool = await sql.connect(config);
    let brands = pool.request().query("SELECT * From Branduri")
    console.log(brands)
    return brands;

  }
  catch(error) {
      console.log(error);
  }
}

const CreateBrand = async(Brand) => {
  try {
    let pool = await sql.connect(config);
    let brands = pool.request().query(`INSERT INTO Branduri VALUES 
  (${Brand.Brand_ID}, '${Brand.NumeBrand}','${Brand.Contact}')
    `)
    return brands;

  }
  catch(error) {
      console.log(error);
  }
}

const updateBrand = async (Brand_ID, Brand) => {
  try {
      let pool = await sql.connect(config);
      let updateQuery = `UPDATE Branduri SET NumeBrand = '${Brand.NumeBrand}', 
                        Contact = '${Brand.Contact}' 
                        WHERE Brand_ID = '${Brand_ID}'`;
      await pool.request().query(updateQuery);
  } catch (error) {
      console.log(error);
  }
}

const deleteBrand = async (Brand_ID) => {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`DELETE FROM Branduri WHERE Brand_ID = '${Brand_ID}'`);
    console.log(`Brandul cu ID-ul ${Brand_ID} a fost șters`);
  } catch (error) {
    console.error('Eroare la ștergerea brandului:', error);
  }
};

//interogari

const getCustomerProductReviews = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT c.NumeClient,
                 c.PrenumeClient,
                 p.NumeProdus,
                 p.Pret
          FROM Clienti c
          JOIN ProduseEvaluateClienti pe ON c.Clienti_ID = pe.Clienti_ID
          JOIN Produse p ON pe.Produs_ID = p. Produs_ID;
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru recenziile produselor:', error);
  }
};

const getEmployeesByDepartment = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT a.Nume,
                 a.Prenume,
                 d.NumeDepartament
           FROM Angajati a
           JOIN DepartamentDeVanzari d ON a.Departament_ID = d.Departament_ID
           WHERE a.Salariu > (SELECT AVG(Salariu) FROM Angajati);
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru angajati:', error);
  }
};

const getBiggestReceipt = async () => {
  try {
    let pool = await sql.connect(config);
    let query = 
    
        `SELECT 
        b.NumarDeBon, 
        SUM(p.Pret * ppb.CantitateProdus) AS TotalPret
    FROM 
        Bonuri b
    JOIN 
        ProdusePeBon ppb ON b.Bon_ID = ppb.Bon_ID
    JOIN 
        Produse p ON ppb.Produs_ID = p.Produs_ID
    GROUP BY 
        b.NumarDeBon
    HAVING 
        SUM(p.Pret * ppb.CantitateProdus) > 
        (SELECT AVG(TotalPretPerBon) FROM 
            (SELECT SUM(p.Pret * ppb.CantitateProdus) AS TotalPretPerBon
             FROM ProdusePeBon ppb 
             JOIN Produse p ON ppb.Produs_ID = p.Produs_ID
             GROUP BY ppb.Bon_ID) AS SubQuery);
    
    `;
    let results = await pool.request().query(query);
    return results.recordset; 
} catch (error) {
    console.error('Eroare la interogarea pentru bonurile cu sume mari:', error);
}
}

const getBiggestReceiptForEmployee = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT 
          a.Nume, 
          a.Prenume, 
          (SELECT MAX(SumaBon)
           FROM (SELECT b.Bon_ID, SUM(p.Pret * ppb.CantitateProdus) AS SumaBon
                 FROM Bonuri b
                 JOIN ProdusePeBon ppb ON b.Bon_ID = ppb.Bon_ID
                 JOIN Produse p ON ppb.Produs_ID = p.Produs_ID
                 WHERE b.Angajati_ID = a.Angajati_ID
                 GROUP BY b.Bon_ID) AS SumaPeBon) AS SumaMaximaBon
      FROM 
          Angajati a;
      
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru bonurile angajatilor:', error);
  }
};

const getProductsByMinimumRating = async (notaMinima) => {
  try {
    let pool = await sql.connect(config);
    let query = `
    SELECT 
    p.NumeProdus, 
    b.NumeBrand, 
    p.Culoare
FROM 
    Produse p
JOIN 
    Branduri b ON p.Brand_ID = b.Brand_ID
WHERE 
    p.Produs_ID IN (
        SELECT pec.Produs_ID
        FROM ProduseEvaluateClienti pec
        GROUP BY pec.Produs_ID
        HAVING AVG(pec.NotaAcordataClient) >= @notaMinima
    );

    `;
    let results = await pool.request()
                      .input('notaMinima', sql.Int, notaMinima)
                      .query(query);
    return results.recordset;
  } catch (error) {
    console.error('Error in getProductsByMinimumRating:', error);
  }
};

const getProductsByCategory = async (categorieSelectata) => {
  try {
    let pool = await sql.connect(config);
    let query = `
    SELECT 
    p.NumeProdus, 
    p.Culoare, 
    p.Categorie, 
    b.NumeBrand
FROM 
    Produse p
JOIN 
    Branduri b ON p.Brand_ID = b.Brand_ID
WHERE 
    p.Categorie LIKE @categorieSelectata
AND  
    p.StocDisponibil > 0;

    `;
    let results = await pool.request()
                      .input('categorieSelectata', sql.NVarChar, categorieSelectata)
                      .query(query);
    return results.recordset;
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
  }
};

const getDepartmentManager = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT d.NumeDepartament, a.Nume AS ManagerNume, a.Prenume AS ManagerPrenume
          FROM DepartamentDeVanzari d
          JOIN Angajati a ON d.Manager_ID = a.Angajati_ID;
          
      
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru managerii departamentelor:', error);
  }
};

const getAllReviews = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT 
          p.NumeProdus, 
          p.Pret, 
          b.NumeBrand, 
          COUNT(pec.Produs_ID) AS NumarRecenzii
      FROM 
          Produse p
      JOIN 
          Branduri b ON p.Brand_ID = b.Brand_ID
      LEFT JOIN 
          ProduseEvaluateClienti pec ON p.Produs_ID = pec.Produs_ID
      GROUP BY 
          p.NumeProdus, p.Pret, b.NumeBrand;
      
          
      
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru recenziile produselor:', error);
  }
};

const getReceiptByDate = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT 
          b.NumarDeBon, 
          b.Data, 
          c.NumeClient, 
          c.PrenumeClient, 
          SUM(ppb.CantitateProdus) AS NumarProduse
      FROM 
          Bonuri b
      JOIN 
          Clienti c ON b.Clienti_ID = c.Clienti_ID
      JOIN 
          ProdusePeBon ppb ON b.Bon_ID = ppb.Bon_ID
      WHERE 
          b.Data BETWEEN '2023-01-01' AND '2023-02-10'
      GROUP BY 
          b.NumarDeBon, b.Data, c.NumeClient, c.PrenumeClient;
      
      
          
      
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru bonuri:', error);
  }
};

const getBiggestBrand = async () => {
  try {
      let pool = await sql.connect(config);
      let query = 
      
          `SELECT TOP 1
          b.NumeBrand,
          COUNT(*) AS NumarProduse
      FROM 
          Produse p
      JOIN 
          Branduri b ON p.Brand_ID = b.Brand_ID
      GROUP BY 
          b.NumeBrand
      ORDER BY 
          NumarProduse DESC;
      
      
      
          
      
      `;
      let results = await pool.request().query(query);
      return results.recordset; 
  } catch (error) {
      console.error('Eroare la interogarea pentru brand:', error);
  }
};

module.exports = {
  CreateProduct,
  getProducts,
  CreateBrand,
  getBrands,
  deleteProduct,
  deleteBrand,
  updateProduct,
  updateBrand,
  getCustomerProductReviews,
  getEmployeesByDepartment,
  getBiggestReceipt,
  getBiggestReceiptForEmployee,
  getProductsByMinimumRating,
  getProductsByCategory,
  getDepartmentManager,
  getAllReviews,
  getReceiptByDate,
  getBiggestBrand
}