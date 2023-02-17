import { createElement } from '../../../../util/index.js';
import ORDER_ENUM from '../../../../constants/orderEnum.js';

function renderProductListing({
    products,
    cart,
    search: { order },
    removeFromCart,
    addToCart,
    changeSortOrder
}) {
    return createElement({
        tag: 'section',
        classes: ['flex-grow-1'],
        children: [
            renderHeader({
                order,
                changeSortOrder
            }),
            renderProductGrid({
                order,
                removeFromCart,
                addToCart,
                products,
                cart
            })
        ]
    });
}

function renderHeader({
    order,
    changeSortOrder
}) {
    return createElement({
        tag: 'header',
        classes: [
            'flex',
            'flex-justify-content-space-between',
            'flex-align-items-center',
            'border-1-left',
            'border-grey',
            'border-solid',
            'padding-y-1',
            'padding-x-1_5'
        ],
        children: [
            createElement({
                tag: 'h3',
                classes: 'bold',
                children: 'Buy Fresh Vegetables Online'
            }),
            renderSortMenu({
                order,
                changeSortOrder
            })
        ]
    });
}

function renderSortMenu({
    order,
    changeSortOrder
}) {
    const menu = createElement({
        tag: 'select',
        classes: ['border-1', 'border-grey', 'text-base', 'color-primary'],
        children: Object
            .entries(ORDER_ENUM)
            .map(criteria => renderSortMenuItems(criteria, order)),
        attributes: {
            name: 'sortOrder'
        },
        eventsListenersByEvent: {
            change: event => changeSortOrder(event.target.value)
        }
    });

    const label = createElement({
        tag: 'label',
        children: 'Sort By',
        attributes: {
            for: 'sortOrder'
        }
    });

    return createElement({
        tag: 'div',
        classes: ['flex', 'flex-align-items-center', 'flex-gap-1'],
        children: [
            label,
            menu
        ]
    });
}

function renderSortMenuItems([ value, label ], order) {
    return createElement({
        tag: 'option',
        children: label,
        attributes: {
            value,
            ...(order === label && { selected: 'selected' })
        }
    });
}

function renderProductGrid({
    order,
    removeFromCart,
    addToCart,
    products,
    cart
}) {
    const sortFn = order === ORDER_ENUM.LOWEST_PRICE ?
        sortByLowestPrice :
        sortByHighestPrice;

    const gridItems = products
        .sort((a, b) => sortFn(
            a.offeredPrice,
            b.offeredPrice
        ))
        .map(data => renderProductCard({
            item: data,
            cart,
            removeFromCart,
            addToCart
        }));

    return createElement({
        tag: 'div',
        classes: [
            'border-1-top',
            'border-1-left',
            'border-solid',
            'border-grey',
            'grid',
            'grid-col-3'
        ],
        children: gridItems
    });
}

function sortByHighestPrice(price1, price2) {
    return price2 - price1;
}

function sortByLowestPrice(price1, price2) {
    return price1 - price2;
}

function renderProductCard({
    item: {
        productId,
        offer,
        image: src,
        name: productName,
        sourcedAt: productSourcedAt,
        quantities,
        offeredPrice,
        actualPrice
    },
    cart,
    removeFromCart,
    addToCart
}) {
    const offerElement = createElement({
        tag: 'p',
        classes: [
            'padding-0_5',
            'flex-align-self-start',
            'border-radius-1',
            'text-sm',
            'bg-blue',
            'color-white'
        ],
        children: `${offer}% Off`
    });

    const image = createElement({
        tag: 'img',
        classes: ['width-56', 'height-56'],
        attributes: {
            src,
            alt: productName
        }
    });

    const sourcedAt = createElement({
        tag: 'p',
        classes: [
            'bg-primary-translucent',
            'text-sm',
            'color-primary',
            'padding-0_5',
            'flex-align-self-end',
            'border-radius-1'
        ],
        children: `Sourced at ${productSourcedAt}`
    });

    const name = createElement({
        tag: 'h3',
        classes: ['flex-align-self-start'],
        children: productName
    });

    const quantitiesAvailable = createElement({
        tag: 'div',
        classes: [
            'flex',
            'flex-align-self-start',
            'flex-align-center',
            'flex-gap-1'
        ],
        children: quantities.map(renderChip)
    });

    const priceAndAction = renderPriceAndAction({
        productId,
        offeredPrice,
        actualPrice,
        cart,
        addToCart,
        removeFromCart
    });

    return createElement({
        tag: 'article',
        classes: [
            'flex',
            'flex-col',
            'flex-align-items-center',
            'padding-1',
            'flex-gap-1',
            'border-1-bottom',
            'border-1-right',
            'border-solid',
            'border-grey'
        ],
        children: [
            offerElement,
            image,
            sourcedAt,
            name,
            quantitiesAvailable,
            priceAndAction
        ]
    });
}

function renderChip(text) {
    return createElement({
        tag: 'div',
        classes: ['chip'],
        children: text
    });
}

function renderPriceAndAction({
    productId,
    cart,
    addToCart,
    removeFromCart,
    ...priceData
}) {
    const isPresentInCart = !!cart[productId];

    const addButton = isPresentInCart ?
        renderAddButtonWithQuantity({
            productId,
            cart,
            addToCart,
            removeFromCart
        }) :
        renderAddButtonWithoutQuantity({
            productId,
            addToCart
        });

    return createElement({
        tag: 'div',
        classes: [
            'flex',
            'flex-justify-content-space-between',
            'flex-align-items-center',
            'width-full'
        ],
        children: [
            renderPrice(priceData),
            addButton
        ]
    });
}

function renderAddButtonWithoutQuantity({
    productId,
    addToCart
}) {
    return createElement({
        tag: 'button',
        classes: [
            'btn',
            'btn-outlined'
        ],
        children: 'Add',
        eventsListenersByEvent: {
            click: () => addToCart(productId)
        }
    });
}

function renderAddButtonWithQuantity({
    productId,
    cart,
    addToCart,
    removeFromCart
}) {
    const buttonChildrenClassnames = [
        'flex-grow-1',
        'flex-basis-0',
        'min-width-0',
        'padding-0_75',
        'border-1-left',
        'border-solid',
        'border-white'
    ];

    const count = createElement({
        tag: 'span',
        classes: buttonChildrenClassnames,
        children: cart[productId]
    });

    const actions = [
        {
            text: '-',
            click: () => removeFromCart(productId)
        }, {
            text: '+',
            click: () => addToCart(productId)
        }
    ].map(({ text, click }) => createElement({
        tag: 'span',
        classes: buttonChildrenClassnames,
        children: text,
        eventsListenersByEvent: {
            click
        }
    }));

    return createElement({
        tag: 'button',
        classes: [
            'btn',
            'btn-filled',
            'flex',
            'flex-align-items-stretch',
            'padding-0',
            'flex-gap-0'
        ],
        children: [
            actions[0],
            count,
            actions[1]
        ]
    });
}

function renderPrice({ offeredPrice, actualPrice }) {
    return createElement({
        tag: 'div',
        classes: ['flex', 'flex-col'],
        children: [
            createElement({
                tag: 'p',
                children: `Rs ${offeredPrice}`
            }),
            createElement({
                tag: 'p',
                classes: 'strikethrough',
                children: `Rs ${actualPrice}`
            })
        ]
    });
}

export default renderProductListing;