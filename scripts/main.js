import SearchController from './controllers/Search.js';
import SearchView from './views/Search/index.js';
// Models
import CategoriesModel from './models/CategoriesModel.js';
import ProductsModel from './models/ProductsModel.js';
import SearchModel from './models/SearchModel.js';
import CartModel from './models/CartModel.js';

function main() {
    const controller = new SearchController({ 
        view: new SearchView(),
        modelsMap: {
            categories: new CategoriesModel(),
            products: new ProductsModel(),
            search: new SearchModel(),
            cart: new CartModel()
        }
    });

    controller.init();
}

export default main;