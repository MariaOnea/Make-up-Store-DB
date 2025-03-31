const express = require('express'),
    Product   =require('./dbFiles/product'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
    
app.get('/product', async function (req, res) {
    try {
        const products = await dbOperation.getProducts();
        console.log('Called and retrieved products:', products);
        res.send(products.recordset);
    } catch (error) {
        console.error('Error retrieving products:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/brand', async function (req, res) {
    try {
        const brands = await dbOperation.getBrands();
        console.log('Called and retrieved brands:', brands);
        res.send(brands.recordset);
    } catch (error) {
        console.error('Error retrieving brands:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/insertproducts', async  (req, res) =>{
    await dbOperation.CreateProduct(req.body);
    const result = await dbOperation.getProducts(req.body);
    res.send(result.recordset);
});

app.post('/insertbrands', async (req, res) => {
    await dbOperation.CreateBrand(req.body);
    const result = await dbOperation.getBrands(req.body);
    res.send(result.recordset);
});

app.delete('/deleteproducts/:Produs_ID', async (req, res)=> {
    try {
        const Produs_ID = req.params.Produs_ID;
        await dbOperation.deleteProduct(Produs_ID);
        res.status(200).json({ message: 'Produs șters cu succes.' });
    } catch (error) {
        res.status(500).json({ message: 'Eroare la ștergerea produsului.' });
    }

})

app.delete('/deletebrands/:Brand_ID', async (req, res)=> {
    try {
        const Brand_ID = req.params.Brand_ID;
        await dbOperation.deleteBrand(Brand_ID);
        res.status(200).json({ message: 'Brand șters cu succes.' });
    } catch (error) {
        res.status(500).json({ message: 'Eroare la ștergerea brandului.' });
    }

})

app.put('/update/:Produs_ID', async (req, res) => {
    try {
        const Produs_ID = req.params.Produs_ID;
        await dbOperation.updateProduct(Produs_ID, req.body);
        res.status(200).send({ message: 'Înregistrarea a fost actualizată cu succes.' });
    } catch (error) {
        console.error('Eroare la actualizarea înregistrării:', error);
        res.status(500).send({ error: 'Eroare internă de server' });
    }
});


app.put('/updatebrands/:Brand_ID', async (req, res) => {
    try {
        const Brand_ID = req.params.Brand_ID;
        await dbOperation.updateBrand(Brand_ID, req.body);
        res.status(200).send({ message: 'Înregistrarea a fost actualizată cu succes.' });
    } catch (error) {
        console.error('Eroare la actualizarea înregistrării:', error);
        res.status(500).send({ error: 'Eroare internă de server' });
    }
});


app.get('/customer-reviews', async (req, res) => {
    try {
        let results = await dbOperation.getCustomerProductReviews();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/employees-by-department', async (req, res) => {
    try {
        let results = await dbOperation.getEmployeesByDepartment();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/biggest-receipts', async (req, res) => {
    try {
        let results = await dbOperation.getBiggestReceipt();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/biggest-receipts-for-employee', async (req, res) => {
    try {
        let results = await dbOperation.getBiggestReceiptForEmployee();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/products-by-minimum-rating/:notaMinima', async (req, res) => {
    try {
        const notaMinima = req.params.notaMinima;
        let results = await dbOperation.getProductsByMinimumRating(notaMinima);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/products-by-category/:categorieSelectata', async (req, res) => {
    try {
        const categorieSelectata = req.params.categorieSelectata;
        let results = await dbOperation.getProductsByCategory(categorieSelectata);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/department-manager', async (req, res) => {
    try {
        let results = await dbOperation.getDepartmentManager();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/product-reviews', async (req, res) => {
    try {
        let results = await dbOperation.getAllReviews();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/receipt-by-date', async (req, res) => {
    try {
        let results = await dbOperation.getReceiptByDate();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/biggest-brand', async (req, res) => {
    try {
        let results = await dbOperation.getBiggestBrand();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));

