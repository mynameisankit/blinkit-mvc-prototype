import { EMPTY_OBJECT } from '../constants/general.js';

function addEventListeners(
    element,
    eventsListenersByEvent = EMPTY_OBJECT
) {
    Object
        .entries(eventsListenersByEvent)
        .forEach(([event, listener]) => element.addEventListener(event, listener));

    return;
}

export default addEventListeners;