import Model from '../interfaces/Model.js';
import CATEGORY_ENUM from '../constants/categoriesEnum.js';
import ORDER_ENUM from '../constants/orderEnum.js';

class SearchModel extends Model {
    init() {
        this.store = {
            currentCategory: CATEGORY_ENUM.ALL,
            order: ORDER_ENUM.LOWEST_PRICE
        };
    }

    setCurrentCategory = (categoryId) => {
        this.store.currentCategory = categoryId;
    }

    setOrder = (order) => {
        this.store.order = ORDER_ENUM[order];
    }
}

export default SearchModel;