import {
    EMPTY_ARRAY,
    EMPTY_OBJECT
} from '../constants/general.js';
import addClassNames from './addClassNames.js';
import setAttributes from './setAttributes.js';
import addEventListeners from './addEventListeners.js';
import appendInto from './appendInto.js';

function createElement({
    tag,
    classes = EMPTY_ARRAY,
    attributes = EMPTY_OBJECT,
    children = EMPTY_ARRAY,
    eventsListenersByEvent = EMPTY_OBJECT
}) {
    const element = tag ?
        document.createElement(tag) :
        document.createDocumentFragment();

    if (tag) {
        addClassNames(element, classes);
        setAttributes(element, attributes);
        addEventListeners(element, eventsListenersByEvent);
    }

    if (children instanceof Array)
        appendInto(element, children);
    else
        element.textContent = children;

    return element;
}

export default createElement;