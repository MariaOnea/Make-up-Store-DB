class Product {
    constructor(Produs_ID,Brand_ID,NumeProdus,Pret,Cantitate,Categorie,Culoare,UnitateDeMasura,StocDisponibil) {
        this.Produs_ID = Produs_ID;
        this.Brand_ID = Brand_ID;
        this.NumeProdus = NumeProdus;
        this.Pret = Pret;
        this.Cantitate = Cantitate;
        this.Categorie = Categorie;
        this.Culoare = Culoare;
        this.UnitateDeMasura = UnitateDeMasura;
        this.StocDisponibil = StocDisponibil;
    }
}

module.exports = Product;