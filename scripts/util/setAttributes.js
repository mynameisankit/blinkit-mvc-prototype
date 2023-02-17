import { EMPTY_OBJECT } from '../constants/general.js';

function setAttributes(
    element,
    attributes = EMPTY_OBJECT
) {
    Object
        .entries(attributes)
        .forEach(([key, value]) => {
            element.setAttribute(key, value);
        });

    return element;
}

export default setAttributes;