import { EMPTY_ARRAY } from '../constants/general.js';

function addClassNames(
    element,
    classes = EMPTY_ARRAY
) {
    const elementClass = element.classList;

    elementClass.add(...classes);

    return;
}

export default addClassNames;