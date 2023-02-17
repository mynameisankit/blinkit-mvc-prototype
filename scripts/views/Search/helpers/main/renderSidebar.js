import { createElement } from '../../../../util/index.js';

function renderSidebar({
    categories, 
    selected,
    changeCategory
}) {
    return createElement({
        tag: 'aside',
        classes: ['flex', 'flex-col'],
        children: categories?.map(category =>
            renderSidebarItem({
                ...category,
                selected: category.categoryId === selected
            })
        ),
        eventsListenersByEvent: {
            click: event => {
                const { categoryId } = event.target.dataset;
        
                changeCategory(categoryId);
            }
        }
    });
}

function renderSidebarItem({ categoryId, image, label, selected }) {
    return createElement({
        tag: 'div',
        classes: [
            'flex',
            'flex-align-items-center',
            'padding-y-0_5',
            'flex-gap-2',
            'border-solid',
            'border-2-left',
            'border-1-bottom',
            ...(selected ? [
                'border-primary',
                'bg-primary-translucent'
            ] : [
                'border-y-grey',
                'border-left-transparent'
            ])
        ],
        children: [
            renderSidebarItemIcon({ image, label }),
            renderSidebarItemText({ label })
        ],
        attributes: {
            'data-category-id': categoryId
        }
    });
}

function renderSidebarItemIcon({ image, label }) {
    return createElement({
        tag: 'img',
        classes: ['height-20', 'width-20', 'pointer-none'],
        attributes: {
            src: image,
            alt: label
        }
    });
}

function renderSidebarItemText({ label }) {
    return createElement({
        tag: 'p',
        classes: ['flex-grow-2', 'text-base', 'pointer-none'],
        children: label
    });
}

export default renderSidebar;