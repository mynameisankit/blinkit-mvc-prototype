import { createElement } from '../../../util/index.js';
import SECONDARY_LINKS from '../../../constants/secondaryLinks.js';

function renderNavbar(cartMetaData) {
    return createElement({
        tag: 'nav',
        classes: ['border-1-bottom', 'border-grey', 'border-solid'],
        children: [
            renderMainNav(cartMetaData),
            renderSubNav()
        ]
    });
}

function renderMainNav(cartMetaData) {
    return createElement({
        tag: 'div',
        classes: ['flex', 'flex-align-items-center'],
        children: [
            renderLogo(),
            renderDeliveryStats(),
            renderButtons(cartMetaData)
        ]
    });
}

function renderLogo() {
    return createElement({
        tag: 'img',
        classes: ['border-1-right', 'border-grey', 'border-solid', 'padding-1_5'],
        attributes: {
            src: './assets/logo.svg',
            alt: ''
        }
    });
}

function renderDeliveryStats() {
    return createElement({
        tag: 'div',
        classes: [
            'flex',
            'flex-col',
            'flex-justify-content-start',
            'padding-x-1'
        ],
        children: [
            renderEstimatedDeliveryTime(),
            renderLocationDropdown()
        ]
    });
}

function renderEstimatedDeliveryTime() {
    return createElement({
        tag: 'p',
        classes: ['bold'],
        children: 'Delivery in 10 minutes'
    });
}

function renderLocationDropdown() {
    const locationDropdown = createElement({
        tag: 'p',
        children: 'Pune, Maharashtra, India'
    });

    return locationDropdown;
}

function renderButtons(cartMetaData) {
    return createElement({
        tag: 'div',
        classes: [
            'flex',
            'flex-grow-1',
            'flex-justify-content-end',
            'flex-align-items-center',
            'padding-x-1'
        ],
        children: [
            renderLoginButton(),
            renderCartButton(cartMetaData)
        ]
    });
}

function renderLoginButton() {
    return createElement({
        tag: 'a',
        classes: ['btn'],
        children: [
            createElement({
                tag: 'p',
                classes: 'btn__text',
                children: 'Login'
            })
        ],
        attributes: {
            href: '/login'
        }
    });
}

function renderCartButton(cartMetaData) {
    return createElement({
        tag: 'a',
        classes: ['btn', 'btn-filled'],
        children: [
            renderCartButtonIcon(),
            renderCartButtonLabel(cartMetaData)
        ],
        attributes: {
            href: '/cart'
        }
    });
}

function renderCartButtonIcon() {
    return createElement({
        tag: 'img',
        classes: ['btn__icon'],
        attributes: {
            src: './assets/shopping-cart.png',
            alt: 'Shopping Cart'
        }
    });
}

function renderCartButtonLabel({ numberOfItems, totalCost }) {
    return totalCost ?
        renderCartButtonWithPrice({ numberOfItems, totalCost }) :
        renderCartButtonWithoutPrice();
}

function renderCartButtonWithoutPrice() {
    return createElement({
        tag: 'p',
        classes: ['btn__text'],
        children: 'My Cart'
    });
}

function renderCartButtonWithPrice({ numberOfItems, totalCost }) {
    return createElement({
        tag: 'div',
        children: [
            createElement({
                tag: 'p',
                children: getLabel(numberOfItems)
            }),
            createElement({
                tag: 'p',
                children: `Rs ${totalCost}`
            })
        ]
    });
}

function getLabel(numberOfItems) {
    return numberOfItems === 1 ?
        getSingularCartCountLabel(numberOfItems) :
        getPluralCartCountLabel(numberOfItems);
}

function getSingularCartCountLabel(numberOfItems) {
    return `${numberOfItems} Item`;
}

function getPluralCartCountLabel(numberOfItems) {
    return `${numberOfItems} Items`;
}

function renderSubNav() {
    return createElement({
        tag: 'nav',
        classes: ['border-1-top', 'border-grey', 'border-solid', 'padding-y-1'],
        children: [
            renderLinks()
        ]
    });
}

function renderLinks() {
    const listItems = SECONDARY_LINKS.map(
        ({ label, href }) => renderSecondaryLink({ label, href })
    );

    const list = createElement({
        tag: 'ul',
        classes: ['flex', 'flex-justify-content-center', 'flex-gap-1', 'list-style-type-none'],
        children: listItems
    });

    return list;
}

function renderSecondaryLink({ label, href }) {
    return createElement({
        tag: 'li',
        children: [
            createElement({
                tag: 'a',
                children: label,
                classes: ['link'],
                attributes: {
                    href
                }
            })
        ]
    });
}

export default renderNavbar;