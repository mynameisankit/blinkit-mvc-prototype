import Model from '../interfaces/Model.js';

class CartModel extends Model {
    init() {
        this.store = {};
    }

    addItem(productId) {
        const store = this.store;

        if (store[productId])
            store[productId]++;
        else
            store[productId] = 1;
    }

    removeItem(productId) {
        const store = this.store;

        if (store[productId])
            store[productId]--;
        
        if(!store[productId])
            delete store[productId];
    }
}

export default CartModel;