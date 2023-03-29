import { createElement } from '../../../../util/index.js';
import renderSidebar from './renderSidebar.js';
import renderProductListing from './renderProductListing.js';

function renderMain({
    cart,
    products,
    categories,
    search,
    changeCategory,
    removeFromCart,
    addToCart,
    changeSortOrder
}) {
    const sidebar = renderSidebar({
        categories,
        selected: search.currentCategory,
        changeCategory
    });

    const productContainer = renderProductListing({
        products,
        cart,
        search,
        removeFromCart,
        addToCart,
        changeSortOrder
    });

    return createElement({
        tag: 'main',
        classes: [
            'flex',
            'flex-grow-2',
            'margin-x-auto',
            'margin-top-2',
            'border-1',
            'border-solid',
            'border-grey',
            'width-per-80'
        ],
        children: [
            sidebar,
            productContainer
        ]
    });
}

export default renderMain;