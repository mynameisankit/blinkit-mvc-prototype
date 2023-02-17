import { EMPTY_ARRAY } from '../constants/general.js';

function appendInto(
    element,
    children = EMPTY_ARRAY
) {
    const fragment = document.createDocumentFragment();

    children.forEach(child => {
        if (child === null || child === undefined)
            return;

        if (!(child instanceof HTMLElement))
            return;

        fragment.append(child);
    });

    element.appendChild(fragment);

    return element;
}

export default appendInto;