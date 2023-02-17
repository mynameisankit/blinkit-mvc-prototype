import renderNavbar from './helpers/renderNavbar.js';
import renderMain from './helpers/main/renderMain.js';
import renderFooter from './helpers/renderFooter.js';
import { appendInto } from '../../util/index.js';

class View {
    __cleanRoot(root) {
        root.replaceChildren();
    }

    render({
        categories,
        search,
        products,
        cart,
        cartMetaData,
        addToCart,
        changeCategory,
        removeFromCart,
        changeSortOrder
    }) {
        const root = document.getElementById('root');

        this.__cleanRoot(root);

        const navbar = renderNavbar(cartMetaData);
        const main = renderMain({
            cart,
            categories,
            search,
            products,
            addToCart,
            changeSortOrder,
            changeCategory,
            removeFromCart
        });
        const footer = renderFooter();

        appendInto(root, [
            navbar,
            main,
            footer
        ]);
    }
}

export default View;