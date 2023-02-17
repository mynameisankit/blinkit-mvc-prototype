import Model from '../interfaces/Model.js';
import products from '../data/products.js';
import CATEGORY_ENUM from '../constants/categoriesEnum.js';

class ProductsModel extends Model {
    init() {
        const productsMap = this.__getProductsMap(products);
        const categoryToProductsMap = this.__getCategoryToProductsMap(products);

        this.store = {
            productsMap,
            categoryToProductsMap
        };
    }

    get() { }

    __getProductsMap(products) {
        return products.reduce(
            (productsMap, productDetails) => {
                productsMap[productDetails.productId] = productDetails;
                return productsMap;
            }, {});
    }

    __getCategoryToProductsMap(products) {
        const CATEGORY_ALL_KEY = CATEGORY_ENUM.ALL;

        return products.reduce(
            (
                categoryToProductsMap,
                { categoryId: categories, productId }
            ) => {
                categories.forEach(category => {
                    if (!categoryToProductsMap[category])
                        categoryToProductsMap[category] = [];

                    categoryToProductsMap[category].push(productId);
                });

                categoryToProductsMap[CATEGORY_ALL_KEY].push(productId);

                return categoryToProductsMap;
            }, {
            [CATEGORY_ALL_KEY]: []
        });
    }

    getProductsOfCategory = (categoryId) => {
        return this.store.categoryToProductsMap[categoryId];
    }

    getProduct = (productId) => {
        return this.store.productsMap[productId];
    }
}

export default ProductsModel;