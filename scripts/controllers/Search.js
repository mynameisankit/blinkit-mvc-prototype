import CATEGORY_ENUM from '../constants/categoriesEnum.js';

class Controller {
    constructor({ modelsMap, view }) {
        this.modelsMap = modelsMap;
        this.view = view;

        Object
            .entries({
                addToCart: this.addToCart,
                changeCategory: this.changeCategory,
                removeFromCart: this.removeFromCart,
                changeSortOrder: this.changeSortOrder
            })
            .forEach(([callbackName, callbackFn]) => {
                this[callbackName] = (args) => {
                    callbackFn(args);
                    this.start();
                };
            });

        this.initialiseModels();
        this.init();
    }

    initialiseModels = () => {
        Object
            .values(this.modelsMap)
            .forEach(model => model.init());
    }

    init = () => {
        this.start();
    }

    getDataFromModels = () => {
        const data = {};

        data.categories = this.modelsMap.categories.get();
        data.search = this.modelsMap.search.get();
        data.products = this.getProductsData(this.modelsMap.products, data.search.currentCategory);
        data.cart = this.modelsMap.cart.get();

        data.cartMetaData = {
            totalCost: this.getTotalCost(data.cart, this.modelsMap.products),
            numberOfItems: this.getNumberOfItems(data.cart)
        };

        return data;
    }

    start = () => {
        const data = this.getDataFromModels();

        this.view.render({
            ...data,
            addToCart: this.addToCart,
            changeCategory: this.changeCategory,
            removeFromCart: this.removeFromCart,
            changeSortOrder: this.changeSortOrder
        });
    }

    changeCategory = (categoryId) => {
        this.modelsMap.search.setCurrentCategory(categoryId);
    }

    addToCart = (productId) => {
        this.modelsMap.cart.addItem(productId);
    }

    removeFromCart = (productId) => {
        this.modelsMap.cart.removeItem(productId);
    }

    changeSortOrder = (order) => {
        this.modelsMap.search.setOrder(order);
    }

    getNumberOfItems(cart) {
        return Object
            .entries(cart)
            .reduce(
                (acc, [, count]) => acc + count
                , 0
            );
    }

    getTotalCost(cart, productsModel) {
        return Object
            .entries(cart)
            .reduce(
                (acc, [productId, count]) => {
                    const { offeredPrice } = productsModel.getProduct(productId);
                    return acc + parseInt(offeredPrice) * count;
                }, 0
            );
    }

    getProductsData(productsModel, currentCategory) {
        return productsModel
            .getProductsOfCategory(currentCategory)
            .map(productsModel.getProduct);
    }
};

export default Controller;