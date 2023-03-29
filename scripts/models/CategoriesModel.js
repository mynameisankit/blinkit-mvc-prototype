import Model from '../interfaces/Model.js';
import CategoryData from '../data/categories.js';

class CategoriesModel extends Model {
    init() {
        this.store = CategoryData;
    }
}

export default CategoriesModel;